import * as React from 'react';
import "./LoadingSpinner.tsx.css"

export const LoadingSpinner = (props) => (
  <div className="loading-animation-wrapper">
    <div>
      <img src={require('../assets/images/icon.svg')} alt="icon" />
    </div>
  </div>
);
