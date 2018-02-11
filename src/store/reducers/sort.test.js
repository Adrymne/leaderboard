import subject from './sort';
import { SortOrder, SortField } from 'types';
import { toggleSortOrder, setSortField } from 'store/actions';

describe('TOGGLE_SORT_ORDER', () => {
  it('ascending -> descending', () => {
    const state = { order: SortOrder.Ascending };
    const action = toggleSortOrder();

    const result = subject(state, action);

    expect(result).toEqual({ order: SortOrder.Descending });
  });

  it('descending -> ascending', () => {
    const state = { order: SortOrder.Descending };
    const action = toggleSortOrder();

    const result = subject(state, action);

    expect(result).toEqual({ order: SortOrder.Ascending });
  });
});

it('SET_SORT_FIELD', () => {
  const state = { order: 'blah', field: 'banana' };
  const action = setSortField(SortField.AllTime);

  const result = subject(state, action);

  expect(result).toEqual({
    order: SortOrder.Descending,
    field: SortField.AllTime
  });
});
