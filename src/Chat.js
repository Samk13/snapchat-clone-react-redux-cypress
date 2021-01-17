import { Avatar } from '@material-ui/core';
import { StopRounded } from '@material-ui/icons';
import ReactTimeago from 'react-timeago';
import React from 'react';
import './Chat.css';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { db } from './firebase';
import { useHistory } from 'react-router-dom';

const Chat = ({ id, username, timestamp, read, imageUrl, profilePic }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const openMessage = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      db.collection('posts').doc(id).set(
        {
          read: true,
        },
        // merge true so Cloud Fire store will edit the read without replacing the entire entry
        {
          merge: true,
        }
      );

      history.push('/chat/chatview');
    }
  };

  return (
    <div onClick={openMessage} className="chat">
      <Avatar className="chat__avatar" src={profilePic} />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          {!read ? 'tap to view -' : 'reded'}{' '}
          {<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />}
        </p>
      </div>
      {!read && <StopRounded className="chat__readIcon" />}
    </div>
  );
};

export default Chat;
