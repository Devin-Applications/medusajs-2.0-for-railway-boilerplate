import React from 'react';

const Edit: React.FC = () => {
  return (
    <button
      onClick={() => {
        fetch('/api/preview')
          .then(() => window.location.reload())
          .catch(console.error);
      }}
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
