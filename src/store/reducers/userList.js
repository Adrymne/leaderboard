import { pipe, evolve, assocPath, map, cond } from 'ramda';
import { liftState } from 'redux-loop';
import { createReducer, runWith } from 'utils';
import { UserList, toListKey, Maybe } from 'types';
import { SET_ACTIVE_LIST, LOAD_USER_DATA, loadUserData } from 'store/actions';
import { fetchUsers } from 'store/effects';

const IS_LOADING = [
  // predicate :: (State, { payload :: UserList }) -> Boolean
  (state, { payload }) => state.lists[toListKey(payload)].isLoading,
  // transformer :: (State, { payload :: UserList }) -> (State, Cmd)
  (state, { payload }) => liftState(evolve({ active: () => payload }, state))
];
const OTHERWISE = [
  // predicate :: (State, Action) -> Bool
  () => true,
  // transformer :: (State, { payload :: UserList }) -> (State, Cmd)
  pipe(
    (state, action) =>
      evolve(
        {
          active: () => action.payload,
          lists: assocPath([toListKey(action.payload), 'isLoading'], true)
        },
        state
      ),
    runWith(state => ({
      cmd: fetchUsers,
      onSuccess: loadUserData,
      args: [state.active]
    }))
  )
];
const setActiveList = cond([IS_LOADING, OTHERWISE]);

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
