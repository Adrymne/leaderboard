import React from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import './Loading.css';

const Loading = () => (
  <div className="loading-container">
    <LoadingSpinner width={60} height={60} />
  </div>
);

export default Loading;
