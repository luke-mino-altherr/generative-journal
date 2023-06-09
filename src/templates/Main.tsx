import type { ReactNode } from 'react';

import Header from './Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}
    <div className="mx-auto">
      <Header />

      <main className="content mx-auto max-w-screen-md p-5">
        {props.children}
      </main>

      <footer className="py-8 text-center text-sm "></footer>
    </div>
  </div>
);

export { Main };
