import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import url from 'url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import storage from 'electron-json-storage';
import { getViewer, getAnimeList } from './lib/anilist';
import './Yuiko.css';
import List from './screens/List';
import NowPlaying from './screens/NowPlaying';

// add title and custom buttons (login, not logged in/loading logout)

export default function Yuiko() {
  const {
    client,
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
    if (isLoadingSession) document.title = 'Yuiko - Not logged in';
    if (sessionStatus === 8) document.title = 'error';
    else if (viewer) {
      document.title = `Yuiko at ${os.platform()}. Welcome, ${viewer.name}!`;
    }
  }, [isLoadingSession, viewer, sessionStatus, animelists]);

  function handleSetup() {
    let win = new remote.BrowserWindow({ autoHideMenuBar: true, width: 400, height: 550 });
    win.loadURL('https://anilist.co/api/v2/oauth/authorize?client_id=2775&response_type=token');
    win.on('page-title-updated', () => {
      if (win.webContents.getURL().startsWith('https://yuiko.moe')) {
        storage.set('token', {
          token: url
            .parse(win.webContents.getURL())
            .hash.split('&')[0]
            .substring(14),
        });
        client.resetStore();
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
                  {storage.get('token') ? 'Login' : 'Logout'}
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
        <div className="Yuiko-footer">{isLoadingList && <p>Sync in progress</p>}</div>
      </div>
    </HashRouter>
  );
}
