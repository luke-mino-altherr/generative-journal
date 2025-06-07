import { useMemo } from 'react';

import { useScreenDimensions } from '@/hooks/screenDimensions';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Music = () => {
  const { height, width } = useScreenDimensions();
  const composerlyHeight = useMemo(() => {
    return height - 56;
  }, [height]);
  return (
    <Main meta={<Meta title="Music" description="Music hosted on soundcloud" />}>
      <iframe
        height={composerlyHeight}
        width={width}
        className="w-full"
        src="https://composerly.com/minalt?embed=true&header=false"
      ></iframe>
    </Main>
  );
};

export default Music;
