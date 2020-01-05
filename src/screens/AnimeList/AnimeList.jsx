import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './AnimeList.css';

export default function AnimeList({ lists, url }) {
  AnimeList.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
  };
  AnimeList.defaultProps = {
    lists: [],
    url: '',
  };
  const [list] = lists.filter((item) => `/animelists/${item.name}` === url);
  return (
    <div>
      {lists && (
        <div className="AnimeList-navbar">
          <nav>
            {lists.map((item, index) => (
              <Link key={index} to={() => `/animelists/${item.name}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {list && (
        <div className="AnimeList-content">
          <ul>
            {list.entries.map((value, index) => (
              <li key={index}>{value.media.title.romaji}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
