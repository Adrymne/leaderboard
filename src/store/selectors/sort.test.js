import * as sut from './sort';
import { SortField, SortOrder } from 'types';

describe('getSortFunction', () => {
  const subject = sut.getSortFunction;

  it('Recent - Ascending', () => {
    const state = {
      sort: { field: SortField.Recent, order: SortOrder.Ascending }
    };
    const userData = [
      { username: 'a', recent: 5 },
      { username: 'b', recent: 1 },
      { username: 'c', recent: 3 }
    ];

    const result = subject(state);

    expect(result(userData)).toEqual([
      { username: 'b', recent: 1 },
      { username: 'c', recent: 3 },
      { username: 'a', recent: 5 }
    ]);
  });

  it('AllTime - Descending', () => {
    const state = {
      sort: { field: SortField.AllTime, order: SortOrder.Descending }
    };
    const userData = [
      { username: 'a', alltime: 20 },
      { username: 'b', alltime: 100 },
      { username: 'c', alltime: 1 }
    ];

    const result = subject(state);

    expect(result(userData)).toEqual([
      { username: 'b', alltime: 100 },
      { username: 'a', alltime: 20 },
      { username: 'c', alltime: 1 }
    ]);
  });

  it('Username - Ascending', () => {
    const state = {
      sort: { field: SortField.Username, order: SortOrder.Ascending }
    };
    const userData = [
      { username: 'coil' },
      { username: 'alphabet' },
      { username: 'Banana' }
    ];

    const result = subject(state);

    expect(result(userData)).toEqual([
      { username: 'alphabet' },
      { username: 'Banana' },
      { username: 'coil' }
    ]);
  });
});
