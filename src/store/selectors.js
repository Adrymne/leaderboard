import { createSelector } from 'reselect';
import { transduce, map, reject, isNil, append, compose, flip } from 'ramda';
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

// getActive :: State -> UserList
const getActive = state => state.userList.active;
// getLists :: State -> Dict String (ListState [Username])
const getLists = state => state.userList.lists;
// getUsers :: State -> Dict Username User
const getUsers = state => state.users;

// getActiveUserList :: State -> Maybe [Username]
const getActiveUserList = createSelector(
  [getActive, getLists],
  // NB: list key SHOULD always exist
  (activeList, lists) => lists[toListKey(activeList)].data
);
// getActiveUsernames :: State -> [Username]
const getActiveUsernames = createSelector(
  [getActiveUserList],
  Maybe.case({ Just: usernames => usernames, Nothing: () => [] })
);

// isLoadedData :: State -> Bool
export const isDataInActiveList = createSelector(
  [getActiveUserList],
  Maybe.case({ Just: () => true, Nothing: () => false })
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
  getLists(state)[toListKey(userList)].isLoading;

// isListSelected :: (State, { userList :: UserList }) -> Bool
export const isListSelected = (state, { userList }) =>
  getActive(state) === userList;
