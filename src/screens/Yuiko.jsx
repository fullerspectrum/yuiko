import React, { useState, useEffect } from 'react';
import os from 'os';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from 'react-apollo';
import { getViewer, getAnimeList } from '../lib/anilist';

import './Yuiko.css';

export default function Yuiko() {
  const { loading: isLoadingSession, data: sessionData, error: sessionError } = useQuery(
    gql(getViewer),
    {
      notifyOnNetworkStatusChange: true,
    },
  );

  const skip = sessionData === undefined;

  const [getList, { loading, error, data }] = useLazyQuery(gql(getAnimeList), {
    notifyOnNetworkStatusChange: true,
    variables: {
      id: skip ? null : sessionData.Viewer.id,
    },
    skip,
  });

  useEffect(() => {
    if (isLoadingSession) document.title = 'Loading Yuiko...';
    else if (sessionData) {
      document.title = `Yuiko at ${os.platform()}. Welcome, ${sessionData.Viewer.name}!`;
    }
  }, [isLoadingSession, sessionData]);

  return (
    <div className="Yuiko">
      <header className="Yuiko-header">
        <button
          variant="outline-dark"
          type="submit"
          onClick={() => {
            getList();
          }}
        >
          Please show
        </button>
        <p> me the first anime on my list.</p>

        <a
          className="Yuiko-link"
          href="http://yuiko.c-or.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          visit our website.
        </a>
        {data && (
          <p>
            {`${data.MediaListCollection.lists[0].entries[0].media.title.romaji || 'Loading...'}`}
          </p>
        )}
      </header>
      <footer className="Yuiko-footer">
        <section>
          <p>{isLoadingSession ? 'Fetching data from anilist...' : 'Not fetching anything.'}</p>
        </section>
      </footer>
    </div>
  );
}
