import React from 'react';
import PropTypes from 'prop-types';
import Progress from '../Progress';
import { typeFormat } from '../../lib/textFormatting';

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
        ? <Progress id={data.id} progress={data.progress} episodes={data.chapters} status={data.status} />
        : <Progress id={data.id} progress={data.progress} episodes={data.episodes} status={data.status} />
      }
      
      <td id={`score-${data.id}`}>{data.score === 0 ? '-' : data.score}</td>
      <td id={`type-${data.id}`}>{typeFormat(data.type)}</td>
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
    status: PropTypes.string,
  }),
  toggleEditor: PropTypes.func.isRequired,
  setEditorContent: PropTypes.func.isRequired,
};
ListEntry.defaultProps = {
  data: { title: '', id: -1, score: 0, type: '' },
};

export default ListEntry;
