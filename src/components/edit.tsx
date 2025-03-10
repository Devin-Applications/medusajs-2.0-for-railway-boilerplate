import React from 'react';

interface EditProps {
  onClick: () => void;
}

const Edit: React.FC<EditProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="edit-button"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Edit
    </button>
  );
};

export default Edit;
