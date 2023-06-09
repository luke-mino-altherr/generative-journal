import type { ReactNode } from 'react';

import Header from './Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const FullWidthContent = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}
    <div className="mx-auto">
      <Header />

      <main className="content">{props.children}</main>

      <footer className="py-1 text-center text-sm "></footer>
    </div>
  </div>
);

export { FullWidthContent };
