import React , {useEffect } from 'react'
import {Link} from "react-router-dom"
import { Media} from "reactstrap";
import {useProxy} from "valtio"
import {repo} from "../mobx/store"
function ConversationHandle(props){
    const snapshot = useProxy(repo)
    const chat = props.chat
      const openUserChat = (e,chat) => {
        e.preventDefault();
        //repo.activePane =chat.id
        repo.active_user = chat.id
        var chatList = document.getElementById("chat-list");
        var clickedItem = e.target;
        var currentli = null;
        if(chatList) {
            var li = chatList.getElementsByTagName("li");
            //remove coversation user
            for(var i=0; i<li.length; ++i){
                if(li[i].classList.contains('active')){
                    li[i].classList.remove('active');
                }
            }
            //find clicked coversation user
            for(var k=0; k<li.length; ++k){
                if(li[k].contains(clickedItem)) {
                    currentli = li[k];
                    break;
                } 
            }
        }

        //activation of clicked coversation user
        if(currentli) {
            currentli.classList.add('active');
        }

        var userChat = document.getElementsByClassName("user-chat");
        if(userChat) {
            userChat[0].classList.add("user-chat-show");
        }

        //removes unread badge if user clicks
        var unread = document.getElementById("unRead" + chat.id);
        if(unread) {
            unread.style.display="none";
        }
    }
    
   console.log(snapshot.active_user)
    return (
        <li key={props.id} id={"conversation" + props.id} className={chat.unRead ? "unread" : chat.isTyping ?  "typing" :  props.chat.id === snapshot.active_user ? "active" : ""}>
            <Link to="#" onClick={e => openUserChat(e,chat)}>
                <Media>
                    {
                        chat.profilePicture === "Null" ?
                            <div className={"chat-user-img " + chat.status +" align-self-center mr-3"}>
                                <div className="avatar-xs">
                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                        {chat.name.charAt(0)}
                                    </span>
                                </div>
                                {
                                    chat.status &&  <span className="user-status"></span>
                                }
                            </div>
                            :
                            <div className={"chat-user-img " + chat.status +" align-self-center mr-3"}>
                                <img src={chat.profilePicture} className="rounded-circle avatar-xs" alt="chatvia" />
                                    {
                                        chat.status &&  <span className="user-status"></span>
                                    }
                            </div>
                    }
                    <Media body className="overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1">{chat.name}</h5>
                        <p className="chat-user-message text-truncate mb-0">
                        {
                            chat.isTyping ?
                            <>
                                typing<span className="animate-typing">
                                      <span className="dot ml-1"></span>
                                      <span className="dot ml-1"></span>
                                      <span className="dot ml-1"></span>
                                </span>
                            </>
                        :
                            <>
                                {
                                    chat.messages && (chat.messages.length > 0 && chat.messages[(chat.messages).length - 1].isImageMessage === true) ? <i className="ri-image-fill align-middle mr-1"></i> : null
                                }
                                {
                                    chat.messages && (chat.messages.length > 0  && chat.messages[(chat.messages).length - 1].isFileMessage === true) ? <i className="ri-file-text-fill align-middle mr-1"></i> : null
                                }
                                {chat.messages && chat.messages.length > 0 ?  chat.messages[(chat.messages).length - 1].message : null}
                            </>
                        }
                        </p>
                    </Media>
                    <div className="font-size-11">{chat.messages && chat.messages.length > 0 ?  chat.messages[(chat.messages).length - 1].time : null}</div>
                    {chat.unRead === 0 ? null :
                        <div className="unread-message" id={"unRead" + chat.id}>
                            <span className="badge badge-soft-danger badge-pill">{chat.messages && chat.messages.length > 0 ? chat.unRead >= 20 ? chat.unRead + "+" : chat.unRead  : ""}</span>
                        </div>
                    } 
                </Media>
            </Link>
        </li>
    )
}


export default ConversationHandle