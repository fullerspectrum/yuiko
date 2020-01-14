import React from 'react';
import PropTypes from 'prop-types';

export default function ListEntry({ data }) {
  ListEntry.propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      progress: PropTypes.number,
      episodes: PropTypes.number,
      score: PropTypes.number,
      type: PropTypes.string,
    }),
  };
  ListEntry.defaultProps = {
    data: {},
  };
  return (
    <tr>
      <td id={`title-${data.title}`}>{data.title}</td>
      <td id={`progress-${data.title}`}>{`${data.progress}/${data.episodes}`}</td>
      <td id={`score-${data.title}`}>{data.score === 0 ? '-' : data.score}</td>
      <td id={`type-${data.title}`}>{data.type}</td>
    </tr>
  );
}
