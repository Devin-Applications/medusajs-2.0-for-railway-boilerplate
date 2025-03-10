import React from 'react';

export const ErrorDialog: React.FC<{ error: string }> = ({ error }) => {
  return (
    <div className="error-dialog">
      <p>Error: {error}</p>
    </div>
  );
};
