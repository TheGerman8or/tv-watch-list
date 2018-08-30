import React from 'react';
import PropTypes from 'prop-types';

function Thumbnail({ styleClass }) {
  return (
    <td className={styleClass}>
      <i className="far fa-image" />
    </td>
  );
}

Thumbnail.propTypes = {
  styleClass: PropTypes.string,
};

Thumbnail.defaultProps = {
  styleClass: '',
};

export default Thumbnail;