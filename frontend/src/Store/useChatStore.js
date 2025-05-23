import {create} from "zustand";
import {toast} from "react-hot-toast";
import {axiosInstance} from "../lib/axios"
import { useAuthStore } from "./useAuthStore";


export const useChatStore =  create((set, get)=>({
    messages: [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,

    getUsers : async ()=>{
        set({isUsersLoading : true});
        try {
            const res = await axiosInstance.get('/messages/users' )
            set({users : res.data})

        } catch (error) {
            console.log("error in getUsers")
            toast.error(error.response.data.message)
        }finally{
            set({isUsersLoading : false});
        }
    },
    getMessages : async (userId)=>{
        set({isMessagesLoading : true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}` )
            set({messages : res.data})

        } catch (error) {
            console.log("Error in getMessages")
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading : false});
        }
    },
    //  : optimize this one later
    setSelectedUser : async (userId)=>{
        set({selectedUser : userId});
    },
    sendMessage : async (messageData)=>{
        const {messages , selectedUser} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);
            set({messages : [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages : ()=>{
        const {selectedUser} =  get();
        if(!selectedUser) return;
// optimize this one later
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (message)=>{
            set({messages : [...get().messages, message ]})
        })
    },
    unsubscribeFromMessages  : ()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }

}))