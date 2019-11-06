import React, { useState, useEffect } from 'react';
import os from 'os';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { getViewer } from '../queries';

import './Yuiko.css';

export default function Yuiko() {
  const [displayName, setDisplayName] = useState(false);
  const { loading, data } = useQuery(gql(getViewer));

  useEffect(() => {
    if (loading) document.title = 'Loading Yuiko...';
    else if (data) document.title = `Yuiko at ${os.platform()}. Welcome, ${data.Viewer.name}!`;
  });

  return (
    <div className="Yuiko">
      <header className="Yuiko-header">
        <p>
          Show me some
          <span> </span>
          <button variant="outline-dark" type="submit" onClick={() => setDisplayName(!displayName)}>
            Anime
          </button>
        </p>
        <a
          className="Yuiko-link"
          href="http://yuiko.c-or.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          visit our website.
        </a>
        {displayName && <p>{`${data ? data.Viewer.id : null}`}</p>}
      </header>
      <footer className="Yuiko-footer">
        <section>
          <p>{loading ? 'Fetching data from anilist...' : 'Learning HTML.'}</p>
        </section>
      </footer>
    </div>
  );
}
