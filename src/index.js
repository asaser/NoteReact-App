import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import "firebase/database";
import config from './config.json';

// to będzie można przenieść do innego folderu
const firebaseConfig = {
  apiKey: config.firebaseAPI,
  authDomain: "reactnotes-app.firebaseapp.com",
  databaseURL: "https://reactnotes-app-default-rtdb.firebaseio.com",
  projectId: "reactnotes-app",
  storageBucket: "reactnotes-app.appspot.com",
  messagingSenderId: "1084941155966",
  appId: "1:1084941155966:web:0c174f7cde123b9e8e222f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();