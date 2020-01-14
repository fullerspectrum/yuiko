import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import { remote } from 'electron';
import PropTypes from 'prop-types';
import { getViewer, getAnimeList } from './lib/anilist';
import './Yuiko.css';
import List from './screens/List/List';
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
    data: { MediaListCollection: { lists: [...animelists] = [], hasNextChunk } = {} } = {},
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
  }, [isLoadingSession, viewer, sessionStatus, animelists]);

  function handleSetup() {
    let win = new remote.BrowserWindow();
    win.loadURL('https://anilist.co/api/v2/oauth/authorize?client_id=2775&response_type=token');
    win.on('page-title-updated', () => {
      if (win.webContents.getURL().startsWith('https://yuiko.moe')) {
        console.log(win.webContents.getURL());
        win.close();
      }
    });
    win.on('closed', () => {
      const ses = remote.session.defaultSession;
      ses.clearStorageData({ origin: 'https://anilist.co', storages: ['cookies'] });
      win = null;
    });
  }

  return (
    <HashRouter>
      <div className="Yuiko">
        <div className="Yuiko-sidemenu">
          <div>
            <ul>
              <li>
                <Link to="/">Now Playing</Link>
              </li>
              {/* reminder to put a default list in a settings file later. */}
              <li>
                <Link to="/animelist/Watching">Anime List</Link>
              </li>
              <li>
                <Link to="/mangalist/Reading">Manga List</Link>
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
                <button type="button" onClick={() => handleSetup()}>
                  Setup
                </button>
              </li>
              <li>
                <button type="button" onClick={() => listRefetch()}>
                  Sync
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="Yuiko-rendered_content">
          <Switch>
            <Route path="/" exact component={NowPlaying} />
            <Route
              path="/:listType/:listName"
              render={({ match }) => (
                <List
                  url={match.url}
                  params={match.params}
                  lists={(() => {
                    if (match.params.listType === 'animelist' && animelists) return animelists;
                    return [];
                  })()}
                />
              )}
            />
          </Switch>
        </div>
        {isLoadingList && (
          <div className="Yuiko-footer">
            <p>Sync in progress</p>
          </div>
        )}
      </div>
    </HashRouter>
  );
}
