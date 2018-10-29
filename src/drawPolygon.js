import chroma from 'chroma-js'

const palettes = [ 'PuOr', 'BrBG', 'PRGn', 'PiYG', 'RdBu'];
const palette = palettes[Math.round(Math.random() * (palettes.length - 1))];
console.log('palette', palette);
const xColor = chroma.scale(palette).mode('lab');
const yColor = chroma.scale(palette).mode('lab');
const getColor = (x, y) => chroma.interpolate(xColor(x), yColor(y), 0.5, 'lab').hex();

const getMiddlePoint = (p1, p2) => ({
  x : (p1.x + p2.x) / 2,
  y : (p1.y + p2.y) / 2,
});

export default (ctx, x, y, halfedges) => {
  const color = getColor(x, y);

  ctx.beginPath();

  const start = halfedges[0].getStartpoint();
  ctx.moveTo(start.x, start.y);

  for (let i = 0; i < halfedges.length; i++) {

    const next = halfedges[i].getEndpoint();
    ctx.lineTo(next.x, next.y);
  }
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
};
