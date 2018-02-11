export const SET_ACTIVE_LIST = 'SET_ACTIVE_LIST';
export const setActiveList = list => ({ type: SET_ACTIVE_LIST, payload: list });

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
// loadUserData :: { users :: [User], userList :: UserList } -> Action
export const loadUserData = userData => ({
  type: LOAD_USER_DATA,
  payload: userData
});

export const TOGGLE_SORT_ORDER = 'TOGGLE_SORT_ORDER';
export const toggleSortOrder = () => ({ type: TOGGLE_SORT_ORDER });

export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const setSortField = field => ({ type: SET_SORT_FIELD, payload: field });
