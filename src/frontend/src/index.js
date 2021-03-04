import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {Provider} from 'react-redux';
import store from './store'


ReactDOM.render(
<<<<<<< HEAD
        <Provider store={store}>
            <App />
        </Provider>,
=======
    // <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>,
    // </React.StrictMode>,
>>>>>>> 3b89579d3f37c83ca8e1de5e63dddbdffdd42597
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
