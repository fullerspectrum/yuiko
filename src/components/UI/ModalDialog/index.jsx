import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ModalDialog = ({ show, toggleShow, children }) => {
  const childrenRef = useRef(null);
  let modal = null;

  useEffect(() => {
    childrenRef.current.focus();
  }, []);

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') toggleShow();
  };

  if (show) {
    modal = (
      <div className="modal" onKeyUp={handleKeyUp} role="textbox" tabIndex={0} ref={childrenRef}>
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
