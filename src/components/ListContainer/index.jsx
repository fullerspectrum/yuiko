import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function ListContainer({ children }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>Title</td>
          <td style={{ paddingRight: '40px' }}>Progress</td>
          <td style={{ paddingRight: '40px' }}>Score</td>
          <td style={{ paddingRight: '40px' }}>Type</td>
        </tr>
        {children}
      </tbody>
    </table>
  );
}

ListContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
ListContainer.defaultProps = {
  children: undefined,
};
