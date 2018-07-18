// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>
  (
    <div className="not-found-container">
      <p>Strona nieznaleziona</p>
      <p><Link to="/">Wróć do strony głównej</Link></p>
    </div>
  );

export default NotFound;
