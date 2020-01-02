import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import { getViewer, getAnimeList } from './lib/anilist';
import './Yuiko.css';
import AnimeList from './screens/AnimeList/AnimeList';
import NowPlaying from './screens/NowPlaying/NowPlaying';
import { remote } from 'electron';

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
      <div style={{ display: 'flex', 'white-space': 'nowrap' }}>
        <ul>
          <li>
            <Link to="/">Now Playing</Link>
          </li>
          {/* reminder to put a default list in a settings files later. */}
          <li>
            <Link to="/animelists/watching">Anime List</Link>
          </li>
          <li>
            <Link to="/mangalists/reading">Manga List</Link>
          </li>
          <li>
            <Link to="/browse">Browse</Link>
          </li>
          <li>
            <Link to="/rss">RSS Feeds</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={NowPlaying} />
          <Route
            path="/animelists/:listName"
            render={(props) => <AnimeList url={props.match.url} lists={lists || []} />}
          />
        </Switch>
      </div>
      <footer>footer</footer>
    </HashRouter>
  );
}
