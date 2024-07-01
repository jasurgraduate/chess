document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('chessboard');
    const turnIndicator = document.getElementById('turnIndicator');
    let turn = 'white';
    let selectedSquare = null;
    let capturedPieces = { white: [], black: [] };

    const initialBoard = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ];

    const pieceSymbols = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    const createPiece = (piece) => {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = `piece ${piece === piece.toUpperCase() ? 'white-piece' : 'black-piece'}`;
        pieceDiv.textContent = pieceSymbols[piece] || '';

        // Rotate pieces based on turn
        if (turn === 'black') {
            pieceDiv.style.transform = 'rotateX(180deg)';
        } else {
            pieceDiv.style.transform = 'rotateX(0deg)';
        }

        return pieceDiv;
    };

    const createSquare = (piece, color, row, col) => {
        const square = document.createElement('div');
        square.className = `square ${color}`;
        square.dataset.row = row;
        square.dataset.col = col;
        if (piece !== ' ') {
            square.appendChild(createPiece(piece));
        }
        square.addEventListener('click', () => handleSquareClick(row, col));
        return square;
    };

    const setupBoard = (boardArray) => {
        board.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = boardArray[row][col];
                const color = (row + col) % 2 === 0 ? 'white' : 'black';
                board.appendChild(createSquare(piece, color, row, col));
            }
        }
        // Rotate board and pieces for black's perspective initially
        board.style.transform = 'rotateX(180deg)';
        document.querySelectorAll('.piece').forEach(piece => {
            piece.style.transform = 'rotateX(180deg)';
        });
    };

    const handleSquareClick = (row, col) => {
        if (selectedSquare) {
            movePiece(selectedSquare.row, selectedSquare.col, row, col);
            selectedSquare = null;
        } else {
            selectedSquare = { row, col };
        }
    };

    const movePiece = (fromRow, fromCol, toRow, toCol) => {
        const piece = initialBoard[fromRow][fromCol];
        const targetPiece = initialBoard[toRow][toCol];
        if (targetPiece !== ' ') {
            capturePiece(targetPiece);
        }
        initialBoard[toRow][toCol] = piece;
        initialBoard[fromRow][fromCol] = ' ';
        setupBoard(initialBoard);
        switchTurn();
    };

    const capturePiece = (piece) => {
        if (piece === piece.toUpperCase()) {
            capturedPieces.black.push(createPiece(piece));
        } else {
            capturedPieces.white.push(createPiece(piece));
        }
    };

    const switchTurn = () => {
        turn = turn === 'white' ? 'black' : 'white';

        // Animate board and pieces
        board.style.transform = `rotateX(${turn === 'black' ? '0' : '180'}deg)`;
        document.querySelectorAll('.piece').forEach(piece => {
            piece.style.transform = `rotateX(${turn === 'black' ? '0' : '180'}deg)`;
        });
    };

    setupBoard(initialBoard);
});
