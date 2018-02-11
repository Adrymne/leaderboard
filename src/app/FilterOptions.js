import React from 'react';
import { ButtonGroup } from 'reactstrap';
import { UserList } from 'types';
import Filter from './filterOptions/Filter';
import './FilterOptions.css';

const FilterOptions = ({ setActiveList }) => (
  <ButtonGroup className="filter-inputs">
    <Filter userList={UserList.RecentTop} />
    <Filter userList={UserList.AllTimeTop} />
  </ButtonGroup>
);
export default FilterOptions;
