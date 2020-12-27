import React, { Component } from 'react';

import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/";
import  {StoreContext} from "../../storeb/";
import {observer } from "mobx-react-lite"

const DashBoard =  (props) => {
    
    const store = React.useContext(StoreContext)
   
    return (
       
            <React.Fragment>
                {/* chat left sidebar */}
                <ChatLeftSidebar {...store}/>

                {/* user chat */}
                <UserChat {...store  } recentChatList={store.users} />
                
            </React.Fragment>
     
    )
}


export default DashBoard