import React from 'react';
import PropTypes from 'prop-types';

export default function listEntry({ data }) {
  return (
    <tr>
      <td id={`title-${data.id}`}>{data.title}</td>
      <td id={`progress-${data.id}`}>{`${data.progress}/${data.episodes}`}</td>
      <td id={`score-${data.id}`}>{data.score === 0 ? '-' : data.score}</td>
      <td id={`type-${data.id}`}>{data.type}</td>
    </tr>
  );
}

listEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    progress: PropTypes.number,
    episodes: PropTypes.number,
    score: PropTypes.number,
    type: PropTypes.string,
  }),
};
listEntry.defaultProps = {
  data: {},
};
