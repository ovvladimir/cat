class Games {
    constructor() {
		const x = 0; const y = 0; const w = 360; const h = 360; const d = 10;
		this.cord = [
			[x+d, h/6, w-d, h/6], [x+d, h/2, w-d, h/2], [x+d, h/1.2, w-d, h/1.2], [w/6, y+d, w/6, h-d],
			[w/2, y+d, w/2, h-d], [w/1.2, y+d, w/1.2, h-d], [x+d, y+d, w-d, h-d], [w-d, y+d, x+d, h-d]
		];
        this.arr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];
		this.game = document.querySelector('.ttt');
		for (let i = 0; i <= this.arr.length; i++) {
			this.item = document.createElement("div");
			this.item.className = "cell";
			this.game.appendChild(this.item);
		};
		this.sells = document.querySelectorAll(".cell");
        this.result = document.querySelector(".result");
        this.btnGame = document.querySelector("#start2");
        this.step = false;
        this.initBound = this.init.bind(this);

		this.gameStop = document.createElement('span');
		this.gameStop.style.position = 'absolute';
		this.game.appendChild(this.gameStop);
    }

    init(e) {
		if (e.target.innerHTML === '') {
			if (!this.step) {
				new Cross().stepCross(e.target);
				this.step = !this.step;
				if (!this.win()) {
					const emptyCells = this.getEmptyCells();
					if (emptyCells.length > 0) {
						const targetCell = this.sells[emptyCells[this.AiMove(emptyCells)]];
						setTimeout(() => {
							new Circle().stepZero(targetCell);
							this.step = !this.step;
							this.win();
						}, 500)
					}
				}
			}
		}
	}

    AiMove(emptyCells) {
        for (const index of emptyCells) {
            const boardCopy = [...this.getBoardState()];
            boardCopy[index] = "o";
            if (this.checkWin(boardCopy, "o")) {
                return emptyCells.indexOf(index);
            }
        }
        for (const index of emptyCells) {
            const boardCopy = [...this.getBoardState()];
            boardCopy[index] = "x";
            if (this.checkWin(boardCopy, "x")) {
                return emptyCells.indexOf(index);
            }
        }
        return Math.floor(Math.random() * emptyCells.length);
    }
	
	getEmptyCells() {
        const emptyCells = [];
        this.sells.forEach((cell, index) => {
            if (cell.innerHTML === '') {
                emptyCells.push(index);
            }
        });
        return emptyCells;
    }

    getBoardState() {
        const board = [];
        this.sells.forEach((cell) => {
            if (cell.classList.contains("x")) {
                board.push("x");
            } else if (cell.classList.contains("o")) {
                board.push("o");
            } else {
                board.push("");
            }
        });
        return board;
    }

    calculation(newBoard, player, depth, alpha, beta) {
		const availSpots = this.getEmptyCells();
	
		if (this.checkWin(newBoard, "x")) {
			return { score: -10 + depth };
		} else if (this.checkWin(newBoard, "o")) {
			return { score: 10 - depth };
		} else if (availSpots.length === 0) {
			return { score: 0 };
		}
	
		if (player === "o") {
			let bestScore = -Infinity;
			let bestMove = null;
			for (const index of availSpots) {
				newBoard[index] = player;
				const score = this.calculation(newBoard, "x", depth + 1, alpha, beta).score;
				newBoard[index] = '';
				if (score > bestScore) {
					bestScore = score;
					bestMove = index;
				}
				alpha = Math.max(alpha, bestScore);
				if (alpha >= beta) {
					break;
				}
			}
			return { score: bestScore, index: bestMove };
		} else {
			let bestScore = Infinity;
			let bestMove = null;
			for (const index of availSpots) {
				newBoard[index] = player;
				const score = this.calculation(newBoard, "o", depth + 1, alpha, beta).score;
				newBoard[index] = '';
				if (score < bestScore) {
					bestScore = score;
					bestMove = index;
				}
				beta = Math.min(beta, bestScore);
				if (alpha >= beta) {
					break;
				}
			}
			return { score: bestScore, index: bestMove };
		}
	}	

    newGame() {
        this.step = false;
        this.result.innerText = "\u00A0";
		this.gameStop.innerHTML = "";
        this.sells.forEach((item) => {
            item.innerHTML = "";
            item.classList.remove("x", "o");
        });
        this.game.addEventListener("click", this.init.bind(this));
        this.game.addEventListener("click", this.initBound);
    }

    win() {
		let gameOver = false;
		for (let i = 0; i < this.arr.length; i++) {
			if (
				this.sells[this.arr[i][0]].classList.contains("o") &&
				this.sells[this.arr[i][1]].classList.contains("o") &&
				this.sells[this.arr[i][2]].classList.contains("o")
			) {
				gameOver = true;
				new Line(this.cord[i]).stepLine(this.gameStop);
				this.result.innerText = "Выиграл Кот";
				this.game.removeEventListener("click", this.initBound);
				this.step = true;
				break;
			} else if (
				this.sells[this.arr[i][0]].classList.contains("x") &&
				this.sells[this.arr[i][1]].classList.contains("x") &&
				this.sells[this.arr[i][2]].classList.contains("x")
			) {
				gameOver = true;
				new Line(this.cord[i]).stepLine(this.gameStop);
				this.result.innerText = "Выиграли Вы";
				this.game.removeEventListener("click", this.initBound);
				break;
			}
		}
	
		if (!gameOver && this.getEmptyCells().length === 0) {
			this.result.innerText = "Ничья";
			gameOver = true;
		}
		return gameOver;
	}

    checkWin(board, player) {
		for (let i = 0; i < this.arr.length; i++) {
			if (
				board[this.arr[i][0]] === player &&
				board[this.arr[i][1]] === player &&
				board[this.arr[i][2]] === player
			) {
				return true;
			}
		}
		return false;
	}
}

class Line {
	constructor(xy) {
		this.line = `<svg height="360" width="360" style="background-color: transparent;">
		<line stroke="#198754" stroke-width="4" x1="${xy[0]}" y1="${xy[1]}" x2="${xy[2]}" y2="${xy[3]}" />
	 	</svg> `;
	}
	stepLine(target) {
		target.innerHTML = this.line;
	}
}

class Cross {
    constructor() {
		this.cross = `<svg viewBox="0 0 16 16">
		<path stroke="#dc3545" d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
	  	</svg>`;
	}

	stepCross(target) {
		if (target.innerHTML === '') {
			target.innerHTML = this.cross;
			target.classList.add("x");
		}
	}
}

class Circle {
    constructor() {
		this.circle = `<svg viewBox="-2 -2 20 20">
		<path stroke="#2526F7" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
		</svg>`;
	}

	stepZero(target) {
		if (target.innerHTML === '') {
			target.innerHTML = this.circle;
			target.classList.add("o");
		}
	}
}

const games = new Games();
games.btnGame.addEventListener("click", games.newGame.bind(games));
games.game.addEventListener("click", games.initBound);
