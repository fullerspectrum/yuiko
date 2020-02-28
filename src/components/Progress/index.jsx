import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { updateEntryProgress } from '../../lib/anilist';

const Progress = ({ id, progress, episodes }) => {
  const [updateProgress] = useMutation(gql(updateEntryProgress));

  const addProgress = (increment) => {
    updateProgress({
      variables: { id, progress: progress + increment },
      refetchQueries: ['MediaListCollection'],
      awaitRefetchQueries: true,
    });
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

Progress.propTypes = {
  id: PropTypes.number,
  progress: PropTypes.number,
  episodes: PropTypes.number,
};

Progress.defaultProps = {
  id: undefined,
  progress: undefined,
  episodes: undefined,
};

export default Progress;
