import type p5Types from 'p5';

import { colors, hexToGrayscale } from '../config/theme';

const SQUARE_SIZE = 15;

class RotatingSquare {
  center: p5Types.Vector;

  noiseAmplitude: number;

  constructor(p5: p5Types, centerX: number, centerY: number, row: number) {
    this.center = p5.createVector(centerX, centerY);
    this.noiseAmplitude = Math.exp((row + 1) * 0.17) * 0.1;
  }

  draw(p5: p5Types) {
    p5.push();
    const noise = p5.noise(this.center.x, this.center.y) * this.noiseAmplitude;
    const xDirection = p5.random(-1, 1);
    p5.translate(this.center.x + 10 * noise * xDirection, this.center.y + 30 * noise);
    const colorValue = p5.map(noise, 0, 50, 150, 200);
    const color = p5.color(colorValue, colorValue, colorValue, 50);
    const strokeColor = p5.color(colorValue, colorValue, colorValue, 100);
    p5.fill(color);
    p5.stroke(strokeColor);
    const size = p5.map(noise, 0, 1, SQUARE_SIZE, SQUARE_SIZE * 1.5);
    p5.circle(0, 0, size);
    p5.pop();
  }
}

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
  const strokeColor = darkMode ? 255 : 0;

  const squares: RotatingSquare[] = [];

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    p5.fill(backgroundColor, 0, 0, 0);
    p5.background(backgroundColor);
    p5.stroke(strokeColor);

    const numberSquaresX = Math.floor(width / SQUARE_SIZE);
    const numberSquaresY = Math.floor(height / SQUARE_SIZE);
    const xPadding = 0;
    const yPadding = 0;

    for (let x = 0; x < numberSquaresX; x += 1) {
      for (let y = 0; y < numberSquaresY; y += 1) {
        const square = new RotatingSquare(
          p5,
          x * SQUARE_SIZE + SQUARE_SIZE / 2 + xPadding,
          y * SQUARE_SIZE + SQUARE_SIZE / 2 + yPadding,
          y
        );
        square.draw(p5);
        squares.push(square);
      }
    }
  };
};

export default Sketch;
