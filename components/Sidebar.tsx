import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => (
  <div className={`bg-gray-800 text-white w-64 min-h-screen p-4 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 z-20`}>
    <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white">
      <X size={24} />
    </button>
    <h2 className="text-2xl font-bold mb-6 mt-8">Oreka</h2>
    <nav>
      <ul className="space-y-2">
        <li>
          <Link href="/home" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Home
          </Link>
        </li>
        <li>
          <Link href="/onboarding-checkup" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Onboarding Checkup
          </Link>
        </li>
        <li>
          <Link href="/monthly-checkup" className="block py-2 px-4 hover:bg-gray-700 rounded">
          Monthly Checkup
          </Link>
        </li>
        <li>
          <Link href="/" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Daily Checkup
          </Link>
        </li>
        <li>
          <Link href="/search" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Search
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;