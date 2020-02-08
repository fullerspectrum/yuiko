import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { updateEntryProgress } from '../../lib/anilist';

const Progress = ({ id, progress, episodes }) => {
  const [updateProgress, { data }] = useMutation(gql(updateEntryProgress));

  const addProgress = (increment) => {
    updateProgress({ variables: { id, progress: progress + increment } });
  };

  return (
    <td id={`progress-${id}`}>
      <button type="button" onClick={() => addProgress(-1)}>
        -
      </button>
      {`${progress}/${episodes}`}
      <button type="button" onClick={() => addProgress(1)}>
        +
      </button>
    </td>
  );
};

export default Progress;
