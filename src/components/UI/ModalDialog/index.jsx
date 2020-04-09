import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalDialog = ({ show, toggleShow, children }) => {
  let modal;

  if (show) {
    modal = (
      <div className="modal" onKeyUp={toggleShow} role="textbox" tabIndex={0}>
        {children}
      </div>
    );
  }

  return modal;
};

ModalDialog.propTypes = {
  show: PropTypes.bool,
  toggleShow: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ModalDialog.defaultProps = {
  show: false,
  children: null,
};

export default ModalDialog;
