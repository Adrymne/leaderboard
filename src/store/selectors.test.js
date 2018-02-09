import * as sut from './selectors';
import { UserList, ListState, toListKey } from 'types';

describe('isDataLoaded', () => {
  const subject = sut.isLoadedData;
  it('no data loaded for active list', () => {
    const LIST = UserList.RecentTop;
    const state = {
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: ListState.NotLoaded }
      }
    };

    const result = subject(state);

    expect(result).toBe(false);
  });

  it('data loaded for active list', () => {
    const LIST = UserList.AllTimeTop;
    const state = {
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: ListState.Loaded([1, 2, 3]) }
      }
    };

    const result = subject(state);

    expect(result).toBe(true);
  });
});

describe('getLeaderboardEntries', () => {
  const subject = sut.getLeaderboardEntries;

  it('no data loaded', () => {
    const LIST = UserList.RecentTop;
    const state = {
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: ListState.NotLoaded }
      }
    };

    const result = subject(state);

    expect(result).toEqual([]);
  });

  it('data loaded', () => {
    const LIST = UserList.AllTimeTop;
    const state = {
      users: {
        user1: { username: 'user1' },
        user2: { username: 'user2' }
      },
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: ListState.Loaded(['user1', 'user2']) }
      }
    };

    const result = subject(state);

    expect(result).toEqual([state.users.user1, state.users.user2]);
  });
});
