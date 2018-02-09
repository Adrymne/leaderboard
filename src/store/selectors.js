import { createSelector } from 'reselect';
import { transduce, map, reject, isNil, append, compose, flip } from 'ramda';
import { ListState, toListKey } from 'types';
/*
Username = String
User = { username :: Username, img :: String, recent :: Int, alltime :: Int }

UserList = RecentTop | AllTimeTop

ListState u = NotLoaded | Loaded u

State = {
  users :: Dict Username User,
  userList :: {
    active :: UserList,
    lists :: {
      recent :: ListState [Username],
      alltime :: ListState [Username]
    }
  }
}
*/

// getActiveList :: State -> UserList
const getActiveList = state => state.userList.active;
// getUserLists :: State -> Dict String (ListState [Username])
const getUserLists = state => state.userList.lists;
// getUsersData :: State -> Dict Username User
const getUsersData = state => state.users;

// getActiveUserList :: State -> ListState [Username]
const getActiveUserList = createSelector(
  [getActiveList, getUserLists],
  // NB: list key SHOULD always exist
  (active, lists) => lists[toListKey(active)]
);
// getActiveUsernames :: State -> [Username]
const getActiveUsernames = createSelector(
  [getActiveUserList],
  ListState.case({ NotLoaded: () => [], Loaded: xs => xs })
);

// isLoadedData :: State -> Bool
export const isLoadedData = createSelector(
  [getActiveUserList],
  ListState.case({ NotLoaded: () => false, Loaded: () => true })
);

// mapToUser :: Dict Username User -> Transducer [User] Username
const mapToUser = users =>
  compose(map(username => users[username]), reject(isNil));
// getLeaderboardEntires :: State -> [User]
export const getLeaderboardEntries = createSelector(
  [getUsersData, getActiveUsernames],
  (users, usernames) => transduce(mapToUser(users), flip(append), [], usernames)
);
