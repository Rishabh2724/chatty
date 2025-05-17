import React from "react";
import { useChatStore } from "../Store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

export default function Homepage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 overflow-hidden">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Flex container for Sidebar + Chat, full height */}
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar: fixed width, full height, scrollable */}
            <div className="w-20 lg:w-72 h-full overflow-y-auto overflow-x-hidden border-r border-base-300">
              <Sidebar />
            </div>

            {/* Chat area: flex-grow, full height, scrollable */}
            <div className="flex-1 h-full overflow-y-auto">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
