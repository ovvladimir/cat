from browser import document, timer
from random import randrange, choice


class Snake:

    def __init__(self):
        self.w, self.h = canvas_snake.width, canvas_snake.height
        self.size = 18
        self.cell = self.w // self.size
        self.snake_x, self.snake_y = 8, self.cell // 2
        self.food_x, self.food_y = randrange(0, self.cell, 1), randrange(0, self.cell, 1)
        self.speed = [1, 0]
        self.trail = []
        self.tail = 3
        self.tail_color = "#2526F7"
        self.food_color = choice(colors)
        tail_snake.innerHTML = f'хвост: {self.tail}'
        self.loop = None

    def update(self):
        self.snake_x += self.speed[0]
        self.snake_y += self.speed[1]
        if self.snake_x < 0 or self.snake_x >= self.cell or self.snake_y < 0 or self.snake_y >= self.cell:
            self.stop_snake()
            tail_snake.innerHTML = f'Конец игры - хвост: {self.tail}'
        ctx.fillStyle = snake_color
        ctx.fillRect(0, 0, self.w, self.h)
        ctx.fillStyle = self.tail_color
        for i in range(len(self.trail)):
            ctx.fillRect(self.trail[i][0] * self.size, self.trail[i][1] * self.size, self.size - 2, self.size - 2)
        self.trail.insert(0, [self.snake_x, self.snake_y])
        if len(self.trail) > self.tail:
            self.trail.pop()

        if self.food_x == self.snake_x and self.food_y == self.snake_y:
            self.tail += 1
            self.food_x = randrange(0, self.cell, 1)
            self.food_y = randrange(0, self.cell, 1)
            tail_snake.innerHTML = f'хвост: {self.tail}'
            self.food_color = choice(colors)
        ctx.fillStyle = self.food_color
        ctx.fillRect(self.food_x * self.size, self.food_y * self.size, self.size - 2, self.size - 2)

    def key_push_snake(self, evt):
        key_snake = evt.key
        if key_snake == 'a':
            self.speed[:] = -1, 0
        elif key_snake == 'w':
            self.speed[:] = 0, -1
        elif key_snake == 'd':
            self.speed[:] = 1, 0
        elif key_snake == 's':
            self.speed[:] = 0, 1

    def bottom_snake(self, evt):
        bts = evt.target.id
        if bts == 'kW':
            self.speed[:] = 0, -1
        elif bts == 'kA':
            self.speed[:] = -1, 0
        elif bts == 'kD':
            self.speed[:] = 1, 0
        elif bts == 'kS':
            self.speed[:] = 0, 1

    def stop_snake(self):
        timer.clear_interval(self.loop)

    def start_snake(self, evt=None):
        self.stop_snake()
        snake.__init__()
        document.addEventListener("keydown", snake.key_push_snake)
        buttons_snake.addEventListener("click", self.bottom_snake)
        self.loop = timer.set_interval(self.update, 200)


colors = ['#198754', '#dc3545', '#0dcaf0', '#ffc107', '#fd7e14', '#6f42c1', '#d63384']
canvas_snake = document["snake_board"]
ctx = canvas_snake.getContext("2d")
tail_snake = document["snake_score"]
btn_snake = document["start4"]
buttons_snake = document["buttons_snake"]
snake = Snake()
btn_snake.bind("click", snake.start_snake)
snake_color = document.querySelector(".main").style.backgroundColor
for _ in range(4):
    snake.update()
