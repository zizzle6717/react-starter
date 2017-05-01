'use strict';

import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();
let store, storedUser, preLoadedState;
let composeEnhancers = compose;

// Grab the state from a global variable injected into the server-generated HTML
function safelyParse(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return JSON.parse(doc.documentElement.textContent);
}

// Get stored user details from session storage if they are already logged in
if(typeof(Storage) !== "undefined" && typeof(window) !== 'undefined') {
	storedUser = JSON.parse(sessionStorage.getItem('user'));
	storedUser = storedUser ? storedUser : {};
	preLoadedState = Object.assign(safelyParse(window.__PRELOADED_STATE__), {'user': storedUser, 'isAuthenticated': !!storedUser.roleConfig});
	// TODO: Reconfigure redux-devtools
	// composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

if (process.env.NODE_ENV === 'production') {
	// Create Store (Production)
	store = createStore(
		rootReducer,
		preLoadedState,
		applyMiddleware(
			thunkMiddleware
		)
	);
} else {
	// Create Store - Redux Development (Chrome Only)
	store = createStore(
		rootReducer,
		preLoadedState,
		composeEnhancers(applyMiddleware(
			thunkMiddleware, // let's us dispatch functions
			loggerMiddleware // middleware that logs actions (development only)
		))
	);
}


export default store;