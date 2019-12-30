/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function AnimeList({ lists, url }) {
  if (lists) {
    [lists] = lists.filter((item) => `/lists/${item.name.toLowerCase()}` === url);
  }
  return (
    <div>
      <h1>{url}</h1>
      {lists && (
        <ul>
          {lists.entries.map((value, index) => (
            <li key={index}>{value.media.title.romaji}</li>
          ))}
        </ul>
      )}
      ;
    </div>
  );
}
