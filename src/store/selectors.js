import { createSelector } from 'reselect';
import { transduce, map, reject, isNil, append, compose, flip } from 'ramda';
import { toListKey, Maybe } from 'types';
/*
Username = String
User = { username :: Username, img :: String, recent :: Int, alltime :: Int }

UserList = RecentTop | AllTimeTop
SortOrder = Ascending | Descending
SortField = Username | Recent | AllTime

ListState u = { data :: Maybe u, isLoading :: Bool }

State = {
  users :: Dict Username User,
  userList :: {
    active :: UserList,
    lists :: Dict String (ListState [Username])
  },
  sort :: {
    order :: SortOrder,
    field :: SortField
  }
}
*/
// viewList :: (UserList, Dict String (ListState [Username])) -> ListState [Username]
const viewList = (userList, lists) => {
  const key = toListKey(userList);
  if (!lists[key]) {
    throw new Error(`Bad list key: ${key}`);
  }
  return lists[key];
};

// getActive :: State -> UserList
const active = state => state.userList.active;
// getLists :: State -> Dict String (ListState [Username])
const lists = state => state.userList.lists;
// getUsers :: State -> Dict Username User
const users = state => state.users;
// getSortField :: State -> SortField
const sortField = state => state.sort.field;
// getSortOrder :: State -> SortOrder
const sortOrder = state => state.sort.order;

// getActiveList :: State -> ListState [Username]
const getActiveList = createSelector([active, lists], viewList);
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
// getLeaderboardEntires :: State -> [User]
export const getLeaderboardEntries = createSelector(
  [users, getActiveUsernames],
  (users, usernames) => transduce(mapToUser(users), flip(append), [], usernames)
);

// isListLoading :: (State, { userList :: UserList }) -> Bool
export const isListLoading = (state, { userList }) =>
  viewList(userList, lists(state)).isLoading;

// isListSelected :: (State, { userList :: UserList }) -> Bool
export const isListSelected = (state, { userList }) =>
  active(state) === userList;

// isSortingByField :: (State, { field :: SortField }) -> Bool
export const isSortingByField = (state, { field }) =>
  field === sortField(state);

// getSortOrder :: (State, { field :: SortField }) -> Maybe SortOrder
export const getSortOrder = (state, { field }) =>
  isSortingByField(state, { field })
    ? Maybe.Just(sortOrder(state))
    : Maybe.Nothing;
