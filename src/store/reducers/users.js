import { transduce, map, merge } from 'ramda';
import { LOAD_USER_DATA } from 'store/actions';
import { createReducer } from 'utils';

// loadUserData :: Dict Username User -> [User] -> Dict Username User
const loadUserData = transduce(map(user => ({ [user.username]: user })), merge);

const DEFAULT = {};
export default createReducer(DEFAULT, {
  [LOAD_USER_DATA]: (store, action) => loadUserData(store, action.payload.users)
});
