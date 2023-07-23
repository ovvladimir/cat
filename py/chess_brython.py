from browser import document

txt = document['txt']
out = document['out']
parent = document['chess']
btn_start = document["start"]

COLORS = ('gold', '#dc3545', '#adb5bd')
label_list = []
player = ["белые", "чёрные"]
dl = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7}
dn = {'1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0}

wp, bp = "\u2659", "\u265F"
wr, br = "\u2656", "\u265C"
wk, bk = "\u2658", "\u265E"
wb, bb = "\u2657", "\u265D"
wq, bq = "\u2655", "\u265B"
wK, bK = "\u2654", "\u265A"
s, sp = '', ''

chessman = [
    [s, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', s],
    ['8', br, bk, bb, bq, bK, bb, bk, br, '8'],
    ['7', bp, bp, bp, bp, bp, bp, bp, bp, '7'],
    ['6', sp, sp, sp, sp, sp, sp, sp, sp, '6'],
    ['5', sp, sp, sp, sp, sp, sp, sp, sp, '5'],
    ['4', sp, sp, sp, sp, sp, sp, sp, sp, '4'],
    ['3', sp, sp, sp, sp, sp, sp, sp, sp, '3'],
    ['2', wp, wp, wp, wp, wp, wp, wp, wp, '2'],
    ['1', wr, wk, wb, wq, wK, wb, wk, wr, '1'],
    [s, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', s]
]

for y, row in enumerate(chessman):
    for x, col in enumerate(row):
        color = 2 if (x == 0 or x == 9 or y == 0 or y == 9) else (y + x) & 1
        item = document.createElement("label")
        item.textContent = col
        item.style.backgroundColor = COLORS[color]
        item.style.fontFamily = 'century' if color == 2 else 'arial'
        item.style.color = 'white' if color == 2 else 'black'
        item.className = "labelChess"
        label_list.append(item)
        parent.appendChild(item)

out <= f'Ходят {player[0]}'
out.style.color = '#198754'
txt.focus()


def text(part, style_color):
    out <= f'{part}Ходят {player[0]}'
    out.style.color = style_color
    txt.value = ''
    txt.focus()


def play(e):
    if e.key == 'Enter':
        out.innerHTML = ''
        move = txt.value.lower()
        try:
            if (dl[move[0]] == dl[move[2]] and dn[move[1]] == dn[move[3]]) or len(move) != 4 or \
                    (player[0] == "белые" and 9824 > ord(chessman[dn[move[1]] + 1][dl[move[0]] + 1]) > 9817) or \
                    (player[0] == "чёрные" and 9818 > ord(chessman[dn[move[1]] + 1][dl[move[0]] + 1]) > 9811) or \
                    (player[0] == "чёрные" and chessman[dn[move[3]] + 1][dl[move[2]] + 1] != sp and 9824 > ord(chessman[dn[move[3]] + 1][dl[move[2]] + 1]) > 9817) or \
                    (player[0] == "белые" and chessman[dn[move[3]] + 1][dl[move[2]] + 1] != sp and 9818 > ord(chessman[dn[move[3]] + 1][dl[move[2]] + 1]) > 9811):
                text('Ошибка.' + ' ', '#dc3545')
                return
            chessman[dn[move[3]] + 1][dl[move[2]] + 1] = chessman[dn[move[1]] + 1][dl[move[0]] + 1]
            chessman[dn[move[1]] + 1][dl[move[0]] + 1] = sp
            for i, lst in enumerate(chessman):
                for j, _ in enumerate(lst):
                    label_list[int(f'{i}{j}')].text = chessman[i][j]
            player.reverse()
            text('', '#198754')
        except (IndexError, TypeError, BaseException):
            text('Ошибка.' + ' ', '#dc3545')


def start(e=None):
    player[0], player[1] = "белые", "чёрные"
    chessman[:] = [
        [s, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', s],
        ['8', br, bk, bb, bq, bK, bb, bk, br, '8'],
        ['7', bp, bp, bp, bp, bp, bp, bp, bp, '7'],
        ['6', sp, sp, sp, sp, sp, sp, sp, sp, '6'],
        ['5', sp, sp, sp, sp, sp, sp, sp, sp, '5'],
        ['4', sp, sp, sp, sp, sp, sp, sp, sp, '4'],
        ['3', sp, sp, sp, sp, sp, sp, sp, sp, '3'],
        ['2', wp, wp, wp, wp, wp, wp, wp, wp, '2'],
        ['1', wr, wk, wb, wq, wK, wb, wk, wr, '1'],
        [s, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', s]
    ]
    for i, lst in enumerate(chessman):
        for j, _ in enumerate(lst):
            label_list[int(f'{i}{j}')].text = chessman[i][j]
    out.innerHTML = ''
    out <= f'Ходят {player[0]}'
    out.style.color = '#198754'
    txt.value = ''
    txt.focus()


txt.bind("keydown", play)
btn_start.bind("click", start)
