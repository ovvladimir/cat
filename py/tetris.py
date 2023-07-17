from browser import document, timer
from random import choice

'''
0  1  2  3
4  5  6  7
8  9  10 11
12 13 14 15
'''

shapes = [
    [[1, 5, 9, 13], [4, 5, 6, 7]],
    [[4, 5, 9, 10], [6, 10, 9, 13]],
    [[6, 7, 9, 10], [5, 9, 10, 14]],
    [[5, 6, 9, 13], [4, 8, 9, 10], [5, 9, 12, 13], [4, 5, 6, 10]],
    [[5, 6, 10, 14], [5, 6, 7, 9], [5, 9, 13, 14], [7, 9, 10, 11]],
    [[5, 8, 9, 10], [5, 8, 9, 13], [4, 5, 6, 9], [5, 9, 10, 13]],
    [[5, 6, 9, 10]]
]

colors = ['#198754', '#ff4136', '#0dcaf0', '#ffc107', '#fd7e14', '#0d6efd', '#d63384']

w, h = 1, 1
size, rows = 20, 10
sx, sy = 0, 0

element = document["tetris"]
element2 = document["tetris2"]
element3 = document["score"]
element4 = document["over"]
element5 = document["start3"]
element6 = document["bottom_click"]
canvas = element.getContext("2d")
canvas2 = element2.getContext("2d")
canvas.strokeStyle = '#0074d9'


class Block:

    def __init__(self, x, y, n, r):
        self.x = x
        self.y = y
        self.type = self.color = n
        self.rotation = r

    def image(self):
        return shapes[self.type][self.rotation]

    def rotate(self):
        self.rotation = (self.rotation + 1) % len(shapes[self.type])


class Game:

    def __init__(self, cell, row):
        self.field = []
        self.cell = cell
        self.row = row
        self.score = 0
        self.gameover = True
        self.block, self.next_block = None, None
        self.tick_timer = None

    def field_init(self):
        for i in range(self.cell):
            new_line = []
            for j in range(self.row):
                new_line.append(0)
            self.field.append(new_line)

    def new_block(self):
        ind = shapes.index(choice(shapes))
        rotation = choice(range(0, len(shapes[ind])))
        self.block = Block(3, 0 if ind == 0 and rotation == 0 else -1, ind, rotation)

    def new_next_block(self):
        ind = shapes.index(choice(shapes))
        rotation = choice(range(0, len(shapes[ind])))
        self.next_block = Block(3, 0 if ind == 0 and rotation == 0 else -1, ind, rotation)

    def intersects(self):
        intersection = False
        for i in range(4):
            for j in range(4):
                if i * 4 + j in self.block.image():
                    if i + self.block.y > size - 1 or \
                            j + self.block.x > self.row - 1 or \
                            j + self.block.x < 0 or \
                            self.field[i + self.block.y][j + self.block.x] > 0:
                        intersection = True
        return intersection

    def break_lines(self):
        lines = 0
        for i in range(1, self.cell):
            zeros = 0
            for j in range(self.row):
                if self.field[i][j] == 0:
                    zeros += 1
            if zeros == 0:
                lines += 1
                for m in range(i, 1, -1):
                    for j in range(self.row):
                        self.field[m][j] = self.field[m - 1][j]
        self.score += lines

    def freeze(self):
        for i in range(4):
            for j in range(4):
                if i * 4 + j in self.block.image():
                    self.field[i + self.block.y][j + self.block.x] = self.block.color + 1
        self.break_lines()
        self.block = self.next_block
        self.new_next_block()
        if self.intersects():
            self.gameover = True
            timer.clear_interval(self.tick_timer)
            element4.innerHTML = "Game Over"

    def move_down(self):
        self.block.y += 1
        if self.intersects():
            self.block.y -= 1
            self.freeze()

    def move_bottom(self):
        while not self.intersects():
            self.block.y += 1
        self.block.y -= 1
        self.freeze()

    def move_horizontal(self, dx):
        old_x = self.block.x
        self.block.x += dx
        if self.intersects():
            self.block.x = old_x

    def rotate(self):
        old_rotation = self.block.rotation
        self.block.rotate()
        if self.intersects():
            self.block.rotation = old_rotation

    def update(self):
        canvas.clearRect(0, 0, 202, 402)
        canvas2.clearRect(0, 0, 80, 80)
        canvas.beginPath()
        canvas2.beginPath()
        for i in range(self.cell):
            for j in range(self.row):
                # рисуем доску
                canvas.strokeRect(w + size * j, h + size * i, size, size)
                if self.field[i][j] > 0:
                    # рисуем обновленное поле
                    canvas.fillStyle = colors[self.field[i][j] - 1]
                    canvas.fillRect(w + size * j + 1, h + size * i + 1, size - 2, size - 1)

        for i in range(4):
            for j in range(4):
                p = i * 4 + j
                if p in self.block.image():
                    canvas.fillStyle = colors[self.block.color]
                    canvas.fillRect(w + size * (j + self.block.x) + 1, h + size * (i + self.block.y) + 1, size - 2, size - 2)
                    # рисуем игровой блок
                if p in self.next_block.image():
                    # рисуем следующий блок
                    canvas2.fillStyle = colors[self.next_block.color]
                    canvas2.fillRect(sx + j * size, sy + i * size, size, size)

        canvas.closePath()
        canvas2.closePath()
        element3.innerHTML = "score: " + str(self.score)
        element4.innerHTML = "Game"

        if not self.gameover:
            self.move_down()

    def key_push(self, ev):
        key = ev.keyCode
        if key == 87:
            self.rotate()
        elif key == 65:
            self.move_horizontal(-1)
        elif key == 68:
            self.move_horizontal(1)
        elif key == 83:
            self.move_bottom()

    def bottom_push(self, ev):
        bt = ev.target.id
        if bt == 'W':
            self.rotate()
        elif bt == 'A':
            self.move_horizontal(-1)
        elif bt == 'S':
            self.move_horizontal(1)
        elif bt == 'D':
            self.move_bottom()

    def start(self):
        self.gameover = False
        self.score = 0
        self.field.clear()
        self.field_init()
        self.new_next_block()
        self.new_block()
        document.addEventListener("keydown", self.key_push)
        element6.addEventListener("click", self.bottom_push)

    def stop_timer(self):
        timer.clear_interval(self.tick_timer)

    def start_timer(self, ev=None):
        self.start()
        self.stop_timer()
        self.tick_timer = timer.set_interval(self.update, 300)


game = Game(size, rows)
game.start()
game.update()
element4.innerHTML = "New Game"
element5.bind("click", game.start_timer)
