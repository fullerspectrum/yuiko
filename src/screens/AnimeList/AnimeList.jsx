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
  const [list] = lists.filter((item) => `/animelists/${item.name.toLowerCase()}` === url);
  return (
    <div className="topnav">
      {lists && (
        <div>
          <ul>
            {lists.map((item, index) => (
              <li>
                <Link key={index} to={() => `/animelists/${item.name.toLowerCase()}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {list && (
        <div className="content">
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
