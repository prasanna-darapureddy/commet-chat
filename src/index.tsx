import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CometChat } from "@cometchat/chat-sdk-javascript"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


let appID = "257070f7b807a6c3";
let region = "in";

let appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();
CometChat.init(appID, appSetting).then(
  () => {

  },
  (error) => {
    alert("Initialization failed with error");
  }
);