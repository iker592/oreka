import React from 'react';
import Sidebar from './Sidebar';
import { Authenticator } from '@aws-amplify/ui-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100 flex">
          <Sidebar />
          <div className="flex-grow min-h-screen md:pl-16 pt-16">
            {children}
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default Layout;