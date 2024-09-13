import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarClass = isMobile
    ? `fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`
    : `fixed inset-y-0 left-0 z-20 bg-gray-800 text-white w-16 hover:w-64 transition-all duration-300 overflow-hidden`;

  const linkClass = isMobile
    ? 'flex items-center py-2 px-4 hover:bg-gray-700 rounded'
    : 'flex items-center py-2 px-4 hover:bg-gray-700 rounded group';

  const linkTextClass = isMobile
    ? ''
    : `whitespace-nowrap transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`;

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          ☰
        </button>
      )}
      <div
        className={sidebarClass}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setIsOpen(false)}
      >
        <h2 className={`text-2xl font-bold mb-6 mt-8 whitespace-nowrap ${isMobile ? '' : (isOpen ? 'opacity-100' : 'opacity-0')} transition-opacity duration-300`}>Oreka</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/home" className={linkClass}>
                <span className="mr-3">🏠</span>
                <span className={linkTextClass}>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/onboarding-checkup" className={linkClass}>
                <span className="mr-3">📋</span>
                <span className={linkTextClass}>Onboarding Checkup</span>
              </Link>
            </li>
            <li>
              <Link href="/monthly-checkup" className={linkClass}>
                <span className="mr-3">📅</span>
                <span className={linkTextClass}>Monthly Checkup</span>
              </Link>
            </li>
            <li>
              <Link href="/" className={linkClass}>
                <span className="mr-3">📆</span>
                <span className={linkTextClass}>Daily Checkup</span>
              </Link>
            </li>
            <li>
              <Link href="/search" className={linkClass}>
                <span className="mr-3">🔍</span>
                <span className={linkTextClass}>Search</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;