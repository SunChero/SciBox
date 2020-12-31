import React  from 'react';
//Import Components
import ChatLeftSidebar from "./ChatLeftSidebar";
import UserChat from "./UserChat/";


export default function Index() {
    
    //const {state, dispatch } = React.useContext(Context)
 
    return (
        <React.Fragment>
        {/* chat left sidebar */}
            <ChatLeftSidebar />

        {/* user chat */}
            <UserChat />
        
        </React.Fragment>
    )
}
