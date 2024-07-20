import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';
import { Authenticator } from '@aws-amplify/ui-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="min-h-screen bg-gray-100">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <header className="bg-white shadow-md p-4 flex items-center">
              <button onClick={toggleSidebar} className="mr-4">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold">{/* Add page title here */}</h1>
            </header>
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