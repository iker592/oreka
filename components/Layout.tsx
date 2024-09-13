import React from 'react';
import Sidebar from './Sidebar';
import { Authenticator } from '@aws-amplify/ui-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100">
          <Sidebar />
          <div className="ml-16 transition-all duration-300">
            <main className="p-8">
              {children}
            </main>
          </div>
        </div>
      )}
    </Authenticator>
  );
};

export default Layout;