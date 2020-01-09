import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './List.css';

export default function List({ lists, params }) {
  List.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.object),
    params: PropTypes.shape({ listType: PropTypes.string, listName: PropTypes.string }),
  };
  List.defaultProps = {
    lists: [],
    params: {},
  };
  const [list] = lists.filter((item) => item.name === params.listName);
  return (
    <div>
      {lists && (
        <div className="List-navbar">
          <nav>
            {lists.map((item) => (
              <Link key={item.name} to={() => `/${params.listType}/${item.name}`}>
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
