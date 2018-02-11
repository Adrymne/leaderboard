import { createSelector } from 'reselect';
import { transduce, map, reject, isNil, append, compose, flip } from 'ramda';
import { toListKey, Maybe } from 'types';
import * as get from './state';
import { getSortFunction } from './sort';
// viewList :: (UserList, Dict String (ListState [Username])) -> ListState [Username]
const viewList = (userList, lists) => {
  const key = toListKey(userList);
  if (!lists[key]) {
    throw new Error(`Bad list key: ${key}`);
  }
  return lists[key];
};

// getActiveList :: State -> ListState [Username]
const getActiveList = createSelector([get.active, get.lists], viewList);
// getActiveUsernames :: State -> [Username]
const getActiveUsernames = createSelector([getActiveList], ({ data }) =>
  Maybe.case({ Just: usernames => usernames, Nothing: () => [] }, data)
);

// isLoadedData :: State -> Bool
export const isDataInActiveList = createSelector([getActiveList], ({ data }) =>
  Maybe.case({ Just: () => true, Nothing: () => false }, data)
);

// mapToUser :: Dict Username User -> Transducer [User] Username
// TODO: sorting
const mapToUser = users =>
  compose(map(username => users[username]), reject(isNil));
// getActiveUsers :: State -> [User]
export const getActiveUsers = createSelector(
  [get.users, getActiveUsernames],
  (users, usernames) => transduce(mapToUser(users), flip(append), [], usernames)
);
// getLeaderboardEntries :: State -> [User]
export const getLeaderboardEntries = createSelector(
  [getSortFunction, getActiveUsers],
  (sort, users) => sort(users)
);

// isListLoading :: (State, { userList :: UserList }) -> Bool
export const isListLoading = (state, { userList }) =>
  viewList(userList, get.lists(state)).isLoading;

// isListSelected :: (State, { userList :: UserList }) -> Bool
export const isListSelected = (state, { userList }) =>
  get.active(state) === userList;

// isSortingByField :: (State, { field :: SortField }) -> Bool
export const isSortingByField = (state, { field }) =>
  field === get.sortField(state);

// getSortOrder :: (State, { field :: SortField }) -> Maybe SortOrder
export const getSortOrder = (state, { field }) =>
  isSortingByField(state, { field })
    ? Maybe.Just(get.sortOrder(state))
    : Maybe.Nothing;
