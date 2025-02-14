import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DescriptionOverlay.css';

const DescriptionOverlay = ({
  show,
  title,
  subTitle,
  description
}) => {
  return show ? (
    <aside
      className="description-overlay"
      aria-label="Episode description"
    >
      <div className="description-content">
        <h1>{title}</h1>
        <h2>{subTitle}</h2>
        <p>{description}</p>
      </div>
    </aside>
  ) : null;
};

DescriptionOverlay.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default DescriptionOverlay; 