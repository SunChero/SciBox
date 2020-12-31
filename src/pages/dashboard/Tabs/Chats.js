import React, { Component, useEffect } from 'react';
import { Input, InputGroupAddon, InputGroup, Media, Button } from "reactstrap";
import ConversationHandle from "../../../components/ConversationHandle"
import SimpleBar from "simplebar-react";
//components
import {repo} from "../../../mobx/store"
import {useProxy} from "valtio"
import OnlineUsers from "./OnlineUsers";

const Chats = () =>  {
    var snapshot = useProxy(repo)
    const [search, setSearch] = React.useState("")
    const [searchList, setSearchList] = React.useState(snapshot.recentChatList)
    console.log(`${JSON.stringify(snapshot.recentChatList)}`)
    useEffect(() =>{
        var li = document.getElementById("conversation" + snapshot.active_user);
        if(li){
            li.classList.add("active");
        }
    },[])


    const handleChange = (e) => {
        //this.setState({ searchChat : e.target.value });
        setSearch(e.target.value)
        
        let filteredArray = [];
        
        //find conversation name from array
        for (let i = 0; i < snapshot.recentChatList.length; i++) {
            if(snapshot.recentChatList[i].name.toLowerCase().includes(search) || snapshot.recentChatList[i].name.toUpperCase().includes(search))
                filteredArray.push(snapshot.recentChatList[i]);
        }

        //set filtered items to state
       setSearchList(filteredArray)

        //if input value is blanck then assign whole recent chatlist to array
        if(search === "") setSearchList(snapshot.recentChatList)
    }


    
       /// let active_user = this.props.active_user
        return (
            <React.Fragment>
                        <div>
                            <div className="px-4 pt-4">
                                <h4 className="mb-4">Chats</h4>
                                <div className="search-box chat-search-box">
                                    <InputGroup size="lg" className="mb-3 bg-light rounded-lg">
                                        <InputGroupAddon addonType="prepend">
                                            <Button color="link" className="text-muted pr-1 text-decoration-none" type="button">
                                                <i className="ri-search-line search-icon font-size-18"></i>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input type="text" value={search} onChange={(e) => handleChange(e)} className="form-control bg-light" placeholder="Search messages or users" />
                                    </InputGroup> 
                                </div>
                                {/* Search Box */}
                            </div> 

                            {/* online users */}
                            <OnlineUsers />

                            {/* Start chat-message-list  */}
                            <div className="px-2">
                                <h5 className="mb-3 px-3 font-size-16">Recent</h5>
                                <SimpleBar style={{ maxHeight: "100%" }} className="chat-message-list">

                                    <ul className="list-unstyled chat-list chat-user-list" id="chat-list">
                                        {
                                            snapshot.recentChatList.map(  (chat, idx) =>
                                             <ConversationHandle key={idx} id={chat.id} chat={chat} /> )
                                        }
                                    </ul>
                                    </SimpleBar>
                                    
                            </div>
                            {/* End chat-message-list */}
                        </div>
            </React.Fragment>
        );
    
}

// const mapStateToProps = (state) => {
//     const { active_user } = state.Chat;
//     return { active_user };
// };

export default Chats