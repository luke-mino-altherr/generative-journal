import type p5Types from 'p5';

import { colors, hexToGrayscale } from '../../config/theme';
import { AstroidSystem } from './astroid-system';
import { Vehicle } from './vehicle';

const Sketch = (
  p5: p5Types,
  width: number,
  height: number,
  fullScreen: boolean,
  darkMode: boolean
) => {
  const backgroundColor = darkMode
    ? hexToGrayscale(colors.background.dark)
    : hexToGrayscale(colors.background.light);

  const vehicle = new Vehicle(p5, width, height);

  let astroidSystem: AstroidSystem | null = null;

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    astroidSystem = new AstroidSystem(p5);
  };

  p5.draw = () => {
    p5.background(backgroundColor);

    vehicle.update(p5);
    astroidSystem!.updateCollisions(
      vehicle.location.x - 15,
      vehicle.location.x + 15,
      vehicle.location.y - 5,
      vehicle.location.y + 5
    );
    astroidSystem!.update(p5);
  };
};

export default Sketch;
