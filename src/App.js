import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import PreviewCapture from './PreviewCapture';
import ChatView from './ChatView';
import Chats from './Chats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
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
        )}
      </Router>
    </div>
  );
}

export default App;
