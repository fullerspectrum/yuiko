import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ModalDialog from '../ModalDialog';

const Backdrop = ({ show, toggleShow, children }) => {
  let backdrop = null;

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') toggleShow();
  };

  if (show) {
    backdrop = (
      <div>
        <div
          onClick={toggleShow}
          onContextMenu={toggleShow}
          onKeyUp={handleKeyUp}
          className="backdrop"
          tabIndex={0}
          role="button"
        />
        <ModalDialog show toggleShow={toggleShow}>
          {children}
        </ModalDialog>
      </div>
    );
  }

  return backdrop;
};

Backdrop.propTypes = {
  show: PropTypes.bool,
  toggleShow: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Backdrop.defaultProps = {
  show: false,
  children: null,
};

export default Backdrop;
