import React from "react"
import INIT_STATE from "./initial"
import Client from "./irc/irc"
export const Context = React.createContext();
let ircClient = null
const  reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case "SET_ACTIVE_TAB":
			return {
				...state,
				activeTab: action.payload
			};

		case "OPEN_USER_PROFILE_SIDEBAR":
			return {
				...state,
				userSidebar: true
			};

		case "CLOSE_USER_PROFILE_SIDEBAR":
			return {
				...state,
				userSidebar: false
			};

		case "SET_CONVERSATION_NAME_IN_OPEN_CHAT":
			return {
				...state,
				conversationName: action.payload
            };
        case "CHAT_USER":
                return { ...state };
    
        case "ACTIVE_USER":
                return { 
                    ...state,
                    active_user : action.payload };
                   
        case "FULL_USER":
                return { 
                    ...state,
                    users : action.payload };
    
        case "ADD_LOGGED_USER":
                const newUser =  action.payload
                return{
                    ...state, recentChatList : [...state.recentChatList, newUser ] ,users : [...state.users, newUser ]
                   
                };
        case "ADD_ROOM":
            let tmp =  action.payload
            let exist = false
            state.recentChatList.map(r => {
                if (r.name == tmp.name) {    exist = true}
            })
           return exist ? state :  {
              ...state, recentChatList : [...state.recentChatList, tmp ] ,users : [...state.users, tmp ]
             };
        case "SENDMSG":
                const room = state.users[state.active_user].name
                const msg = action.payload.message
                console.log(`sending msg for room: ${room} message: ${msg}`)
                ircClient.send('PRIVMSG',room ,msg)
                return state;
        case "CREATE_GROUP" :
                const newGroup =  action.payload
                return {
                    ...state, groups : [
                        ...state.groups, newGroup
                    ]
                }
        case "LOGIN_USER":
                    return { ...state, loading: true };
        case "LOGIN_USER_SUCCESS":
                    return { ...state, user: action.payload, loading: false, error: null };
        
        case "REGISTER_USER":
                    return { ...state, loading: true };
        case "REGISTER_USER_SUCCESS":
                    return { ...state, user: action.payload, loading: false, error: null };
        
        case "LOGOUT_USER":
                    return { ...state, user: null };
        
        case "FORGET_PASSWORD":
                    return { ...state, loading: true };
        case "FORGET_PASSWORD_SUCCESS":
                    return { ...state, passwordResetStatus: action.payload, loading: false, error: null };
        
        case "API_FAILED":
            return { ...state, loading: false, error: action.payload };
                
		default:
			return state;
	}
};


export const Store = ({children}) => {
        const [state, dispatch] = React.useReducer(reducer , INIT_STATE)
        const connect = () => {
            if (ircClient == null)  ircClient = new Client()
            subscribe(dispatch)
        }
        const subscribe = dispatch => {
            ircClient.addListener('join' , (e) => createRoom(e))
            ircClient.addListener('message' , (e ,f ,g) => console.log(`msg received`))
            ircClient.addListener('message#' , (e ,f ,g) => console.log(`${e} ${JSON.stringify(f)} ${JSON.stringify(g)}` ))
            ircClient.addListener('error' , (e ) => console.log(`${JSON.stringify(e)}` ))
        
        }
        const createRoom = room => {
            dispatch({type: 'ADD_ROOM', payload: {
                id : 100,
                name : room,
                profilePicture : "Null",
                status : "away",
                unRead : 0,
                isGroup: true,
                messages: []}
            })
        }
        
        connect()
        return ( 
        <Context.Provider value={{'state': state, 'dispatch' : dispatch}}>
            {children}
        </Context.Provider>
    )
}











