import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../Store/useChatStore';
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../Store/useAuthStore';
import { formatMessageTime } from '../lib/util';

function ChatContainer() {
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const { authUser } = useAuthStore();
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  // Bounce effect state
  const bounceTimeoutRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Bounce effect handler
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Clear previous timeout so bounce is smooth
    if (bounceTimeoutRef.current) clearTimeout(bounceTimeoutRef.current);

    // Bounce at top
    if (scrollTop <= 0) {
      container.style.transform = 'translateY(20px)';
      bounceTimeoutRef.current = setTimeout(() => {
        container.style.transition = 'transform 0.3s ease';
        container.style.transform = 'translateY(0)';
      }, 100);
      setTimeout(() => {
        container.style.transition = ''; // reset after animation
      }, 400);
    }
    // Bounce at bottom
    else if (scrollTop + clientHeight >= scrollHeight) {
      container.style.transform = 'translateY(-20px)';
      bounceTimeoutRef.current = setTimeout(() => {
        container.style.transition = 'transform 0.3s ease';
        container.style.transform = 'translateY(0)';
      }, 100);
      setTimeout(() => {
        container.style.transition = '';
      }, 400);
    }
  };

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-hidden h-full'>
        <ChatHeader />
        <MessageSkeleton />
        <MessagesInput />
      </div>
    );
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Sticky header */}
      <div className='sticky top-0 z-10 bg-base-100'>
        <ChatHeader />
      </div>

      {/* Messages scroll container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className='flex-1 overflow-y-auto px-4 space-y-4'
        style={{ overscrollBehavior: 'contain' }}
      >
        {messages.map((message, i) => {
          const isLast = i === messages.length - 1;
          return (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
              ref={isLast ? messageEndRef : null}
            >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img
                    src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.jpg' : selectedUser.profilePic || '/avatar.jpg'}
                    alt='profilePic'
                  />
                </div>
              </div>
              <div className='chat-header mb-1'>
                <time className='text-xs opacity-50 ml-1'>
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className='chat-bubble flex flex-col'>
                {message.image && (
                  <img
                    src={message.image}
                    alt='attachment'
                    className='sm:max-w-[200px] rounded-md mb-2'
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky input */}
      <div className='sticky bottom-0 bg-base-100 z-10'>
        <MessagesInput />
      </div>
    </div>
  );
}

export default ChatContainer;
