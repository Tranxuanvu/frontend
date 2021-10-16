import React from 'react';
import { Link } from 'react-router-dom';

import notFoundImage from '@/assets/images/not-found.svg';
import './index.scss';

function NotFoundContainer() {
  return (
    <div className="not-found-container">
      <img
        src={notFoundImage}
        alt="not found"
        className="not-found-container__image"
      />
      <div className="not-found-container__links">
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}

export default NotFoundContainer;
