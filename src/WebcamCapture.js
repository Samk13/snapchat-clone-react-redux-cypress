import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from './features/cameraSlice';
import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

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
