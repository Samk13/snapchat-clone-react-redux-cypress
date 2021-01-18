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
// generate unique id for every post we send to firestore
import { v4 as uuid } from 'uuid';
import { storage, db } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/appSlice';

const PreviewCapture = () => {
  const cameraImage = useSelector(selectCameraImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    if (!cameraImage) {
      history.replace('/');
    }
  }, [cameraImage, history]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    // history.replace('/');
  };
  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage
      .ref(`posts/${id}`)
      .putString(cameraImage, 'data_url');
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
      },
      () => {
        // Complete function will trigger here
        storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              username: 'Sam React',
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace('/chats');
          });
      }
    );
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
      <div onClick={sendPost} className="preview__footer">
        <h2>Send</h2>
        <SendIcon className="preview__sendIcon" />
      </div>
    </div>
  );
};

export default PreviewCapture;
