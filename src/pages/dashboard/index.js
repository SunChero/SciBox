import React  from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/";
import {Context} from "../../App"

export default function Index() {
  
    const {state, dispatch , c} = React.useContext(Context)
    
    return (
        <React.Fragment>
        {/* chat left sidebar */}
            <ChatLeftSidebar {...{dispatch , ...state}}/>

        {/* user chat */}
            <UserChat {...{dispatch , ...state}}/>
        
        </React.Fragment>
    )
}
