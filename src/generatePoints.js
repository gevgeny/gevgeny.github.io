
let getWidth = () => 2 * document.body.scrollWidth;
let getHeight = () => 2 * document.body.scrollHeight;
const getRandom = max => Math.ceil(Math.random() * max);

const getRandomPoint = () => ({
  x: getRandom(getWidth()),
  y: getRandom(getHeight()),
  angle: Math.random() * (2 * Math.PI),
});

export default {
  random : () => {
    const result = [];

    for (let i = 0; i < 500; i++) {
      result.push(getRandomPoint());
    }

    return result;
  },
  triangles: () => {
    const width = getWidth();
    const height = getHeight();
    const sin60 = Math.sin(Math.PI / 3);
    const points = [];
    const d = 80;

    let y = 0;

    for (let i = 0; y < height; i++) {
      let x = i % 2 ? 0 : d / 2;
      for (let j = 0; x < width; j++) {
        points.push({ x, y, angle: Math.random() * (2 * Math.PI) });
        x += (i + j) % 2 ? 2 * d : d;
      }
      y += sin60 * d;
    }

    return points;
  },
  hexagons: () => {
    const width = getWidth();
    const height = getHeight();
    const sin60 = Math.sin(Math.PI / 3);
    const points = [];
    const d = 80;

    let y = 0;

    for (let i = 0; y < height; i++) {
      let x = i % 2 ? 0 : d / 2;
      for (let j = 0; x < width; j++) {
        points.push({ x, y, angle: Math.random() * (2 * Math.PI) });
        x += d;
      }
      y += sin60 * d;
    }

    return points;
  },
  squares: () => {
    const width = getWidth();
    const height = getHeight();
    const points = [];
    const d = 80;

    let y = 0;

    for (let i = 0; y < height; i++) {
      let x = 0;
      for (let j = 0; x < width; j++) {
        points.push({ x, y, angle: Math.random() * (2 * Math.PI) });
        x += d;
      }
      y += d;
    }

    return points;
  },
}
