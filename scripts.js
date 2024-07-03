document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('chessboard');
    const turnIndicator = document.getElementById('turnIndicator');
    let isWhiteTurn = true;
    let selectedPiece = null;

    const initialBoard = [
        ['rook_b', 'knight_b', 'bishop_b', 'queen_b', 'king_b', 'bishop_b', 'knight_b', 'rook_b'],
        ['pawn_b', 'pawn_b', 'pawn_b', 'pawn_b', 'pawn_b', 'pawn_b', 'pawn_b', 'pawn_b'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['pawn_w', 'pawn_w', 'pawn_w', 'pawn_w', 'pawn_w', 'pawn_w', 'pawn_w', 'pawn_w'],
        ['rook_w', 'knight_w', 'bishop_w', 'queen_w', 'king_w', 'bishop_w', 'knight_w', 'rook_w']
    ];

    const pieceImages = {
        'king_w': 'img/king_w.png',
        'queen_w': 'img/queen_w.png',
        'rook_w': 'img/rook_w.png',
        'bishop_w': 'img/bishop_w.png',
        'knight_w': 'img/knight_w.png',
        'pawn_w': 'img/pawn_w.png',
        'king_b': 'img/king_b.png',
        'queen_b': 'img/queen_b.png',
        'rook_b': 'img/rook_b.png',
        'bishop_b': 'img/bishop_b.png',
        'knight_b': 'img/knight_b.png',
        'pawn_b': 'img/pawn_b.png'
    };

    function createSquare(color, piece, pos) {
        const square = document.createElement('div');
        square.className = `square ${color}`;
        square.dataset.pos = pos;
        if (piece) {
            const pieceElement = document.createElement('div');
            pieceElement.className = 'piece';
            pieceElement.draggable = true;
            pieceElement.dataset.piece = piece;
            pieceElement.innerHTML = `<img src="${pieceImages[piece]}" alt="${piece}">`;
            square.appendChild(pieceElement);
        }
        return square;
    }

    function renderBoard(board) {
        boardElement.innerHTML = '';
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const pos = String.fromCharCode(97 + j) + (8 - i);
                const color = (i + j) % 2 === 0 ? 'white' : 'black';
                const piece = board[i][j];
                boardElement.appendChild(createSquare(color, piece, pos));
            }
        }
    }

    function handleSquareClick(event) {
        const square = event.currentTarget;
        const piece = square.querySelector('.piece');
        if (selectedPiece) {
            const fromPos = selectedPiece.parentElement.dataset.pos;
            const toPos = square.dataset.pos;
            movePiece(fromPos, toPos);
        } else if (piece) {
            selectPiece(piece);
        }
    }

    function selectPiece(piece) {
        selectedPiece = piece;
        piece.classList.add('selected');
    }

    function movePiece(fromPos, toPos) {
        const fromSquare = document.querySelector(`[data-pos='${fromPos}']`);
        const toSquare = document.querySelector(`[data-pos='${toPos}']`);
        if (isValidMove(fromPos, toPos)) {
            toSquare.innerHTML = fromSquare.innerHTML;
            fromSquare.innerHTML = '';
            isWhiteTurn = !isWhiteTurn;
            turnIndicator.textContent = isWhiteTurn ? "White's turn" : "Black's turn";
            selectedPiece.classList.remove('selected');
            selectedPiece = null;
            updateBoardOrientation(); // Update board orientation after each move
        }
    }

    function isValidMove(fromPos, toPos) {
        // Implement chess rules validation here
        return true;
    }

    function updateBoardOrientation() {
        // Add a delay to simulate the flipping animation
        setTimeout(() => {
            boardElement.classList.add('fade-flip');
            setTimeout(() => {
                boardElement.classList.remove('fade-flip');
                boardElement.classList.toggle('rotate');
                boardElement.classList.toggle('rotate-pieces');
            }, 400);
        }, 100);
    }

    function addEventListeners() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.addEventListener('click', handleSquareClick);
            square.addEventListener('dragover', (e) => e.preventDefault());
            square.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromPos = selectedPiece.parentElement.dataset.pos;
                const toPos = square.dataset.pos;
                movePiece(fromPos, toPos);
            });
        });

        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            piece.addEventListener('dragstart', () => {
                selectedPiece = piece;
            });
            piece.addEventListener('dragend', () => {
                selectedPiece = null;
            });
        });
    }

    renderBoard(initialBoard);
    addEventListeners();
});
