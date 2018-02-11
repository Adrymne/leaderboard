import * as sut from './selectors';
import { UserList, toListKey, Maybe, SortField, SortOrder } from 'types';

describe('isDataInActiveList', () => {
  const subject = sut.isDataInActiveList;
  it('no data loaded for active list', () => {
    const LIST = UserList.RecentTop;
    const state = {
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: { data: Maybe.Nothing } }
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
        lists: { [toListKey(LIST)]: { data: Maybe.Just([1, 2, 3]) } }
      }
    };

    const result = subject(state);

    expect(result).toBe(true);
  });
});

describe('getActiveUsers', () => {
  const subject = sut.getActiveUsers;

  it('no data loaded', () => {
    const LIST = UserList.RecentTop;
    const state = {
      userList: {
        active: LIST,
        lists: { [toListKey(LIST)]: { data: Maybe.Nothing } }
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
        lists: { [toListKey(LIST)]: { data: Maybe.Just(['user1', 'user2']) } }
      }
    };

    const result = subject(state);

    expect(result).toEqual([state.users.user1, state.users.user2]);
  });
});

it('isListLoading', () => {
  const subject = sut.isListLoading;
  const LIST = UserList.RecentTop;
  const KEY = toListKey(LIST);
  const state = { userList: { lists: { [KEY]: { isLoading: false } } } };

  const result = subject(state, { userList: LIST });

  expect(result).toBe(false);
});

describe('isListSelected', () => {
  const subject = sut.isListSelected;
  it('active', () => {
    const state = { userList: { active: UserList.RecentTop } };

    const result = subject(state, { userList: UserList.RecentTop });

    expect(result).toBe(true);
  });

  it('not active', () => {
    const state = { userList: { active: UserList.AllTimeTop } };

    const result = subject(state, { userList: UserList.RecentTop });

    expect(result).toBe(false);
  });
});

it('isSortingByField', () => {
  const subject = sut.isSortingByField;
  const state = { sort: { field: SortField.AllTime } };

  const result = subject(state, { field: SortField.Recent });

  expect(result).toBe(false);
});

describe('getSortOrder', () => {
  const subject = sut.getSortOrder;

  it('specified field is being sorted', () => {
    const state = {
      sort: { field: SortField.Recent, order: SortOrder.Ascending }
    };

    const result = subject(state, { field: SortField.Recent });

    expect(result).toEqual(Maybe.Just(SortOrder.Ascending));
  });

  it('specified field is not current sort', () => {
    const state = {
      sort: { field: SortField.AllTime, order: SortOrder.Descending }
    };

    const result = subject(state, { field: SortField.Recent });

    expect(result).toBe(Maybe.Nothing);
  });
});
