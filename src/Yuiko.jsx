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
import PropTypes from 'prop-types';

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
  }, [isLoadingSession, viewer, sessionError, sessionStatus, lists]);

  return (
    <HashRouter>
      <div className="Yuiko">
        <div className="Yuiko-sidemenu">
          <div>
            <ul>
              <li>
                <Link to="/">Now Playing</Link>
              </li>
              {/* reminder to put a default list in a settings files later. */}
              <li>
                <Link to="/animelists/Watching">Anime List</Link>
              </li>
              <li>
                <Link to="/mangalists/Reading">Manga List</Link>
              </li>
              <li>
                <Link to="/browse">Browse</Link>
              </li>
              <li>
                <Link to="/rss">RSS Feeds</Link>
              </li>
            </ul>
          </div>
          <div className="Yuiko-settings">
            <ul>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <Link to="/setup">Setup</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="Yuiko-rendered_content">
          <Switch>
            <Route path="/" exact component={NowPlaying} />
            <Route
              path="/animelists/:listName"
              // eslint-disable-next-line react/prop-types
              render={(props) => <AnimeList url={props.match.url} lists={lists || []} />}
            />
          </Switch>
        </div>
        <div className="Yuiko-footer">
          <footer>footer</footer>
        </div>
      </div>
    </HashRouter>
  );
}
