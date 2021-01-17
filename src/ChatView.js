import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ChatView.css';
import { selectSelectedImage } from './features/appSlice';

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const history = useHistory();
  const exit = useCallback(() => {
    history.replace('/chats');
  }, [history]);

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [exit, selectedImage]);

  return (
    <div className="chatview">
      <img src={selectedImage} onClick={exit} alt="one_image" />
    </div>
  );
};

export default ChatView;
