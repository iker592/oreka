import React from 'react';
import Sidebar from './Sidebar';
import { Authenticator } from '@aws-amplify/ui-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <div className="w-full min-h-screen pt-16">
            {children}
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default Layout;