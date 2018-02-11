import React from 'react';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';
import { Button } from 'reactstrap';
import { SortField, SortOrder, Maybe } from 'types';
import { getSortOrder, isSortingByField } from 'store/selectors';
import { toggleSortOrder, setSortField } from 'store/actions';
import './SortableHeader.css';

const sortOrder = SortOrder.case({
  Ascending: () => '\u25B2',
  Descending: () => '\u25BC'
});
const sortIndicator = Maybe.case({ Just: sortOrder, Nothing: () => '' });
const text = SortField.case({
  Username: () => 'Username',
  Recent: () => 'Recent',
  AllTime: () => 'All Time'
});

const SortableHeader = ({ field, isActive, order, onClick }) => (
  <th className="sortable-header">
    <Button outline block color="info" active={isActive} onClick={onClick}>
      {text(field)} <small>{sortIndicator(order)}</small>
    </Button>
  </th>
);

const mapStateToProps = applySpec({
  order: getSortOrder,
  isActive: isSortingByField
});
const mapDispatchToProps = { toggleSortOrder, setSortField };
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onClick: stateProps.isActive
    ? dispatchProps.toggleSortOrder
    : () => dispatchProps.setSortField(ownProps.field)
});
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  SortableHeader
);
