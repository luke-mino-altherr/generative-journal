import * as React from 'react';

export const useP5 = (
  sketch: (sketch: any) => void
): [(node: HTMLElement | null) => void, any | null] => {
  const p5Ref = React.useRef<any | null>(null);
  const canvasParentRef = React.useRef<HTMLElement | null>(null);
  const setCanvasParentRef = React.useCallback(
    (node: HTMLElement | null) => {
      console.log('node', node);
      if (node) {
        // eslint-disable-next-line
            // eslint-disable-next-line
        import("p5").then((p5) => {
          // eslint-disable-next-line new-cap
          p5Ref.current = new p5.default(sketch, node);
        });
      } else if (p5Ref.current) p5Ref.current.remove();
      canvasParentRef.current = node;
    },
    [sketch]
  );

  return [setCanvasParentRef, p5Ref.current];
};
