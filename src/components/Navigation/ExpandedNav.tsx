import Link from 'next/link';

import { navigationItems } from '@/config/navigation';

const ExpandedNav = () => {
  return (
    <nav>
      <ul className="flex w-full justify-end gap-4 text-xs uppercase leading-10 tracking-wider">
        {navigationItems.map((item) => (
          <li key={item.href + item.label}>
            <Link
              href={item.href}
              className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
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
