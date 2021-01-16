import React from 'react';
import { useSelector } from 'react-redux';
import { selectCameraImage } from './features/cameraSlice';
import './PreviewCapture.css';

const PreviewCapture = () => {
  const cameraImage = useSelector(selectCameraImage);
  return (
    <div className="PreviewCapture">
      <h1>the preview</h1>
      <img src={cameraImage} alt="PreviewCapture" />
    </div>
  );
};

export default PreviewCapture;
