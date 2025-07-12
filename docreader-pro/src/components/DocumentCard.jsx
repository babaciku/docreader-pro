import React from 'react';

const DocumentCard = ({ document, onClick }) => {
  const getFileIcon = (type) => {
    const iconClass = `file-icon ${type.toLowerCase()}`;
    const iconText = type.toUpperCase();
    return <div className={iconClass}>{iconText}</div>;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="document-card" onClick={() => onClick(document)}>
      {getFileIcon(document.type)}
      <div className="flex-1">
        <h3 className="font-medium text-foreground">{document.name}</h3>
        <p className="text-sm text-muted-foreground">
          {formatFileSize(document.size)} • {formatDate(document.lastModified)}
        </p>
      </div>
    </div>
  );
};

export default DocumentCard;

