import React from 'react';
import Routes from './routes/';

//Import Scss
import "./assets/scss/themes.scss";
import Client from "./irc/irc"
//import fakeBackend from './helpers/fake-backend';
import {INIT_STATE , Handler} from "./reducer"

//fakeBackend();

export const Context = React.createContext();
const irc = new Client()
function App() {
  const [state, dispatch] = React.useReducer(Handler , INIT_STATE)
  irc.addListener('join' ,(e)=> {
    dispatch({
      type: 'ADD_LOGGED_USER' ,
      payload:  {id : 100, name : "#maroc", profilePicture : "Null", status : "away",unRead : 2, isGroup: true, messages: []} 
    })
    dispatch({
      type: 'CREATE_GROUP' ,
      payload:  {
         gourpId : 150, name : "#maroc", profilePicture : "Null", isGroup : true, unRead : 0, desc : "General Group",
            members : [
                { userId : 1, name : "Sara Muller", profilePicture : "Null", role : null },
              
            ]    
        
      } 
    })
    console.log(`trigerring`)
})

  return (
   
    <Context.Provider value={{'state': state, 'dispatch' : dispatch}}>
       <Routes />
    </Context.Provider>
  );
}

export default App;
