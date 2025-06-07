import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  hideFooter?: boolean;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}
    <div className="mx-auto max-w-screen-md px-3">
      <Header />

      <main className="content mx-auto max-w-screen-md pt-14">{props.children}</main>

      {!(props.hideFooter ?? false) && <Footer />}
    </div>
  </div>
);

export { Main };
