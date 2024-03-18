// Initialiserer variabler for spillet og sejrstællere
let player1, player2, currentPlayer, board;
let xWins = 0;
let oWins = 0;

// Opsætter spillet ved start
function setup() {
    createCanvas(300, 300);
    player1 = new Player('X');
    player2 = new Player('O');
    currentPlayer = player1;
    board = new Board(3, 3, width / 3);
}

// Tegner spillet på lærredet
function draw() {
    background(255);
    board.display();
}

// Håndterer museklik på bordet
function mousePressed() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        board.handleClick(mouseX, mouseY);
    }
}

// Tjekker for en vinder eller uafgjort
function checkWinner() {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Vandrette linjer
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Lodrette linjer
        [0, 4, 8], [2, 4, 6]              // Diagonale linjer
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        const cellA = board.cells[a];
        const cellB = board.cells[b];
        const cellC = board.cells[c];

        if (cellA.player !== null && cellA.player === cellB.player && cellA.player === cellC.player) {
            // Der er en vinder!
            board.winningLine = line;
            announceWinner(cellA.player);
            return;
        }
    }

    // Tjek for uafgjort
    if (isBoardFull()) {
        announceDraw();
    }
}

// Annoncerer vinderen og opdaterer sejrstællere
function announceWinner(player) {
    if (player.symbol === 'X') {
        xWins++;
    } else {
        oWins++;
    }

    // Gemmer sejrstællere i localStorage og opdaterer GUI'en
    localStorage.setItem('xWins', xWins);
    localStorage.setItem('oWins', oWins);
    updateScore();
    
    // Viser en besked om vinderen og nulstiller spillet efter en kort pause
    setTimeout(function () {
        alert(`Player ${player.symbol} wins!`);
        resetGame();
    }, 100);
}

// Opdaterer sejrstæller-GUI'en
function updateScore() {
    document.getElementById('x-wins').innerText = `X Wins: ${xWins}`;
    document.getElementById('o-wins').innerText = `O Wins: ${oWins}`;

    // Gemmer sejrstællere i localStorage
    localStorage.setItem('xWins', xWins);
    localStorage.setItem('oWins', oWins);
}

// Annoncerer uafgjort og nulstiller spillet
function announceDraw() {
    alert('It\'s a draw!');
    resetGame();
}

// Tjekker om bordet er fuldt
function isBoardFull() {
    for (let cell of board.cells) {
        if (cell.player === null) {
            return false; // Der er mindst én tom celle, så bordet er ikke fuldt
        }
    }
    return true; // Alle celler er fyldt, og der er ingen vindere
}

// Starter spillet og nulstiller sejrstællere
function startGame() {
    alert('Game started!');
    resetGame();
}

// Nulstiller spillet og henter sejrstællere fra localStorage ved start
function resetGame() {
    player1 = new Player('X');
    player2 = new Player('O');
    currentPlayer = player1;
    board = new Board(3, 3, width / 3);
    redraw();

    // Henter sejrstællere fra localStorage ved spilstart
    xWins = parseInt(localStorage.getItem('xWins')) || 0;
    oWins = parseInt(localStorage.getItem('oWins')) || 0;
    updateScore();
}
