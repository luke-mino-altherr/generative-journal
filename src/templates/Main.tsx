import Link from 'next/link';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto">
      <header className="border-b border-gray-300">
        <div className="grid h-10 w-full grid-cols-2 bg-black px-3 py-2">
          <div>
            <h1 className="leading-6 text-white">
              gen <span className="text-xs">by</span> minalt
            </h1>
          </div>
          <div className="">
            <nav>
              <ul className="flex flex-wrap justify-end text-sm leading-6">
                <li className="mr-3">
                  <Link
                    href="/"
                    className="border-none text-white hover:text-gray-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/"
                    className="border-none text-white hover:text-gray-300"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="content mx-auto max-w-screen-md p-5">
        {props.children}
      </main>

      <footer className="py-8 text-center text-sm "></footer>
    </div>
  </div>
);

export { Main };
