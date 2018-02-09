import subject from './userList';
import { loop, Cmd } from 'redux-loop';
import * as actions from 'store/actions';
import * as types from 'types';
import * as effects from 'store/effects';

it('SET_ACTIVE_LIST', () => {
  const NEW_LIST = types.UserList.RecentTop;
  const state = { active: types.UserList.AllTimeTop };
  const action = actions.setActiveList(NEW_LIST);

  const result = subject(state, action);

  expect(result).toEqual(
    loop(
      { active: NEW_LIST },
      Cmd.run(effects.fetchUsers, {
        successActionCreator: actions.loadUserData,
        args: [NEW_LIST]
      })
    )
  );
});

describe('LOAD_USER_DATA', () => {
  it('first time load', () => {
    const LIST = types.UserList.AllTimeTop;
    const KEY = types.toListKey(LIST);
    const state = {
      lists: { [KEY]: types.ListState.NotLoaded }
    };
    const action = actions.loadUserData({
      userList: LIST,
      users: [
        { username: 'user1' },
        { username: 'user2' },
        { username: 'user3' }
      ]
    });

    const result = subject(state, action);

    expect(result).toEqual(
      loop(
        {
          lists: { [KEY]: types.ListState.Loaded(['user1', 'user2', 'user3']) }
        },
        Cmd.none
      )
    );
  });
});
