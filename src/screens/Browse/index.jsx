import React from 'react';
import './style.css';
import ListContainer from '../../components/ListContainer';
import ListEntry from '../../components/ListEntry';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import { search } from '../../lib/anilist';

const Browse = ({ toggleEditor, setEditorContent }) => {
  let listEntries = null;
  let navbarLinks = null;
  
  const { loading, error, data } = useQuery(gql(search), {
    variables: {sort:["SCORE_DESC"]}
  }); 
  if(!loading)
    listEntries = data.Page.media.map((value) => (
      <ListEntry
        setEditorContent={setEditorContent}
        toggleEditor={toggleEditor}
        key={`list-entry-${value.id}`}
        data={{
          title: value.title.userPreferred,
          id: value.id,
          progress: 0,
          episodes: value.episodes,
          score: value.meanScore,
          type: value.format,
        }}
      />
    ));
  if (error) return `Error! ${error}`; 
  if (loading) return "Loading...";
  else return (
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

export default Browse;
