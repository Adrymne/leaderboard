import { sort, ascend, descend, toLower } from 'ramda';
import { createSelector } from 'reselect';
import { sortOrder, sortField } from './state';
import { SortField, SortOrder } from 'types';

// getField :: Ord a => SortField -> User -> a
const getField = SortField.caseOn({
  Username: user => toLower(user.username),
  Recent: user => user.recent,
  AllTime: user => user.alltime
});

// getOrder :: Ord a => SortOrder -> (User -> b) -> User -> User -> Number
const getOrder = SortOrder.caseOn({ Ascending: ascend, Descending: descend });

export const getSortFunction = createSelector(
  [sortField, sortOrder],
  // (SortField, SortOrder) -> [User] -> [User]
  (field, order) => sort(getOrder(order, getField(field)))
);
