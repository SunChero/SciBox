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
      payload:  {id : 100, name : "Adil", profilePicture : "Null", status : "away",unRead : 2, isGroup: false, messages: []} 
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
