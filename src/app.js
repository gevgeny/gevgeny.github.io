import debounce from 'lodash.debounce';
import Voronoi from 'voronoi';
import drawPolygon from './drawPolygon';
import generatePoints from './generatePoints';

document.addEventListener("DOMContentLoaded", () => {

  const canvas = document.querySelector('.background');
  const ctx = canvas.getContext('2d');
  const voronoi = new Voronoi();
  const fps = 20;
  const speed = 10; // px per sec

  let width = 2 * document.body.scrollWidth;
  let height = 2 * document.body.scrollHeight;
  let bbox = {
    xl: 0, xr: width, yt: 0, yb: height
  };
  let sites = null;
  let diagram = null;

  canvas.style.opacity = '1';
  console.log('canvas.style.opacity', canvas.style.opacity);
  canvas.width = width;
  canvas.height = height;

  const moveSites = () => {
    for (const site of sites) {
      site.x = site.x + Math.cos(site.angle) * speed * 0.1;
      site.y = site.y + Math.sin(site.angle) * speed * 0.1;

      if (site.y <= 0 || site.y >= height) {
        site.angle = 2 * Math.PI - site.angle;
      }

      if (site.x <= 0 || site.x >= width) {
        site.angle = Math.PI - site.angle;
      }

      if (site.y <= 0) { site.y = 0; }
      if (site.x <= 0) { site.x = 0; }
      if (site.y >= height) { site.y = height;}
      if (site.x >= width) { site.x = width; }
    }

  };

  const draw = (diagram) => {
    const result = [];

    for (const cell of diagram.cells) {
      drawPolygon(
        ctx,
        cell.site.x / width,
        cell.site.y / height,
        cell.halfedges
      );
    }

    // ctx.fillStyle = 'red';
    // for (const site of sites) {
    //   ctx.fillRect(site.x, site.y, 4, 4);
    // }

    return result;
  };

  const generateSites = () => {
    sites = generatePoints.hexagons();
  };

  const run = () => {
    if (diagram) {
      voronoi.recycle(diagram);
    }
    diagram = voronoi.compute(sites, bbox);
    draw(diagram);
  };

  const loop = () => {
    let prevTime = performance.now();

    const start = (time) => {
      requestAnimationFrame(start);
      const dt = time - prevTime;

      // throttle animation to lower down CPU usage
      if (dt < 1000 / fps) return;

      prevTime = time;

      moveSites(dt);
      run();
    };

    start(prevTime);
  };

// canvas.addEventListener('mousemove', ({x, y}) => {
//   Object.assign(sites[sites.length - 1], {x: 2 * x, y: 2 * y});
//   run();
// });

  window.addEventListener('resize', debounce(() => {
    width = 2 * document.body.scrollWidth;
    height = 2 * document.body.scrollHeight;
    bbox = {
      xl: 0, xr: width, yt: 0, yb: height
    };
    generateSites();

    canvas.width = width;
    canvas.height = height;
  }, 100));

  generateSites();
  run();
  setTimeout(loop, 500);

});


