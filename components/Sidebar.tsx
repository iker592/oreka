import React from 'react';
import Link from 'next/link';

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => (
  <div 
    className={`bg-gray-800 text-white w-16 hover:w-64 min-h-screen p-4 transition-all duration-300 fixed left-0 top-0 z-20 overflow-hidden`}
    onMouseEnter={toggleSidebar}
    onMouseLeave={toggleSidebar}
  >
    <h2 className={`text-2xl font-bold mb-6 mt-8 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Oreka</h2>
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/home" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded group">
            <span className="mr-3">🏠</span>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/onboarding-checkup" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded group">
            <span className="mr-3">📋</span>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Onboarding Checkup</span>
          </Link>
        </li>
        <li>
          <Link href="/monthly-checkup" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded group">
            <span className="mr-3">📅</span>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Monthly Checkup</span>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded group">
            <span className="mr-3">📆</span>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Daily Checkup</span>
          </Link>
        </li>
        <li>
          <Link href="/search" className="flex items-center py-2 px-4 hover:bg-gray-700 rounded group">
            <span className="mr-3">🔍</span>
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>Search</span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;