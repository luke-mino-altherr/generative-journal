import Link from 'next/link';

import Navigation from '../components/Navigation/Navigation';

const Header = () => {
  return (
    <header>
      <div className="white-transparent-gradient dark:black-transparent-gradient grid h-14 w-full grid-cols-[1fr,auto] pt-10">
        <div className="min-w-0">
          <h1 className="truncate text-2xl leading-8 dark:text-white">
            <Link
              href="/"
              className="whitespace-nowrap border-none lowercase text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            >
              luke mino-altherr
            </Link>
          </h1>
        </div>
        <div>
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
