import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { login, logout, selectUser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import PreviewCapture from './PreviewCapture';
import WebcamCapture from './WebcamCapture';
import React, { useEffect } from 'react';
import ChatView from './ChatView';
import { auth } from './firebase';
import Chats from './Chats';
import Login from './Login';
import './App.css';

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
  }, [dispatch]);
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
