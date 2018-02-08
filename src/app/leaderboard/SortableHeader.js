import React from 'react';
import { Button } from 'reactstrap';
import './SortableHeader.css';

const SORT_TYPES = { ASCENDING: '\u25B2', DESCENDING: '\u25BC' };
const sortIndicator = sortType => SORT_TYPES[sortType] || '';

const SortableHeader = ({ text, active, sortType }) => (
  <th className="sortable-header">
    <Button outline block color="info" active={active}>
      {text} <small>{sortIndicator(sortType)}</small>
    </Button>
  </th>
);

export default SortableHeader;
