import Link from 'next/link';

import { navigationItems } from '@/config/navigation';
import { trackNavigationClick } from '@/utils/googleAnalytics';

const ExpandedNav = () => {
  const handleNavClick = (label: string) => {
    trackNavigationClick(label);
  };

  return (
    <nav>
      <ul className="flex w-full justify-end gap-4 text-xs uppercase leading-10 tracking-wider">
        {navigationItems.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
              onClick={() => handleNavClick(item.label)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ExpandedNav;
