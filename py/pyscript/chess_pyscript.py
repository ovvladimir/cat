from js import document
import numpy as np

txt = document.querySelector('#txt')
out = document.querySelector('#out')
parent = document.querySelector('#chess')

COLORS = ('gold', '#ff4136', '#adb5bd')
player = ["белые", "чёрные"]
dl = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7}
dn = {'1': 7, '2': 6, '3': 5, '4': 4, '5': 3, '6': 2, '7': 1, '8': 0}

wp, bp = "\u2659", "\u265F"
wr, br = "\u2656", "\u265C"
wk, bk = "\u2658", "\u265E"
wb, bb = "\u2657", "\u265D"
wq, bq = "\u2655", "\u265B"
wK, bK = "\u2654", "\u265A"
s, sp = ' ', ''

chessman = np.array([
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
], dtype=str)


def play():
    out.innerHTML = ''
    move = Element("txt").value.lower()
    try:
        if (dl[move[0]] == dl[move[2]] and dn[move[1]] == dn[move[3]]) or len(move) != 4 or \
           (9824 > ord(chessman[1:-1, 1:-1][dn[move[1]], dl[move[0]]]) > 9817 and player[0] == "белые") or \
           (9818 > ord(chessman[1:-1, 1:-1][dn[move[1]], dl[move[0]]]) > 9811 and player[0] == "чёрные"):
            move = sp
        chessman[1:-1, 1:-1][dn[move[3]], dl[move[2]]] = chessman[1:-1, 1:-1][dn[move[1]], dl[move[0]]]
        chessman[1:-1, 1:-1][dn[move[1]], dl[move[0]]] = sp
        player.reverse()
        display(f'Ходят {player[0]}', target="out")
        out.style.color = '#198754'
    except (IndexError, TypeError, BaseException):
        display(f'Ошибка. Ходят {player[0]}.', target="out")
        out.style.color = '#ff4136'
    parent.innerHTML = ''
    txt.value = ''
    txt.focus()
    html()


def html():
    for index, value in np.ndenumerate(chessman):
        color = 2 if value not in chessman[1:-1, 1:-1] else (index[0] + index[1]) & 1
        item = document.createElement("label")
        item.textContent = value
        item.style.backgroundColor = COLORS[color]
        item.style.fontFamily = 'century' if color == 2 else 'arial'
        item.style.color = 'white' if value not in chessman[1:-1, 1:-1] else 'black'
        item.className = "labelChess"
        parent.appendChild(item)


def start():
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
    parent.innerHTML = ''
    out.innerHTML = ''
    txt.value = ''
    html()
    display(f'Ходят {player[0]}', target="out")
    out.style.color = '#198754'
    txt.focus()


html()
display(f'Ходят {player[0]}', target="out")
out.style.color = '#198754'
txt.focus()
