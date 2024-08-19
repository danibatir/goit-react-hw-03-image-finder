import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ onClick, show }) => {
  if (!show) {
    return null;
  }

  return (
    <button type="button" onClick={onClick} className="load-more">
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
