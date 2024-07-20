import React from 'react';

interface CenteredContentProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const CenteredContent: React.FC<CenteredContentProps> = ({ children, maxWidth = 'max-w-2xl' }) => {
  return (
    <div className={`flex justify-center items-center min-h-screen bg-gray-100`}>
      <div className={`${maxWidth} w-full mx-auto bg-white rounded-lg shadow-lg p-6`}>
        {children}
      </div>
    </div>
  );
};

export default CenteredContent;