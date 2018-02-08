import React from 'react';
import './Entry.css';

const renderUsername = entry => (
  <a href={`https://www.freecodecamp.com/${entry.username}`}>
    <img className="user-avatar" src={entry.img} alt="User avatar" />
    {entry.username}
  </a>
);

const Entry = ({ entry, index }) => (
  <tr className="entry-row">
    <th scope="row">{index + 1}</th>
    <td>{renderUsername(entry)}</td>
    <td>{entry.recent}</td>
    <td>{entry.alltime}</td>
  </tr>
);

export default Entry;
