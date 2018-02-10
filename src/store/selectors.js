import { createSelector } from 'reselect';
import {
  transduce,
  map,
  reject,
  isNil,
  append,
  compose,
  flip,
  curry
} from 'ramda';
import { toListKey, Maybe } from 'types';
/*
Username = String
User = { username :: Username, img :: String, recent :: Int, alltime :: Int }

UserList = RecentTop | AllTimeTop

ListState u = { data :: Maybe u, isLoading :: Bool }

State = {
  users :: Dict Username User,
  userList :: {
    active :: UserList,
    lists :: Dict String (ListState [Username])
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
const getActive = state => state.userList.active;
// getLists :: State -> Dict String (ListState [Username])
const getLists = state => state.userList.lists;
// getUsers :: State -> Dict Username User
const getUsers = state => state.users;

// getActiveList :: State -> ListState [Username]
const getActiveList = createSelector([getActive, getLists], viewList);
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
  [getUsers, getActiveUsernames],
  (users, usernames) => transduce(mapToUser(users), flip(append), [], usernames)
);

// isListLoading :: (State, { userList :: UserList }) -> Bool
export const isListLoading = (state, { userList }) =>
  viewList(userList, getLists(state)).isLoading;

// isListSelected :: (State, { userList :: UserList }) -> Bool
export const isListSelected = (state, { userList }) =>
  getActive(state) === userList;
