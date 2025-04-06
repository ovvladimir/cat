class Sprite {
    constructor(options) {
        this.context = options.context;
        this.image = options.image; // Path to image sprite sheet
        this.x = options.x; // Coordinates on canvas
        this.y = options.y;
        this.width = options.width; // Size of sprite frame
        this.height = options.height;
        this.frames = options.frames; // Number of frames in a row
        this.frameIndex = options.frameIndex; // Current frame
        this.row = options.row; // Row of sprites
        this.ticksPerFrame = options.ticksPerFrame; // Speed of animation
        this.tickCount = options.tickCount; // How much time has passed
        this.text = options.text;
        this.speed = options.speed;
    }

    update() {
        this.x -= game.cat.speed[0];
        if (this.x < -this.width) { this.x = game.canvas.width };
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame[0]) {
            this.tickCount = 0;
            if (this.frameIndex < this.frames - 1) {
                this.frameIndex += 1;
            } else {
                this.frameIndex = 0;
            }
        }
    }

    render() {
        this.context.drawImage(
            this.image,
            this.frameIndex * this.width, // The x-axis coordinate of the top left corner
            this.row * this.height, // The y-axis coordinate of the top left corner
            this.width, // The width of the sub-rectangle
            this.height, // The height of the sub-rectangle
            this.x, // The x coordinate
            this.y,// The y coordinate
            this.width, // The width to draw the image
            this.height, // The width to draw the image
        );
    }
}
//
class Bat extends Sprite {

    static src = './img/bat.png';

    constructor(x, y, context, image) {
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: 150,
            height: 150,
            frameIndex: 0,
            row: 0,
            tickCount: 0,
            ticksPerFrame: [4, NaN],
            frames: 2
        });
    }
}
//
class Cat extends Sprite {

    static src = './img/cat.png';

    constructor(x, y, context, image) {
        super({
            context: context,
            image: image,
            x: x,
            y: y,
            width: 170,
            height: 190,
            frameIndex: 0,
            row: 0,
            tickCount: 0,
            frames: 8,
            ticksPerFrame: [4, NaN],
            speed: [2, 0],
            text: ['СТОП', 'СТАРТ'],
        });
    }

    slow() {
        if (this.text[0] == 'СТОП') {
            this.frames = 8;
            this.frameIndex = 0;
            this.row = 0;
            this.speed[0] = 1;
            this.ticksPerFrame[0] = 10;
            game.bat.ticksPerFrame[0] = 10;
        }
    }

    medium() {
        if (this.text[0] == 'СТОП') {
            this.frames = 8;
            this.frameIndex = 0;
            this.row = 0;
            this.speed[0] = 2;
            this.ticksPerFrame[0] = 4;
            game.bat.ticksPerFrame[0] = 4;
        }
    }

    fast() {
        if (this.text[0] == 'СТОП') {
            this.frames = 8;
            this.frameIndex = 0;
            this.row = 0;
            this.speed[0] = 3;
            this.ticksPerFrame[0] = 2;
            game.bat.ticksPerFrame[0] = 2;
        }
    }

    start_stop() {
        this.speed.reverse();
        this.ticksPerFrame.reverse();
        game.bat.ticksPerFrame.reverse();
        this.text.reverse();
        this.frames = 8;
        this.frameIndex = 1;
        this.row = 0;
        game.txt.textContent = this.text[0];
        if (this.speed[0] != 0) {this.speed[0] = 2; this.ticksPerFrame[0] = 4; game.bat.ticksPerFrame[0] = 4};
    }
}
//
const game = {
    isRunning: true,

    init() {
        game.canvas = document.getElementById("canvas");
        game.context = game.canvas.getContext("2d");
        game.txt = document.getElementById("txt");
        game.loader = loader;
        game.loader.init();

        this.cat = new Cat(400, 180, game.context, loader.images.cat);
        this.bat = new Bat(50, 50, game.context, loader.images.bat);

        // Start game
        game.drawingLoop();
    },

    drawingLoop() {
        // Clear canvas
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
        // Draw and update frame index
        game.cat.render();
        game.cat.update();

        game.bat.render();
        game.bat.update();

        if (game.isRunning) {
            requestAnimationFrame(game.drawingLoop);
        }
    },
};

const loader = {
    count: 0,
    images: {},

    add(title, src) {
        const image = new Image();
        image.src = src;
        this.images[title] = image;
        this.count++;
    },

    init() {
        loader.add('cat', Cat.src);
        loader.add('bat', Bat.src);
    }
};

window.addEventListener("load", () => {
    game.init();
});