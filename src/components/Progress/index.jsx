import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import React from 'react';
import { useMutation } from 'react-apollo';
import { updateEntryProgress } from '../../lib/anilist';

const Progress = ({ id, progress, total, status }) => {
  const [updateProgress] = useMutation(gql(updateEntryProgress));

  const addProgress = (increment) => {
    updateProgress({
      variables: { id, progress: progress + increment },
      refetchQueries: ['MediaListCollection'],
      awaitRefetchQueries: true,
    });
  };

  let progressMessage = `${progress}/`;

  // reminder to check and test if a show is currently airing
  if ((status === 'FINISHED' || status === 'CANCELLED') && total) progressMessage += `${total} `;
  else progressMessage += '? ';

  return (
    <td id={`progress-${id}`}>
      <button type="button" onClick={() => addProgress(-1)}>
        -
      </button>
      {progressMessage}
      <button type="button" onClick={() => addProgress(1)}>
        +
      </button>
    </td>
  );
};

Progress.propTypes = {
  id: PropTypes.number,
  progress: PropTypes.number,
  total: PropTypes.number,
  status: PropTypes.string,
};

Progress.defaultProps = {
  id: undefined,
  progress: undefined,
  total: undefined,
  status: undefined,
};

export default Progress;
