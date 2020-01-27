import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import url from 'url';
import Store from 'electron-store';
import queryString from 'query-string';
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from 'electron';
import { getViewer, getAnimeList, getMangaList } from './lib/anilist';
import './Yuiko.css';
import List from './screens/List';
import NowPlaying from './screens/NowPlaying';

const store = new Store();

export default function Yuiko() {
  const [lists, setLists] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(!!store.get('token'));

  const {
    client,
    loading: isLoadingSession,
    error: sessionError,
    data: { Viewer: viewer } = {},
  } = useQuery(gql(getViewer), {
    notifyOnNetworkStatusChange: true,
    skip: !isLoggedIn,
  });

  const skip = viewer === undefined;

  const {
    loading: isLoadingAL,
    data: { MediaListCollection: { lists: [...animelists] = [] } = {} } = {},
    refetch: ALRefetch,
  } = useQuery(gql(getAnimeList), {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: skip || viewer.id,
    },
    skip,
    onCompleted: () => {
      setLists((state) => {
        return { ...state, animelist: animelists };
      });
    },
  });

  const {
    loading: isLoadingML,
    data: { MediaListCollection: { lists: [...mangalists] = [] } = {} } = {},
    refetch: MLRefetch,
  } = useQuery(gql(getMangaList), {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: skip || viewer.id,
    },
    skip,
    onCompleted: () => {
      setLists((state) => {
        return { ...state, mangalist: mangalists };
      });
    },
  });

  useEffect(() => {
    if (!isLoggedIn) document.title = 'Yuiko - not logged in';
    else if (isLoadingSession) document.title = 'Yuiko - loading';
    else if (isLoggedIn && viewer)
      document.title = `Yuiko at ${os.platform()}. Welcome, ${viewer.name}!`;

    if (sessionError) document.title = `error: ${sessionError.name} - ${sessionError.message}`;
  }, [isLoadingSession, sessionError, viewer, isLoggedIn]);

  const login = () => {
    let win = new remote.BrowserWindow({ autoHideMenuBar: true, width: 400, height: 550 });
    win.loadURL('https://anilist.co/api/v2/oauth/authorize?client_id=2775&response_type=token');

    win.on('page-title-updated', () => {
      const winURL = win.webContents.getURL();

      if (winURL.includes('#')) {
        const parsedURL = url.parse(winURL);
        const urlParams = queryString.parse(parsedURL.hash);
        const token = urlParams.access_token;

        store.set('token', token);
        setLoggedIn(true);

        win.close();
      }
    });

    win.on('closed', () => {
      const ses = remote.session.defaultSession;
      ses.clearStorageData({ origin: 'https://anilist.co', storages: ['cookies'] });

      win = null;
    });
  };

  const logout = () => {
    store.delete('token');
    setLoggedIn(false);
    setLists({});

    client.resetStore();
  };

  const handleSetup = () => {
    if (isLoggedIn) logout();
    else login();
  };

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
                  {isLoggedIn ? 'Logout' : 'Login'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    ALRefetch();
                    MLRefetch();
                  }}
                >
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
                <List params={match.params} lists={lists[match.params.listType]} />
              )}
            />
          </Switch>
        </div>
        <div className="Yuiko-footer">
          {(isLoadingAL || isLoadingML) && <p>Sync in progress</p>}
        </div>
      </div>
    </HashRouter>
  );
}
