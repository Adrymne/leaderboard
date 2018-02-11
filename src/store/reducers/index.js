import { combineReducers } from 'redux-loop';
import users from './users';
import userList from './userList';
import sort from './sort';

export default combineReducers({ users, userList, sort });
