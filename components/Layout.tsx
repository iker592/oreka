import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Authenticator } from '@aws-amplify/ui-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
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