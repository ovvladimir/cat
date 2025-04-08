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
let cty = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 199.5;

let sy = 0, tick_count = 0;
let sprite = new Image();
sprite.src = './img/cat-anim.png';

sprite.onload = function() {
  tick();
  requestAnimationFrame(tick);
};

function tick() {
  if (tick_count > 10) {
    drawCat();
    tick_count = 0;
  }
  tick_count++;
  requestAnimationFrame(tick);
}

function drawCat() {
  cty.clearRect(0, 0, canvas.width, canvas.height);
  sy = (sy === 2194.5 ? 0 : sy + 199.5);
  cty.drawImage(sprite, 0, sy, 400, 199.5, 0, 0, 400, 199.5);
}

canvas.animate([
    { transform: 'translateX(100vw)' },
    { transform: 'translateX(-400px)' }
  ], {
    duration: 15000,
    iterations: Infinity
  })