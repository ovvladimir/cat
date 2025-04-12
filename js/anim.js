/*
class Sprite {
    constructor(options) {
        this.ctx = options.ctx;
        this.image = options.image;
        this.frameIndex = 0;
        this.tickCount = 0;
        this.ticksPerFrame = options.ticksPerFrame;
        this.numberOfFrames = options.numberOfFrames;
        this.width = options.width;
        this.height = options.height;
        this.start();
    }

    update() {
        this.tickCount++;

        if (this.tickCount > this.ticksPerFrame) {
            this.tickCount = 0;
            if (this.frameIndex < this.numberOfFrames - 1) {
                this.frameIndex++;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.drawImage(
            this.image,
            0,
            this.frameIndex * this.height / this.numberOfFrames,
            this.width,
            this.height / this.numberOfFrames,
            0,
            0,
            this.width,
            this.height / this.numberOfFrames
        )
    }

    start() {
        let loop = () => {
            this.update();
            this.render();
            window.requestAnimationFrame(loop);
        }
        window.requestAnimationFrame(loop);
    }
}

let canvas = document.querySelector('#canvas');
canvas.width = 400;
canvas.height = 199.5;

let coinImage = new Image();
coinImage.src = './img/cat-anim.png';

let sprite = new Sprite({
    ctx: canvas.getContext('2d'),
    image: coinImage,
    width: 400,
    height: 2394,
    numberOfFrames: 12,
    ticksPerFrame: 4,
})
*/

const canvas = document.getElementById('canvas');
let cnv = canvas.getContext('2d');

let sprite = new Image();
sprite.src = './img/cat-anim.png';

let width, H, height;
let sy = 0, tick_count = 0;

sprite.onload = function() {
  width = sprite.width;
  H = sprite.height;
  height = H / 12;
  canvas.width = width;
  canvas.height = height;

  tick();

  canvas.animate([
    { transform: 'translateX(100vw)' },
    { transform: `translateX(-${width}px)` }
  ], {
    duration: 15000,
    iterations: Infinity
  });

  requestAnimationFrame(tick);
}

function tick() {
  if (tick_count > 10) { drawCat(); tick_count = 0 }
  tick_count++;
  requestAnimationFrame(tick);
}

function drawCat() {
  cnv.clearRect(0, 0, width, height);
  sy = (sy === H - height ? 0 : sy + height);
  cnv.drawImage(sprite, 0, sy, width, height, 0, 20, width, height);
}