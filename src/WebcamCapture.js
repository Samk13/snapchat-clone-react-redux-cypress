import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './WebcamCapture.css';
const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    history.push('/preview');
  }, [dispatch, history]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button "
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
};

export default WebcamCapture;
