import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../Progress';

const ListEntry = ({ data, toggleEditor, setEditorContent }) => {
  const handleRightClick = () => {
    toggleEditor();
    setEditorContent(
      <div>
        {'You tried to edit '}
        {data.title}
        {', now I will type until it reaches the other end of the box'}
        {', I need to test the overflow'}
      </div>,
    );
  };
  return (
    <tr onContextMenu={handleRightClick}>
      <td id={`title-${data.id}`}>{data.title}</td>
      {data.chapters
        ? <Progress id={data.id} progress={data.progress} episodes={data.chapters} />
        : <Progress id={data.id} progress={data.progress} episodes={data.episodes} />
      }
      
      <td id={`score-${data.id}`}>{data.score === 0 ? '-' : data.score}</td>
      <td id={`type-${data.id}`}>{data.type}</td>
    </tr>
  );
};

ListEntry.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    progress: PropTypes.number,
    episodes: PropTypes.number,
    chapters: PropTypes.number,
    score: PropTypes.number,
    type: PropTypes.string,
  }),
  toggleEditor: PropTypes.func.isRequired,
  setEditorContent: PropTypes.func.isRequired,
};
ListEntry.defaultProps = {
  data: { title: '', id: -1, score: 0, type: '' },
};

export default ListEntry;
