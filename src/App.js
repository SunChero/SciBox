import React from 'react';
import Routes from './routes/';

//Import Scss
import "./assets/scss/themes.scss";

//import fakeBackend from './helpers/fake-backend';
import {Store} from "./store"

//fakeBackend();



function App() {
  
//   irc.addListener('join' ,(e)=> {
//     dispatch({
//       type: 'ADD_LOGGED_USER' ,
//       payload:  {id : 100, name : "#maroc", profilePicture : "Null", status : "away",unRead : 2, isGroup: true, messages: []} 
//     })
    
   
// })

  return (
   
    <Store>
       <Routes />
    </Store>
  );
}

export default App;
