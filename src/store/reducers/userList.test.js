import subject from './userList';
import { loop, Cmd } from 'redux-loop';
import { setActiveList, loadUserData } from 'store/actions';
import { Maybe, UserList, toListKey } from 'types';
import { fetchUsers } from 'store/effects';

describe('SET_ACTIVE_LIST', () => {
  it('not currently loading', () => {
    const NEW_LIST = UserList.RecentTop;
    const state = {
      active: UserList.AllTimeTop,
      lists: {
        recent: { data: Maybe.Nothing, isLoading: false },
        alltime: 'blah'
      }
    };
    const action = setActiveList(NEW_LIST);

    const result = subject(state, action);

    const expected = {
      active: NEW_LIST,
      lists: {
        recent: { data: Maybe.Nothing, isLoading: true },
        alltime: 'blah'
      }
    };
    expect(result).toEqual(
      loop(
        expected,
        Cmd.run(fetchUsers, {
          successActionCreator: loadUserData,
          args: [NEW_LIST]
        })
      )
    );
  });

  it('list already loading', () => {
    const NEW_LIST = UserList.RecentTop;
    const state = {
      active: UserList.AllTimeTop,
      lists: {
        recent: { data: Maybe.Nothing, isLoading: true },
        alltime: 'blah'
      }
    };
    const action = setActiveList(NEW_LIST);

    const result = subject(state, action);

    const expected = {
      active: NEW_LIST,
      lists: {
        recent: { data: Maybe.Nothing, isLoading: true },
        alltime: 'blah'
      }
    };
    expect(result).toEqual(loop(expected, Cmd.none));
  });
});

it('LOAD_USER_DATA', () => {
  const LIST = UserList.AllTimeTop;
  const KEY = toListKey(LIST);
  const state = {
    lists: { [KEY]: { data: 'blah', isLoading: true } }
  };
  const action = loadUserData({
    userList: LIST,
    users: [{ username: 'user1' }, { username: 'user2' }, { username: 'user3' }]
  });

  const result = subject(state, action);

  expect(result).toEqual(
    loop(
      {
        lists: {
          [KEY]: {
            data: Maybe.Just(['user1', 'user2', 'user3']),
            isLoading: false
          }
        }
      },
      Cmd.none
    )
  );
});
