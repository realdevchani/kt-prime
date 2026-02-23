import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {legacy_createStore as createStore} from 'redux'
import {Provider} from 'react-redux'
import {devToolsEnhancer} from '@redux-devtools/extension'
import rootReducer from './modules';

const store = createStore(rootReducer, devToolsEnhancer())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
