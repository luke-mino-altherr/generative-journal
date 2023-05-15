import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="white-transparent-gradient dark:black-transparent-gradient grid h-14 w-full grid-cols-2 px-4 py-2">
        <div>
          <h1 className="text-2xl leading-8 dark:text-white">
            <Link
              href="/"
              className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            >
              gen <span className="text-sm">by minalt</span>
            </Link>
          </h1>
        </div>
        <div className="">
          <nav>
            <ul className="flex flex-wrap justify-end text-xs uppercase leading-10 tracking-wider">
              <li className="mr-3">
                <Link
                  href="/drawings/"
                  className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                >
                  Drawings
                </Link>
              </li>
              <li>
                <Link
                  href="/music/"
                  className="border-none text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                >
                  Music
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
