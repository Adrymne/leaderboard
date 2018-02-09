import { combineReducers } from 'redux-loop';
import users from './users';
import userList from './userList';

export default combineReducers({ users, userList });
