import { evolve } from 'ramda';
import { SortOrder, SortField } from 'types';
import { createReducer } from 'utils';
import { TOGGLE_SORT_ORDER, SET_SORT_FIELD } from 'store/actions';

// toggleOrder :: SortOrder -> SortOrder
const toggleOrder = SortOrder.case({
  Ascending: () => SortOrder.Descending,
  Descending: () => SortOrder.Ascending
});
// toggleSortOrder :: State -> State
const toggleSortOrder = evolve({ order: toggleOrder });

// setSortField :: State -> State
const setSortField = (state, { payload }) =>
  evolve({ order: () => SortOrder.Descending, field: () => payload }, state);

const DEFAULT = { order: SortOrder.Descending, field: SortField.Recent };
export default createReducer(DEFAULT, {
  [TOGGLE_SORT_ORDER]: toggleSortOrder,
  [SET_SORT_FIELD]: setSortField
});
