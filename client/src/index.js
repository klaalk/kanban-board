import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {AppState} from "./app/state/app.state";
import {StateProvider} from "./app/state/state.provider";
import {appEffect} from "./app/state/app.effect";
import {appReducer} from "./app/state/app.reducer";
import App from './app/App';


// Importing CSS
import "./index.css";
import "./app/commons/styles/modal.style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

ReactDOM.render(
      <Router>
          <StateProvider reducer={appReducer} effect={appEffect} initialState={AppState}>
            <App/>
          </StateProvider>
      </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
