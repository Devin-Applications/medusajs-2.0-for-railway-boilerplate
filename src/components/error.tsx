import React from 'react';

interface ErrorDialogProps {
  children: React.ReactNode;
  onExit: () => void;
}

export const ErrorDialog: React.FC<ErrorDialogProps> = ({ children, onExit }) => {
  return (
    <div className="error-dialog">
      {children}
      <button onClick={onExit}>Close</button>
    </div>
  );
};
