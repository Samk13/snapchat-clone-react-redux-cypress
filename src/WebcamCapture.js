import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  return (
    <div className="webcamcapture">
      <Webcam
        audio={false}
        width={videoConstraints.width}
        height={videoConstraints.height}
        videoConstraints={videoConstraints}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
      />
    </div>
  );
};

export default WebcamCapture;
