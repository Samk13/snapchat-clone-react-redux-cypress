import { Button } from '@material-ui/core';
import { login } from './features/appSlice';
import { auth, provider } from './firebase';
import { useDispatch } from 'react-redux';
import React from 'react';
import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
          alt="test"
        />
        <Button variant="outlined" onClick={signIn}>
          SignIn
        </Button>
      </div>
    </div>
  );
}

export default Login;
