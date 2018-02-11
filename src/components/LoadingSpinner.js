import React from 'react';
import './LoadingSpinner.css';

const toStyle = (width, height) => ({
  width: `${width}px`,
  height: `${height}px`
});

const LoadingSpinner = ({ width, height }) => (
  <div className="loading-spinner" style={toStyle(width, height)} />
);

export default LoadingSpinner;
