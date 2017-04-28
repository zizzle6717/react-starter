'use strict';

import {combineReducers} from 'redux';
import {provider, providers} from './providers';
import {contact, contacts} from './contacts';
import {alerts} from '../library/alerts';
import {user, users, isAuthenticated, redirectRoute} from '../library/authentication';
import {loader} from '../library/loader';
import {forms} from '../library/validations';

export default combineReducers({
	contact,
	contacts,
	provider,
	providers,

	// library
	alerts,
	forms,
	isAuthenticated,
	loader,
	redirectRoute,
	user,
	users
});
