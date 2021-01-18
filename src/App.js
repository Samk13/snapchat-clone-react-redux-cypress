import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import PreviewCapture from './PreviewCapture';
import ChatView from './ChatView';
import Chats from './Chats';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
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
