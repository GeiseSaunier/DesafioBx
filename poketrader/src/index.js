import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { UserProvider } from './data/contexts/UserContext'
import { LoaderProvider } from './data/contexts/LoaderContext'
import firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyAtnfw_FH28tuwkiAKn3LGEnIWMqZ4SH7I",
  authDomain: "poketrader-589dd.firebaseapp.com",
  projectId: "poketrader-589dd",
  storageBucket: "poketrader-589dd.appspot.com",
  messagingSenderId: "193606706373",
  appId: "1:193606706373:web:e1a01b3449fb89655cfcac"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <LoaderProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoaderProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
