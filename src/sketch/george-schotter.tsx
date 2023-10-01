import type p5Types from 'p5';

const SQUARE_SIZE = 30;

class RotatingSquare {
  center: p5Types.Vector;

  noiseAmplitude: number;

  constructor(p5: p5Types, centerX: number, centerY: number, row: number) {
    this.center = p5.createVector(centerX, centerY);
    this.noiseAmplitude = (row + 1) * 0.1;
  }

  draw(p5: p5Types) {
    p5.push();
    const noise = p5.noise(this.center.x, this.center.y) * this.noiseAmplitude;
    const xDirection = p5.random(-1, 1);
    p5.translate(
      this.center.x + 20 * noise * xDirection,
      this.center.y + 50 * noise
    );
    const rotationDirection = p5.random(1, 10) > 7 ? 1 : -1;
    p5.rotate(rotationDirection * noise);
    p5.rect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
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
  const backgroundColor = darkMode ? 0 : 255;
  const strokeColor = darkMode ? 255 : 0;

  const squares: RotatingSquare[] = [];

  p5.setup = () => {
    const renderer = p5.createCanvas(width, height);
    if (fullScreen) renderer.position(0, 0).style('z-index', '-1');
    p5.fill(backgroundColor, 0, 0, 0);
    p5.background(backgroundColor);
    p5.stroke(strokeColor);

    const numberSquaresX = Math.floor((width * 0.8) / SQUARE_SIZE);
    const numberSquaresY = Math.floor((height * 0.8) / SQUARE_SIZE);
    const xPadding =
      (width - numberSquaresX * SQUARE_SIZE) / 2 - SQUARE_SIZE / 2;
    const yPadding = (height - numberSquaresY * SQUARE_SIZE) / 2 - SQUARE_SIZE;

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
