import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import PreviewCapture from './PreviewCapture';
import ChatView from './ChatView';
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="app__body">
          <Switch>
            <Route path="/chats">
              <Chats />
            </Route>
            <Route path="/chat/chatview">
              <ChatView />
            </Route>
            <Route path="/preview">
              <PreviewCapture />
            </Route>
            <Route exact path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
