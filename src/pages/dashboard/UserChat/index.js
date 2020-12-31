import React, { useState,useEffect, useRef } from 'react';
import { DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader, ModalBody, CardBody, Button, ModalFooter } from "reactstrap";
import SimpleBar from "simplebar-react";
import { withRouter } from 'react-router-dom';
import UserProfileSidebar from "../../../components/UserProfileSidebar";
import SelectContact from "../../../components/SelectContact";
import UserHead from "./UserHead";
import ImageList from "./ImageList";
import ChatInput from "./ChatInput";
import FileList from "./FileList";
import avatar4 from "../../../assets/images/users/avatar-4.jpg";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import {useProxy} from "valtio"
import {repo, getConversation , deleteMessage, addMessage} from "../../../mobx/store"
//i18n
import { useTranslation } from 'react-i18next';

function UserChat(props) {
    const snapshot = useProxy(repo)
    const ref = useRef();
    const [modal, setModal] = useState(false);
    const { t } = useTranslation();

    const [ allUsers ] = useState(snapshot.recentChatList);
    const [ chatMessages, setchatMessages ] = useState(getConversation()[0].messages);
    
    const toggle = () => setModal(!modal);
    const createMessage = (message, type) => {
        var messageObj = null;
        let d = new Date();
        var n = d.getSeconds();
        //matches the message type is text, file or image, and create object according to it
        switch (type) {
            case "textMessage":
                messageObj = {
                    id : chatMessages.length+1,
                    message : message,
                    time : "00:" + n,
                    userType : "sender",
                    image : avatar4,
                    isFileMessage : false,
                    isImageMessage : false
                }
                break;

            case "fileMessage":
                messageObj = {
                    id : chatMessages.length+1,
                    message : 'file',
                    fileMessage : message.name,
                    size : message.size,
                    time : "00:" + n,
                    userType : "sender",
                    image : avatar4,
                    isFileMessage : true,
                    isImageMessage : false
                }
                break;

            case "imageMessage":
                var imageMessage = [
                    { image : message },
                ]

                messageObj = {
                    id : chatMessages.length+1,
                    message : 'image',
                    imageMessage : imageMessage,
                    size : message.size,
                    time : "00:" + n,
                    userType : "sender",
                    image : avatar4,
                    isImageMessage : true,
                    isFileMessage : false
                }
                break;
        
            default:
                break;
        }
        addMessage(messageObj)
        //copyallUsers[props.active_user].isTyping = false;
        scrolltoBottom();
    }
    function scrolltoBottom(){
        if (ref.current.el) {
            ref.current.getScrollElement().scrollTop = ref.current.getScrollElement().scrollHeight;
        }
    }
    
    console.log(`conversation return ${JSON.stringify(getConversation())}`)
    return (
        <React.Fragment>
            <div className="user-chat w-100">
                
                <div className="d-lg-flex">

                    <div className={ snapshot.userSidebar ? "w-70" : "w-100" }>

                        {/* render user head */}
                        <UserHead /> 

                            <SimpleBar
                                style={{ maxHeight: "100%" }}
                                ref={ref}
                                className="chat-conversation p-3 p-lg-4"
                                id="messages">
                            <ul className="list-unstyled mb-0">
                            
                                
                                {
                                    getConversation()[0].messages.map((chat, key) => 
                                        chat.isToday && chat.isToday === true ? <li key={"dayTitle" + key}> 
                                            <div className="chat-day-title">
                                                <span className="title">Today</span>
                                            </div>
                                        </li> : 
                                        (getConversation()[0].isGroup === true) ? 
                                            <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                <div className="conversation-list">
                                                    
                                                    <div className="chat-avatar">
                                                    {chat.userType === "sender" ?   <img src={avatar1} alt="chatvia" /> : 
                                                        getConversation()[0].profilePicture === "Null" ?
                                                                <div className="chat-user-img align-self-center mr-3">
                                                                            <div className="avatar-xs">
                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                    {chat.userName && chat.userName.charAt(0)}                                                                                    
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                        :  <img src={getConversation()[0].profilePicture} alt="chatvia" />
                                                    }
                                                    </div>
                
                                                    <div className="user-chat-content">
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                {
                                                                    chat.message &&
                                                                        <p className="mb-0">
                                                                            {chat.message}
                                                                        </p>
                                                                }
                                                                {
                                                                    chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                }
                                                                {
                                                                    chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                }
                                                                {
                                                                    chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                            </span>
                                                                        </p>
                                                                }
                                                                {
                                                                    !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                }
                                                            </div>
                                                            {
                                                                !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start">
                                                                        <DropdownToggle tag="a">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id) }>Delete <i className="ri-delete-bin-line float-right text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                            }
                                                            
                                                        </div>
                                                        {
                                                            <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : chat.userName}</div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>
                                        :
                                            <li key={key} className={chat.userType === "sender" ? "right" : ""}>
                                                <div className="conversation-list">
                                                        {
                                                            //logic for display user name and profile only once, if current and last messaged sent by same receiver
                                                            chatMessages[key+1] ? chatMessages[key].userType === chatMessages[key+1].userType ? 
                                                            
                                                            <div className="chat-avatar">
                                                                <div className="blank-div"></div>
                                                            </div>
                                                            :  
                                                                <div className="chat-avatar">
                                                                    {chat.userType === "sender" ?   <img src={avatar1} alt="chatvia" /> : 
                                                                        getConversation()[0].profilePicture === "Null" ?
                                                                                <div className="chat-user-img align-self-center mr-3">
                                                                                            <div className="avatar-xs">
                                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                                    {getConversation()[0].name.charAt(0)}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                        :  <img src={getConversation()[0].profilePicture} alt="chatvia" />
                                                                    }
                                                                </div>
                                                            :   <div className="chat-avatar">
                                                                    {chat.userType === "sender" ?   <img src={avatar1} alt="chatvia" /> : 
                                                                        getConversation()[0].profilePicture === "Null" ?
                                                                                <div className="chat-user-img align-self-center mr-3">
                                                                                            <div className="avatar-xs">
                                                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                                                    {getConversation()[0].name.charAt(0)}
                                                                                                </span>
                                                                                            </div>
                                                                                        </div>
                                                                        :  <img src={getConversation()[0].profilePicture} alt="chatvia" />
                                                                    }
                                                                </div>
                                                        }
                                                    
                
                                                    <div className="user-chat-content">
                                                        <div className="ctext-wrap">
                                                            <div className="ctext-wrap-content">
                                                                {
                                                                    chat.message &&
                                                                        <p className="mb-0">
                                                                            {chat.message}
                                                                        </p>
                                                                }
                                                                {
                                                                    chat.imageMessage &&
                                                                        // image list component
                                                                        <ImageList images={chat.imageMessage} />
                                                                }
                                                                {
                                                                    chat.fileMessage &&
                                                                        //file input component
                                                                        <FileList fileName={chat.fileMessage} fileSize={chat.size} />
                                                                }
                                                                {
                                                                    chat.isTyping &&
                                                                        <p className="mb-0">
                                                                            typing
                                                                            <span className="animate-typing">
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                                <span className="dot ml-1"></span>
                                                                            </span>
                                                                        </p>
                                                                }
                                                                {
                                                                    !chat.isTyping && <p className="chat-time mb-0"><i className="ri-time-line align-middle"></i> <span className="align-middle">{chat.time}</span></p>
                                                                }
                                                            </div>
                                                            {
                                                                !chat.isTyping &&
                                                                    <UncontrolledDropdown className="align-self-start">
                                                                        <DropdownToggle tag="a">
                                                                            <i className="ri-more-2-fill"></i>
                                                                        </DropdownToggle>
                                                                        <DropdownMenu>
                                                                            <DropdownItem>{t('Copy')} <i className="ri-file-copy-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem>{t('Save')} <i className="ri-save-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={toggle}>Forward <i className="ri-chat-forward-line float-right text-muted"></i></DropdownItem>
                                                                            <DropdownItem onClick={() => deleteMessage(chat.id) }>Delete <i className="ri-delete-bin-line float-right text-muted"></i></DropdownItem>
                                                                        </DropdownMenu>
                                                                    </UncontrolledDropdown>
                                                            }
                                                            
                                                        </div>
                                                        {
                                                            chatMessages[key+1] ? chatMessages[key].userType === chatMessages[key+1].userType ? null :  <div className="conversation-name">{chat.userType === "sender" ? "Patricia Smith" : getConversation()[0].name}</div> : <div className="conversation-name">{chat.userType === "sender" ? "Admin" : getConversation()[0].name}</div>
                                                        }
                                                        {/* {
                                                            <div className="conversation-name">{chat.userType === "sender" ? "Admin" : props.recentChatList[props.active_user].name}</div>
                                                        } */}

                                                    </div>
                                                </div>
                                            </li>
                                    )
                                }
                                 </ul>
                                </SimpleBar>

                        <Modal backdrop="static" isOpen={modal} centered toggle={toggle}>
                            <ModalHeader toggle={toggle}>Forward to...</ModalHeader>
                            <ModalBody>
                                <CardBody className="p-2">
                                    <SimpleBar style={{maxHeight: "200px"}}>
                                        <SelectContact handleCheck={() => {}} />
                                    </SimpleBar>
                                    <ModalFooter className="border-0">
                                        <Button color="primary">Forward</Button>
                                    </ModalFooter>
                                </CardBody>
                            </ModalBody>
                        </Modal>
    
                        <ChatInput onaddMessage={createMessage} />
                    </div>

                    <UserProfileSidebar activeUser={getConversation()[0]} {...snapshot} />

                </div>
            </div>
        </React.Fragment>
    );
}


export default withRouter(UserChat)