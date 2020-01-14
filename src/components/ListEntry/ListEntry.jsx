import React from 'react';
import PropTypes from 'prop-types';

export default function AnimeEntry({ data }) {
  AnimeEntry.propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      progress: PropTypes.number,
      score: PropTypes.number,
      type: PropTypes.string,
    }),
  };
  AnimeEntry.defaultProps = {
    data: {},
  };
  return (
    <tr>
      <td id={`title-${data.title}`} key={`title-${data.title}`}>
        {data.title}
      </td>
      <td id={`progress-${data.title}`} key={`progress-${data.title}`}>
        {data.progress}
      </td>
      <td id={`score-${data.title}`} key={`score-${data.title}`}>
        {data.score === 0 ? '-' : data.score}
      </td>
      <td id={`type-${data.title}`} key={`type-${data.title}`}>
        {data.type}
      </td>
    </tr>
  );
}
