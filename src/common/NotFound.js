// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';

const NotFound = () =>
  (
    <div className="not-found-container">
      <p>Page not found</p>
      <p><Link to="/">Go to the home page</Link></p>
    </div>
  );

export default NotFound;
