import Link from 'next/link';

import Navigation from '../components/Navigation/Navigation';

type HeaderProps = {
  transparent?: boolean;
};

const Header = (props: HeaderProps) => {
  return (
    <header
      className={`sticky top-0 z-[1002] ${
        props?.transparent ? 'bg-transparent' : 'bg-background-light dark:bg-background-dark'
      }`}
    >
      <div className="white-transparent-gradient dark:black-transparent-gradient mx-auto grid h-20 w-full max-w-screen-md grid-cols-[1fr,auto] items-center px-3 sm:h-24">
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
