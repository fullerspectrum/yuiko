import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import os from 'os';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';

import './Yuiko.css';
import { name } from '../credentials.json';

export default function Yuiko() {
  // add reamining options to get user query (too lazy now tbh)
  const GET_VIEWER = gql`
    query {
      Viewer {
        id
        name
      }
    }
  `;
  const GET_USER = gql`
    query ($id: Int) {
      User(id: $id) {
        id
        name
        about
        avatar
        bannerImage
        isFollowing
        isBlocked
        bans
        options {
          titleLanguage
          displayAdultContent
          airingNotifications
          profileColor
          notificationOptions
        }
        mediaListOptions {
          scoreFormat
          rowOrder
          useLegacyLists
          animeList
          mangaList
        }
        
      }
    }
  `;
  const GET_ANIME = gql`
    query ($userId: Int) {
      MediaListCollection(userId: $userId, type: ANIME) {
        lists {
          entries
          name
          isCustomList
          isSplitCompletedList
          status
        }
        user
        hasNextChunk
      }
    }
  `;

  const TEST = gql`
  query {
    Media (id: 15125, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
    }
  }
  `;
  const { error, data } = useQuery(GET_VIEWER);
  useEffect(() => {
    console.log('aaaa');
  });

  function showAnime() {
    console.log(data);
  }

  return (
    <div className="Yuiko">
      <Helmet>
        <title>{`[${name}]Yuiko at ${os.platform()}`}</title>
      </Helmet>
      <header className="Yuiko-header">
        <p>
          Show me some
          {' '}
          <button
            variant="outline-dark"
            type="submit"
            onClick={showAnime}
          >
          Anime
          </button>
        </p>
        <a
          className="Yuiko-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
