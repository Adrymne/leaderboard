import { get } from 'axios';
import { UserList } from 'types';

// requestUrl :: UserList -> String
const requestUrl = UserList.case({
  RecentTop: () => 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
  AllTimeTop: () => 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
});
// fetchUsers :: UserList -> Promise { users :: [User], userList :: UserList }
export const fetchUsers = userList =>
  get(requestUrl(userList)).then(({ data }) => ({ userList, users: data }));
