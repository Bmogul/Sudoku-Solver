// Function to check if the value fits in the row
const checkCol = (r, c, board, val) => {
	for (let k = 0; k < board.length; k++) {
		if (board[k][c] == val && k !== r) {
			return false;
		}
	}
	return true;
}
// Function to check if the value fits in the col
const checkRow = (r, c, board, val) => {

	for (let k = 0; k < board.length; k++) {
		if (board[r][k] == val && k !== c) {
			return false;
		}
	}
	return true;
}
// Function which sets three diagnol squares of board
const setBoard = (size, board, limiter) => {
	for (let i = size - limiter; i < size; i++) {
		for (let j = size - limiter; j < size; j++) {
			if (board[i][j] == 0) {
				let value = Math.floor(Math.random() * 9 + 1);
				if (!checkCol(i, j, board, value)) {
					j--
					continue;
				}
				if (!checkRow(i, j, board, value)) {
					j--
					continue;
				}
				board[i][j] = value;
			}
		}
	}

}
// Function fills remaing zeros to creaet a valid board
const fillRemaining = (board, row, col) => {
	if (row >= 9) {
		return true;
	}
	if (col >= 9) {
		col = 0;
		row++;
	}
	if (row < 3 && col < 3)
		col = 3;
	else if (row < 6 && row > 2 && col >= 3 && col <= 5)
		col = 6;
	else if (row == 8 && col >= 6)
		return true;
	for (let i = 1; i <= 9; i++) {
		if (checkRow(row, col, board, i) && checkCol(row, col, board, i)) {
			board[row][col] = i;
			if (fillRemaining(board, row, col + 1))
				return true;
			board[row][col] = 0;
		}
	}
	return false;
}
// Function removes n spaces from board to create a playable board
const removeNumbers = (n, board) => {
	while (n != 0) {
		let row = Math.floor(Math.random() * 9)
		let col = Math.floor(Math.random() * 9)
		if (board[row][col] != 0) {
			n--;
			board[row][col] = 0
		}
	}
}
// Function that solves a non finished board
const solve = (board, row, col) => {
	if (col >= 9) {
		col = 0;
		row++;
	}
	if (row >= 9) {
		return true;
	}
	if (board[row][col] != 0) {
		return solve(board, row, col + 1)
	}
	for (let i = 1; i <= 9; i++) {
		if (checkRow(row, col, board, i) && checkCol(row, col, board, i)) {
			board[row][col] = i;
			if (solve(board, row, col + 1))
				return true;
			board[row][col] = 0;
		}
	}
	return false;

}
// Function that creates a board
const createBoard = (emptySpaces = 40) => {
	let board = Array(9).fill().map(() => Array(9).fill(0));
	let incomplete = true;
	while (incomplete) {
		board = Array(9).fill().map(() => Array(9).fill(0));
		setBoard(3, board, 3);
		setBoard(6, board, 3);
		setBoard(9, board, 3);
		incomplete = !fillRemaining(board, 0, 0);
	}
	//remove spaces to make solvable board
	console.log()
	removeNumbers(emptySpaces, board)
	return board;
}
// Function that prints out the board in console
const printBoard = (board) => {
	for (let i = 0; i < 9; i++) {
		console.log()
		if (i % 3 == 0 && i != 0)
			console.log("------------------------")
		for (let j = 0; j < 9; j++) {
			if ((j) % 3 == 0 && j != 0)
				process.stdout.write(" | ")
			process.stdout.write(board[i][j] + " ")
		}
	}
	console.log()
}



const board = createBoard();
printBoard(board)
//while(!solve(board, 0, 0));
solve(board, 0, 0)
console.log()
printBoard(board)
