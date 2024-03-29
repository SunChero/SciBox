import React from 'react';


import { TabContent, TabPane } from "reactstrap";

import Profile from "./Tabs/Profile";
import Chats from "./Tabs/Chats";
import Groups from "./Tabs/Groups";
import Contacts from "./Tabs/Contacts";
import Settings from "./Tabs/Settings";
import {repo} from "../../mobx/store"
import {useProxy} from "valtio"
function ChatLeftSidebar() {
   
   const snapshot = useProxy(repo)
    
    return (
        <React.Fragment>
            <div className="chat-leftsidebar mr-lg-1">

                <TabContent activeTab={snapshot.activeTab}>
                    {/* Start Profile tab-pane */}
                    <TabPane tabId="profile" id="pills-user">
                        {/* profile content  */}
                        <Profile />
                    </TabPane>
                   {/* End Profile tab-pane  */}

                    {/* Start chats tab-pane  */}
                    <TabPane tabId="chat" id="pills-chat">
                        {/* chats content */}
                        <Chats/>
                    </TabPane>
                    {/* End chats tab-pane */}
                    
                    {/* Start groups tab-pane */}
                    <TabPane tabId="group" id="pills-groups">
                        {/* Groups content */}
                        <Groups />
                    </TabPane>
                    {/* End groups tab-pane */}

                    {/* Start contacts tab-pane */}
                    <TabPane tabId="contacts" id="pills-contacts">
                        {/* Contact content */}
                        <Contacts/>
                    </TabPane>
                    {/* End contacts tab-pane */}
                    
                    {/* Start settings tab-pane */}
                    <TabPane tabId="settings" id="pills-setting">
                        {/* Settings content */}
                        <Settings />
                    </TabPane>
                    {/* End settings tab-pane */}
                </TabContent>
                {/* end tab content */}

                </div>
        </React.Fragment>
    );
}

export default ChatLeftSidebar