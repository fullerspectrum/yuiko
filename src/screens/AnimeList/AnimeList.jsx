import React from 'react';
import PropTypes from 'prop-types';

export default function AnimeList({ lists, url }) {
  AnimeList.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
  };
  AnimeList.defaultProps = {
    lists: [],
    url: '',
  };
  const [list] = lists.filter((item) => `/lists/${item.name.toLowerCase()}` === url);
  return (
    <div>
      <h1>{url}</h1>
      {list && (
        <ul>
          {list.entries.map((value, index) => (
            <li key={index}>{value.media.title.romaji}</li>
          ))}
        </ul>
      )}
      ;
    </div>
  );
}
