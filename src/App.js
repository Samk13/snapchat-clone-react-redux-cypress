import React from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import PreviewCapture from './PreviewCapture';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <div className="app__body">
          <Switch>
            <Route path="/preview">
              <PreviewCapture />
            </Route>
            <Route exact path="/">
              <WebcamCapture />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
