import { pipe, evolve, assocPath, map } from 'ramda';
import { liftState } from 'redux-loop';
import { createReducer, runWith } from 'utils';
import { UserList, toListKey, Maybe } from 'types';
import { SET_ACTIVE_LIST, LOAD_USER_DATA, loadUserData } from 'store/actions';
import { fetchUsers } from 'store/effects';

const setActiveList = pipe(
  (state, action) =>
    evolve(
      {
        active: () => action.payload,
        lists: assocPath([toListKey(action.payload), 'isLoading'], true)
      },
      state
    ),
  // TODO: run fetch iff not currently loading
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
    { data: Maybe.Just(getUsernames(action.payload.users)), isLoading: false },
    state
  );

const LIST_INITIAL = { data: Maybe.Nothing, isLoading: false };
const DEFAULT = {
  active: UserList.RecentTop,
  lists: {
    [toListKey(UserList.RecentTop)]: LIST_INITIAL,
    [toListKey(UserList.AllTimeTop)]: LIST_INITIAL
  }
};
export default createReducer(DEFAULT, {
  [SET_ACTIVE_LIST]: setActiveList,
  [LOAD_USER_DATA]: pipe(loadUserList, liftState)
});
