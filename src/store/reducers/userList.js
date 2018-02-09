import { pipe, assoc, assocPath, map } from 'ramda';
import { liftState } from 'redux-loop';
import { createReducer, runWith } from 'utils';
import { UserList, toListKey, ListState } from 'types';
import { SET_ACTIVE_LIST, LOAD_USER_DATA, loadUserData } from 'store/actions';
import { fetchUsers } from 'store/effects';

const setActiveList = pipe(
  (state, action) => assoc('active', action.payload, state),
  runWith(state => ({
    cmd: fetchUsers,
    onSuccess: loadUserData,
    args: [state.active]
  }))
);

const getUsernames = map(({ username }) => username);
const loadUserList = (state, action) =>
  assocPath(
    ['lists', toListKey(action.payload.userList)],
    ListState.Loaded(getUsernames(action.payload.users)),
    state
  );

const DEFAULT = {
  active: UserList.RecentTop,
  lists: {
    [toListKey(UserList.RecentTop)]: ListState.NotLoaded,
    [toListKey(UserList.AllTimeTop)]: ListState.NotLoaded
  }
};
export default createReducer(DEFAULT, {
  [SET_ACTIVE_LIST]: setActiveList,
  [LOAD_USER_DATA]: pipe(loadUserList, liftState)
});
