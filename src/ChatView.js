import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ChatView.css';
import { selectSelectedImage } from './features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

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
  }, [selectedImage]);

  return (
    <div className="chatview">
      <img src={selectedImage} onClick={exit} alt="one_image" />
      <div className="chatview__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#f7bb01', 0.33],
            ['#a30000', 0.33],
          ]}
        >
          {({ remainingTime }) =>
            remainingTime === 0 ? exit() : remainingTime
          }
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default ChatView;
