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
    <Main
      meta={
        <Meta
          title="Music"
          description="Original music compositions and electronic music hosted on SoundCloud"
          keywords={['music', 'electronic music', 'composition', 'soundcloud', 'audio']}
        />
      }
    >
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
