import React from 'react';
import { connect } from 'react-redux';
import { applySpec } from 'ramda';
import { Table } from 'reactstrap';
import { getLeaderboardEntries } from 'store/selectors';
import { SortField } from 'types';
import Entry from './leaderboard/Entry';
import SortableHeader from './leaderboard/SortableHeader';
import './Leaderboard.css';

const renderRow = (entry, index) => (
  <Entry key={entry.username} entry={entry} index={index} />
);

const Leaderboard = ({ entries }) => (
  <Table hover>
    <thead>
      <tr>
        <th>#</th>
        <SortableHeader field={SortField.Username} />
        <SortableHeader field={SortField.Recent} />
        <SortableHeader field={SortField.AllTime} />
      </tr>
    </thead>
    <tbody>{entries.map(renderRow)}</tbody>
  </Table>
);

const mapStateToProps = applySpec({ entries: getLeaderboardEntries });
export default connect(mapStateToProps)(Leaderboard);
