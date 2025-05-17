import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import {toast} from "react-hot-toast"
import {io } from "socket.io-client"

const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:3000/" : "/"

export const useAuthStore = create((set,get)=>({
    authUser : null,
    isSigningIn : false,
    isLoggingIn : false,
    isCheckingAuth: true,
    socket : null,
    onlineUsers : [],
    isUpdatingProfile : false,

    checkAuth : async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data})
            get().connectSocket();
        } catch (error) {
            set({authUser :null});
            console.log(error.message   )
        }finally{
            set({isCheckingAuth : false})
        }
    },

    signUp : async (data)=>{
        set({isSigningIn: true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data});
            toast.success("Account has been created successfully");
            get().connectSocket();
        } catch (error) {
            console.log("Error in signup  at authstore : ", error.message);
            return toast.error(error.response.data.message);
        }finally{
            set({isSigningIn : false});
        }
    },
    login : async(data)=>{
        set({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login" , data);
            set({authUser: res.data});
            toast.success("You are logged in successfully");
            get().connectSocket();
        } catch (error) {
            console.log("Error in login endpoint ," ,error.message);
            toast.error(error.message)
        }
    },

    logout : async ()=>{
        try {
            axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    
    updateProfile : async (data)=>{
        set({isUpdatingProfile :true});
        try {
            const res = await axiosInstance.put('/auth/update-profile', data);
            set({authUser :res.data});
            toast.success("Profile photo updated successfully");
        } catch (error) {
            console.log("Error in update-profile endpoint");
            toast.error(error.message);

        }finally{
            set({isUpdatingProfile : false});
        }
    },
     
     connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {query : {
        userId : authUser._id
    }});
    newSocket.connect();

    set({ socket: newSocket });
    newSocket.on("getOnlineUsers", (userIds)=>{
        set({onlineUsers : userIds})
    })
}
,
    disconnectSocket : ()=>{
        if(get().socket?.connected)  get().socket.disconnect();
    },

}))