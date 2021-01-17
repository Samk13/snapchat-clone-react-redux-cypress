import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import './PreviewCapture.css';
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import AddIcon from '@material-ui/icons/Add';
import NotesIcon from '@material-ui/icons/Notes';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';

const PreviewCapture = () => {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    // history.replace('/');
  };
  return (
    <div className="PreviewCapture">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <AddIcon />
        <NotesIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <TimerIcon />
        <CropIcon />
      </div>
      <img src={cameraImage} alt="PreviewCapture" />
      <div className="preview__footer">
        <h2>Send</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default PreviewCapture;
