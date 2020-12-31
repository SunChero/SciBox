import {addMessage, addMessageToConversation, createConversation, getConversation, repo} from "./store"
import {nanoid} from "nanoid"


let ws = null

export const Connect = () => {
        const nick = nanoid()
        if (ws == null) ws =  new WebSocket("wss://ws.hanifi.ca:8097")
        ws.onmessage = async(e) =>{
            await new Promise(r => setTimeout(r, 4000));
            if (e.data.startsWith("PING")) return ws.send("PONG " + e.data.split(" ")[1])
            let msgs = e.data.split(' ')
            let src = msgs[0]
            let type = msgs[1]
            let dst = msgs[2]
            let msg = e.data.split(':')[2]
            let exist = false
            if  (type == 'PRIVMSG') {
                repo.recentChatList.map(conv => {
                    if (conv.name == dst){
                        exist =true
                        addMessageToConversation( dst,
                            {
                               id : nanoid(),
                               message : msg,
                               time : "00:" ,
                               userType : "sender",
                               image : "Null",
                               isFileMessage : false,
                               isImageMessage : false
                           } )
                    }
                })
                if (exist)  return 
                createConversation(dst)
                addMessageToConversation( dst,
                    {
                       id : nanoid(),
                       message : msg,
                       time : "00:" ,
                       userType : "sender",
                       image : "Null",
                       isFileMessage : false,
                       isImageMessage : false
                   } )

            }           
            
            else if  (type == 'JOIN') { createConversation(dst)}
            console.log(e.data)
        }
        ws.onopen = (e) => {
            ws.send("USER sun sun sun sun")
            ws.send(`NICK ${nanoid()}`)
            ws.send("JOIN #maroc")
        }
        ws.onclose = (e)  => console.log(`${e.data} ` )
        ws.onerror = (e) => console.log(`${e.data}` )
    }
export const Send = (msg, dst) => {
    ws.send(`PRIVMSG ${msg} ${dst}`)
}








