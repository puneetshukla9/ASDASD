import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import UserService from './service/userService';


const userDetailReducer = (state = {
    userDetails: [],
    loading: true,
    showModal: false,
    currentUserDetail: {}
}, action) => {
    switch (action.type) {
        case 'fetch':
            state = {
                ...state,
                userDetails: action.payload.userDetails,
                loading: action.payload.loading
            }

            break;
        case 'save':
            state = {
                ...state,
                userDetails: action.payload.userDetails
            }
            break;
        case 'edit':
            state = {
                ...state,
                currentUserDetail: action.payload.currentUserDetail
            }
            break;
        case 'showHideModal':
            state = {
                ...state,
                showModal: action.payload.showModal
            }
            break;
        case 'delete': break;
    }
    console.log(state)
    return state;
}

const store = createStore(combineReducers({ userDetailReducer }));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
