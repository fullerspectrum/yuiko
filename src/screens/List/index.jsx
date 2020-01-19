import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';
import ListContainer from '../../components/ListContainer';
import ListEntry from '../../components/ListEntry';

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
              <Link id={item.name} key={item.name} to={() => `/${params.listType}/${item.name}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
      {list && (
        <div className="List-content">
          <ListContainer>
            {list.entries.map((value) => (
              <ListEntry
                key={value.media.title.romaji}
                data={{
                  title: value.media.title.romaji,
                  progress: value.progress,
                  episodes: value.media.episodes,
                  score: value.score,
                  type: value.media.format,
                }}
              />
            ))}
          </ListContainer>
        </div>
      )}
    </div>
  );
}
