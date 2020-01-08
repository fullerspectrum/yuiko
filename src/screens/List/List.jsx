import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './List.css';

export default function List({ lists, url, type }) {
  List.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    url: PropTypes.string,
    type: PropTypes.string,
  };
  List.defaultProps = {
    lists: [],
    url: '',
    type: 'animelist',
  };
  const [list] = lists.filter((item) => `/${type}/${item.name}` === url);
  return (
    <div>
      {lists && (
        <div className="List-navbar">
          <nav>
            {lists.map((item) => (
              <Link key={item.name} to={() => `/${type}/${item.name}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {list && (
        <div className="List-content">
          <ul>
            {list.entries.map((value) => (
              <li key={value.media.title.romaji}>{value.media.title.romaji}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
