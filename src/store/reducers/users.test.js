import subject from './users';
import * as actions from 'store/actions';

it('LOAD_USER_DATA', () => {
  const state = {
    user1: { username: 'user1', img: 'url0', recent: 0, alltime: 5 }
  };
  const action = actions.loadUserData({
    userList: 'user list',
    users: [
      { username: 'user1', img: 'url1', recent: 1, alltime: 5 },
      { username: 'user2', img: 'url2', recent: 5, alltime: 10 }
    ]
  });

  const result = subject(state, action);

  expect(result).toEqual({
    user1: { username: 'user1', img: 'url1', recent: 1, alltime: 5 },
    user2: { username: 'user2', img: 'url2', recent: 5, alltime: 10 }
  });
});
