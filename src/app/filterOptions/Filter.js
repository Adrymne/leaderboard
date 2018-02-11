import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';
import { Button } from 'reactstrap';
import { UserList } from 'types';
import { isListLoading, isListSelected } from 'store/selectors';
import { setActiveList } from 'store/actions';
import LoadingSpinner from 'components/LoadingSpinner';
import './Filter.css';

const buttonActiveProps = isActive =>
  isActive ? { active: true } : { outline: true };
const buttonText = UserList.case({
  RecentTop: () => 'Recent',
  AllTimeTop: () => 'All Time'
});

const Filter = ({ isLoading, isSelected, userList, onClick }) => (
  <Button
    className="active-filter-button"
    color="info"
    {...buttonActiveProps(isSelected)}
    onClick={onClick}
  >
    <div>{buttonText(userList)}</div>
    {isLoading ? <LoadingSpinner width={20} height={20} /> : ''}
  </Button>
);

const mapStateToProps = applySpec({
  isLoading: isListLoading,
  isSelected: isListSelected
});
const mapDispatchToProps = (dispatch, { userList }) =>
  bindActionCreators({ onClick: () => setActiveList(userList) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
