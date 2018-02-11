import React from 'react';

const SourceLink = () => (
  <div id="source-link">
    View source on <a href={process.env.REACT_APP_SOURCE}>GitHub</a>
  </div>
);

export default SourceLink;
