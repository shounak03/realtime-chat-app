import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";
import { useUserStore } from "./userStore";

export const useChatStore = create((set)=>({
    chatId:null,
    user: true,
    isCurrentUserBlocked:false,
    isReceiverBlocked:false,
    
    changeChat: (chatId, user)=>{
        
        const currUser = useUserStore.getState().currUser;

        //IF CURRENT USER IS BLOCKED

        if(user.blocked.includes(currUser.id)){
            return set({
                chatId,
                user:null,
                isCurrentUserBlocked:true,
                isReceiverBlocked:false,
            })
        }

        //IF RECEIVER IS BLOCKED
        else if(currUser.blocked.includes(user.id)){
            return set({
                chatId,
                user:null,
                isCurrentUserBlocked:true,
                isReceiverBlocked:false,
            })
        }
        else{ 
            set({
                chatId,
                user,
                isCurrentUserBlocked:false,
                isReceiverBlocked:true,
            })
        }
    },
    changeBlock:()=>{
        set((state)=>({...state,isReceiverBlocked:!state.isReceiverBlocked})) 
    }
}));