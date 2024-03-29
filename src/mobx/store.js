import {proxy} from "valtio"
import avatar2 from "../assets/images/users/avatar-2.jpg";
import avatar4 from "../assets/images/users/avatar-4.jpg";
import avatar3 from "../assets/images/users/avatar-3.jpg";
import avatar6 from "../assets/images/users/avatar-6.jpg";
import avatar7 from "../assets/images/users/avatar-7.jpg";
import avatar8 from "../assets/images/users/avatar-8.jpg";
import img6 from "../assets/images/small/img-6.jpg";
import img4 from "../assets/images/small/img-4.jpg";
import img7 from "../assets/images/small/img-7.jpg";
import { nanoid } from "nanoid";
import {Connect , Send} from "./irc"



const data = {
    me:"",
    activeTab : "chat",
    activePane: 0,
	userSidebar : false,
    conversationName : "Doris Brown",
    active_user : 3,
    recentChatList: [
        //admin is sender and user in receiver
        { id : 0, name : "Patrick Hendricks", profilePicture : avatar2, status : "online", unRead : 0, roomType : "contact", isGroup: false, 
            messages: [
                { id: 1, message: "hi", time: "01:05", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "hi patrick", time: "10.00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 3, message: "how's going on your project?", time: "01:05", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 4, message: "Do you need any help?", time: "01:06", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id : 33, isToday : true },
              
        ] },
        { id : 1, name : "Mark Messer", profilePicture : avatar3, status : "away",unRead : 2, isGroup: false,
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hello", time: "10.00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "images", time: "10:30", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img4 }, { image : img7 } ] },
            ]  },
        { id : 13, name : "General", profilePicture : "Null", unRead : 0, isGroup: true,
            messages: [
                { id : 33, isToday : true },
                { id : 1, userName : "John Smith",  message: "Hello send project images", time: "12:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id : 2, userName : "Steve Walker",  message: "Images", time: "12:05", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img6 } ] },
                { id : 3, userName : "admin",  message: "Good Afternoon everyone !", time: "2:05", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id : 4, userName : "Galen Rizo",  message: "This theme is Awesome!", time: "2:06", userType: "receiver", isImageMessage : false, isFileMessage : false },
            ]  },

        { id : 4, name : "Doris Brown", profilePicture : avatar4, status : "online",unRead : 0, isGroup: false, isTyping : true,
            messages: [
                { id : 1, userName : "Doris Brown",  message: "Good Morning", time: "10:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id : 2, userName : "admin",  message: "Good morning, How are you? What about our next meeting?", time: "10:02", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id : 33, isToday : true },
                { id: 3, message: "Yeah everything is fine", time: "10:05", userType: "receiver", isImageMessage : false, isFileMessage : false },
                
            ]  },
        { id : 5, name : "Designer", profilePicture : "Null",unRead : 1,  isGroup: true,
            messages: [
                { id : 1, userName : "Doris Brown",  message: "Hello send project images", time: "12:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id : 33, isToday : true },
                { id : 2, userName : "Steve Walker",  message: "Images", time: "12:05", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img6 } ] },
                { id : 3, userName : "admin",  message: "Images", time: "01:30", userType: "sender", isImageMessage : false, isFileMessage : true, fileMessage: "Minible-Vertical.zip" },
               
            ]  },

        { id : 6, name : "Steve Walker", profilePicture : avatar6, status : "away", unRead : 0,  isGroup: false,
            messages: [
                { id : 33, isToday : true },
                { id : 1, message : "file", time : "01:16", userType : "receiver", isImageMessage : false, isFileMessage : true, fileMessage: "Minible-Vertical.zip" },
                { id : 2, message : "Okay 👍, let me check it and get back to you soon", time : "01:16", userType : "sender", isImageMessage : false, isFileMessage : false }
            ]  },

        { id : 7, name : "Albert Rodarte", profilePicture : "Null", status : "online", unRead : 0, isGroup: false, isTyping : true,
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hi", time: "01:05", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "Hello, how can i help you", time: "01:05", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 3, message: "", time: "01:05", userType: "receiver", isImageMessage : false, isFileMessage : false, isTyping : true },
            ]  },

        { id : 8, name : "Mirta George", profilePicture : "Null", status : "online", unRead : 0,  isGroup: false,
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hi...Good Morning!", time: "09:05", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "image", time: "10:30", userType: "sender", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img4 }, { image : img7 } ] },
                { id: 3, message: "please, save this pictures to your file and give it to me after you have done with editing!", time: "10:31", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 4, message: "Yeah, Everything is fine👍", time: "02:50", userType: "receiver", isImageMessage : false, isFileMessage : false },
            ]  },

        { id : 9, name : "Paul Haynes", profilePicture : avatar7, status : "away", unRead : 0, isGroup: false,
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hi...Good Morning!", time: "09:05", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "image", time: "10:30", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img4 }, { image : img7 } ] },
                { id: 3, message: "please, save this pictures to your file and give it to me after you have done with editing!", time: "10:31", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 4, message: "Good Morning😄", time: "02:50", userType: "sender", isImageMessage : false, isFileMessage : false },
            ]  },

        { id : 2, name : "Jonathan Miller", profilePicture : avatar2, status : "online",unRead : 0, isGroup: false,
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hello Admin", time: "08:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "Good morning", time: "08:00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 3, message: "is everything is fine ?", time: "08:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 4, message: "i can help you😊", time: "08:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
                { id: 5, message: "Hi, How are You?", time: "08:00", userType: "receiver", isImageMessage : false, isFileMessage : false },
            ]  },

        { id : 3, name : "Ossie Wilson", profilePicture : avatar3, status : "away",unRead : 0, isGroup: false, 
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hi", time: "12:00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "Did you finished it?", time: "12:00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "I've finished it! See you so", time: "12:05", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img6 } ] }
            ]  }, 

         { id : 14, name : "Sara Muller", profilePicture : "Null", status : "offline",unRead : 0, isGroup: false, 
            messages: [
                { id : 33, isToday : true },
                { id: 1, message: "hi yana", time: "12:00", userType: "sender", isImageMessage : false, isFileMessage : false },
                { id: 2, message: "image", time: "12:05", userType: "receiver", isImageMessage : true, isFileMessage : false, imageMessage : [ { image : img6 } ] },
                { id: 3, message: "Wow that's great", time: "12:00", userType: "sender", isImageMessage : false, isFileMessage : false }
            ]  },
    ],
    groups : [
        { gourpId : 1, name : "#General", profilePicture : "Null", isGroup : true, unRead : 0, desc : "General Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },

            ]    
        },
        { gourpId : 2, name : "#Reporting", profilePicture : "Null", isGroup : true, unRead : 23,  desc : "reporing Group here...",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },

            ]    
        },
        { gourpId : 3, name : "#Designer", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "designers Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },
      
            ]    
        },
        { gourpId : 4, name : "#Developers", profilePicture : "Null", isGroup : true, unRead : 0,  desc : "developers Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },

            ]    
        },
        { gourpId : 5, name : "#Project-aplha", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "project related Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },

            ]    
        },
        { gourpId : 6, name : "#Snacks", profilePicture : "Null", isGroup : true, unRead : 0,  desc : "snacks Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
                { userId : 2, name : "Ossie Wilson", profilePicture : avatar8, role : "admin" },
                { userId : 3, name : "Jonathan Miller", profilePicture : "Null", role : null },

            ]    
        },
    ],
    contacts : [
        { id : 1, name : "Albert Rodarte" },
        { id : 2, name : "Allison Etter" },
        { id : 3, name : "Craig Smiley" },
        { id : 4, name : "Daniel Clay" },
        { id : 5, name : "Doris Brown" },
        { id : 6, name : "Iris Wells" },
        { id : 7, name : "Juan Flakes" },
        { id : 8, name : "John Hall" },
        { id : 9, name : "Joy Southern" },

    ],
    
};


