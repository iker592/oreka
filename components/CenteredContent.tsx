import React from 'react';

interface CenteredContentProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const CenteredContent: React.FC<CenteredContentProps> = ({ children, maxWidth = 'max-w-2xl' }) => {
  return (
    <div className={`w-full ${maxWidth} mx-auto bg-white rounded-lg shadow-lg p-6`}>
      {children}
    </div>
  );
};

export default CenteredContent;