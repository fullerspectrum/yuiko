import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import os from 'os';
import url from 'url';
import Store from 'electron-store';
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
    if (isLoadingSession || !isLoggedIn) document.title = `Yuiko - not online`;
    if (sessionError) document.title = `error: ${sessionError.name} - ${sessionError.message}`;
    else if (viewer) {
      document.title = `Yuiko at ${os.platform()}. Welcome, ${viewer.name}!`;
    }
  }, [isLoadingSession, sessionError, viewer, isLoggedIn]);

  const login = () => {
    let win = new remote.BrowserWindow({ autoHideMenuBar: true, width: 400, height: 550 });
    win.loadURL('https://anilist.co/api/v2/oauth/authorize?client_id=2775&response_type=token');
    win.on('page-title-updated', () => {
      if (win.webContents.getURL().includes('#')) {
        store.set(
          'token',
          url
            .parse(win.webContents.getURL())
            .hash.split('&')[0]
            .substring(14),
        );
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
    if (!viewer) login();
    else logout();
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
                  {!viewer ? 'Login' : 'Logout'}
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