export const repo = proxy(data)
export const getConversation = () =>{
    return repo.recentChatList.filter( r  => r.id == repo.active_user)
}
export const getUser = () =>{
    return repo.recentChatList.filter( r  => r.id == repo.active_user)
}
export const setConversation = (name, messages ) => {
    repo.recentChatList = repo.recentChatList.map( x => {
        if (x.name == name) {
            console.log(`deelting msg`)
            x.messages = messages
        }
        return x
    })
}
export const deleteMessage = (id) => {
    let conversation = getConversation()[0]
    var filtered = conversation.messages.filter(function (item) {
        return item.id !== id;
    });
    setConversation(conversation.name , filtered)
}
export const addMessage = (msg) => {
    console.log(`adding message ${msg} to `)
    let conversation = getConversation()[0]
    
    console.log(`converstation ${conversation} `)
    var filtered = conversation.messages.push(msg)
    setConversation(conversation.name , conversation.messages)
    Send(conversation.name , msg.message)
}
export const addMessageToConversation = (dst , msg) => {
   repo.recentChatList.map( c => {

       if (c.name == dst) setConversation(c.name , [...c.messages, msg])
   })
    
}
export const createConversation = (name) => {
    let conv =  {id : nanoid(), name : name, profilePicture : "Null", status : "away",unRead : 0, isGroup: false, messages: []}
    repo.recentChatList.push(conv)
}

Connect()