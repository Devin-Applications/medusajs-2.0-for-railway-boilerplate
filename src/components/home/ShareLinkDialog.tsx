import React from 'react';

interface ShareLinkDialogProps {
  snapshotId: string;
  onExit: () => void;
}

export const ShareLinkDialog: React.FC<ShareLinkDialogProps> = ({ snapshotId, onExit }) => {
  return (
    <div className="share-link-dialog">
      <p>Share this link: {window.location.origin}/api/share/{snapshotId}</p>
      <button onClick={onExit}>Close</button>
    </div>
  );
};
