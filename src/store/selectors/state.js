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

// getActive :: State -> UserList
export const active = state => state.userList.active;
// getLists :: State -> Dict String (ListState [Username])
export const lists = state => state.userList.lists;
// getUsers :: State -> Dict Username User
export const users = state => state.users;
// getSortField :: State -> SortField
export const sortField = state => state.sort.field;
// getSortOrder :: State -> SortOrder
export const sortOrder = state => state.sort.order;
