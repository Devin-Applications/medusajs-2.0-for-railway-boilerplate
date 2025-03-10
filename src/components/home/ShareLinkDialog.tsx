import React from 'react';

export const ShareLinkDialog: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className="share-link-dialog">
      <p>Share this link: {url}</p>
    </div>
  );
};
