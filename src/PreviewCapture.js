import { resetCameraImage, selectCameraImage } from './features/cameraSlice';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import CloseIcon from '@material-ui/icons/Close';
import NotesIcon from '@material-ui/icons/Notes';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import CropIcon from '@material-ui/icons/Crop';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect } from 'react';
import { storage, db } from './firebase';
// generate unique id for every post we send to firestore
import { v4 as uuid } from 'uuid';
import firebase from 'firebase';
import './PreviewCapture.css';

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
  const sendPost = async () => {
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
      async () => {
        // Complete function will trigger here
        await storage
          .ref('posts')
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              imageUrl: url,
              username: user.username,
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
