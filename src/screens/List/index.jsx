import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './style.css';
import ListContainer from '../../components/ListContainer';
import ListEntry from '../../components/ListEntry';

const List = ({ lists, params, toggleEditor, setEditorContent }) => {
  const [currentList] = lists.filter((item) => item.name === params.listName);

  let listEntries = null;
  let navbarLinks = null;

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
        setEditorContent={setEditorContent}
        toggleEditor={toggleEditor}
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
};

List.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  params: PropTypes.shape({ listType: PropTypes.string, listName: PropTypes.string }),
  toggleEditor: PropTypes.func.isRequired,
  setEditorContent: PropTypes.func.isRequired,
};
List.defaultProps = {
  lists: [],
  params: {},
};

export default List;
