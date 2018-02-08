import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import './FilterOptions.css';

const buttonActiveProps = isActive =>
  isActive ? { active: true } : { outline: true };

const FilterOptions = () => (
  <ButtonGroup className="filter-inputs">
    <Button color="info" {...buttonActiveProps(true)}>
      Recent
    </Button>
    <Button color="info" {...buttonActiveProps(false)}>
      All Time
    </Button>
  </ButtonGroup>
);

export default FilterOptions;
