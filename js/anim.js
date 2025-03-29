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