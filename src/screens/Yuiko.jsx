import React, { useState, useEffect } from 'react';
import os from 'os';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { getViewer } from '../queries';

import './Yuiko.css';

export default function Yuiko() {
  const { error, data } = useQuery(gql(getViewer));

  useEffect(() => {
    if (data) document.title = `Yuiko at ${os.platform()}. Welcome, ${data.Viewer.name}!`;
  });

  function showAnime() {
    console.log(data);
  }

  return (
    <div className="Yuiko">
      <header className="Yuiko-header">
        <p>
          Show me some
          <span> </span>
          <button variant="outline-dark" type="submit" onClick={showAnime}>
            Anime
          </button>
        </p>
        <a className="Yuiko-link" href="yuiko.c-or.me" target="_blank" rel="noopener noreferrer">
          visit our website.
        </a>
      </header>
    </div>
  );
}
