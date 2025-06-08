import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  hideFooter?: boolean;
  transparentHeader?: boolean;
};

const Main = (props: IMainProps) => {
  return (
    <div className="w-full antialiased">
      {props.meta}

      <Header transparent={props.transparentHeader ?? false} />
      <div className="mx-auto max-w-screen-md px-3">
        <main className="content mx-auto max-w-screen-md py-14">{props.children}</main>

        {!(props.hideFooter ?? false) && <Footer />}
      </div>
    </div>
  );
};

export { Main };
