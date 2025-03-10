import React from 'react';

interface SnapshotProps {
  onCancel: () => void;
  onShare: () => void;
  isSharing: boolean;
}

const Snapshot: React.FC<SnapshotProps> = ({ onCancel, onShare, isSharing }) => {
  return (
    <div className="snapshot-controls">
      <button onClick={onCancel} className="cancel-button">
        Cancel
      </button>
      <button onClick={onShare} disabled={isSharing} className="share-button">
        {isSharing ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default Snapshot;
