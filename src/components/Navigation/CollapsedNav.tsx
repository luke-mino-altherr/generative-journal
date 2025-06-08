import Link from 'next/link';
import { useEffect, useState } from 'react';

import { navigationItems } from '@/config/navigation';
import { trackNavigationClick } from '@/utils/googleAnalytics';

const CollapsedNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (label: string) => {
    trackNavigationClick(label);
    toggleMenu();
  };

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="z-[1002] flex w-full justify-end">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col gap-1.5 p-2 focus:outline-none"
        aria-label="Toggle navigation menu"
      >
        <span className="dark:bg-background-light h-0.5 w-6 bg-black" />
        <span className="dark:bg-background-light h-0.5 w-6 bg-black" />
        <span className="dark:bg-background-light h-0.5 w-6 bg-black" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[1001] bg-black/50 backdrop-blur-sm transition-opacity duration-500 dark:bg-white/20 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={toggleMenu}
      />

      {/* Side Drawer */}
      <div
        className={`bg-background-light dark:bg-background-dark fixed inset-y-0 right-0 z-[1003] shadow-xl transition-[width] duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute left-4 top-4 p-2 text-black hover:text-gray-600 focus:outline-none dark:text-white dark:hover:text-gray-300"
          aria-label="Close navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mt-14 p-8">
          <ul className="flex flex-col gap-6">
            {navigationItems.map((item) => (
              <li key={item.href + item.label}>
                <Link
                  href={item.href}
                  className="block border-none text-lg uppercase tracking-wider text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                  onClick={() => handleNavClick(item.label)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CollapsedNav;
