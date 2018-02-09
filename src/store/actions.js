export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const setActiveList = list => ({ type: SET_ACTIVE_LIST, payload: list });

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
// loadUserData :: { users :: [User], userList :: UserList } -> Action
export const loadUserData = userData => ({
  type: LOAD_USER_DATA,
  payload: userData
});
