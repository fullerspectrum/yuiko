import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import ListContainer from '../../components/ListContainer';
import ListEntry from '../../components/ListEntry';

export default function List({ lists, params }) {
  const [currentList] = lists.filter((item) => item.name === params.listName);

  let listEntries;
  let navbarLinks;

  if (lists) {
    navbarLinks = lists.map((item) => (
      <Link
        className={params.listName === item.name ? 'active' : null}
        id={item.name}
        key={`navbar-entry-${item.name}`}
        to={() => `/${params.listType}/${item.name}`}
      >
        {item.name}
      </Link>
    ));
  }

  if (currentList) {
    listEntries = currentList.entries.map((value) => (
      <ListEntry
        key={`list-entry-${value.id}`}
        data={{
          title: value.media.title.romaji,
          id: value.id,
          progress: value.progress,
          episodes: value.media.episodes,
          score: value.score,
          type: value.media.format,
        }}
      />
    ));
  }

  return (
    <div>
      <div className="List-navbar">
        <nav>{navbarLinks}</nav>
      </div>

      <div className="List-content">
        <ListContainer>{listEntries}</ListContainer>
      </div>
    </div>
  );
}

List.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.shape({ listType: PropTypes.string, listName: PropTypes.string }),
};
List.defaultProps = {
  lists: [],
  params: {},
};
