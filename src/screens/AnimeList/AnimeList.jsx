/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

export default function AnimeList({ list }) {
  console.log(list);

  return (
    <div>
      <h1>This is an Anime List</h1>
      {list && (
        <ul>
          {list.entries.map((value, index) => (
            <li key={index}>{value.media.title.romaji}</li>
          ))}
        </ul>
      )}
      ;
    </div>
  );
}
