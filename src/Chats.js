import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { resetCameraImage } from './features/cameraSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { selectUser } from './features/appSlice';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { auth, db } from './firebase';
import Chat from './Chat';
import './Chats.css';

const Chats = () => {
  const [unmounted, setUnmounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    !unmounted &&
      db
        .collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          if (snapshot.size && !unmounted) {
            setPosts(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          }
        });
    return () => setUnmounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    history.push('/');
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input placeholder="friends" type="text" />
        </div>
        <ChatBubbleIcon color="inherit" className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chat__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
