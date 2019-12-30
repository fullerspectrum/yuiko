import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import { getViewer, getAnimeList } from './lib/anilist';
import './index.css';
import AnimeList from './screens/AnimeList/AnimeList';
import NowPlaying from './screens/NowPlaying/NowPlaying';

export default function Yuiko() {
  const {
    loading: isLoadingSession,
    networkStatus: sessionStatus,
    error: sessionError,
    data: { Viewer: viewer } = {},
    refetch: sessionRefetch,
  } = useQuery(gql(getViewer), {
    notifyOnNetworkStatusChange: true,
  });

  const skip = viewer === undefined;

  const {
    loading: isLoadingList,
    error: listFetchError,
    data: { MediaListCollection: { lists, hasNextChunk } = {} } = {},
    refetch: listRefetch,
  } = useQuery(gql(getAnimeList), {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: skip || viewer.id,
    },
    skip,
  });

  useEffect(() => {
    if (isLoadingSession) document.title = 'Loading Yuiko...';
    if (sessionStatus === 8) document.title = 'error';
    else if (viewer) {
      document.title = `Yuiko at ${os.platform()}. Welcome, ${viewer.name}!`;
    }
  }, [isLoadingSession, viewer, sessionError, sessionStatus]);

  return (
    <HashRouter>
      <div className="main">
        <h1>{viewer ? viewer.name : 'I am not connected to anilist.'}</h1>
        {lists &&
          lists.map((item, index) => (
            <Link key={index} to={() => `/lists/${item.name.toLowerCase()}`}>
              {item.name}
            </Link>
          ))}
        ;
        <p />
        <Link to="/">Go home</Link>
      </div>
      <Switch>
        <Route path="/" exact component={NowPlaying} />
        <Route
          path="/lists/:listName"
          render={(props) => <AnimeList url={props.match.url} lists={lists || []} />}
        />
      </Switch>
    </HashRouter>
  );
}
