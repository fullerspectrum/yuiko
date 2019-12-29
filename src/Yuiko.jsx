import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import { getViewer, getAnimeList } from './lib/anilist';
import './index.css';
import AnimeList from './screens/AnimeList';
import NotAnimeList from './screens/NotAnimeList';

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
      <h1>{viewer ? viewer.name : ''}</h1>
      <Link to="/Watching">Go to an Anime List</Link>
      <p />
      <Link to="/">Go home</Link>
      <Switch>
        <Route path="/" exact component={NotAnimeList} />
        <Route path="/Watching" component={AnimeList} />
      </Switch>
    </HashRouter>
  );
}
