
// Opretter Board-klassen med en konstruktør altså den metode, der bliver kaldt når et objekt bliver igangsat.
class Board {
    constructor(rows, cols, cellSize) {
        this.rows = rows;            // Antal rækker på bordet
        this.cols = cols;            // Antal kolonner på bordet
        this.cellSize = cellSize;    // Størrelsen af hver celle
        this.cells = [];              // Array til at gemme cellerne
        this.winningLine = null;     // Gemmer information om den vindende linje

        // Opretter celler og placerer dem på bordet
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.cells.push(new Cell(j * cellSize, i * cellSize, cellSize));
            }
        }
    }

    // Koder her for at vise bordet på lærredet
    display() {
        for (let cell of this.cells) {
            cell.display();
        }

        // Hvis der er en vindende linje, tegn den med en rød farve
        if (this.winningLine) {
            stroke(255, 0, 0); // Rød farve
            strokeWeight(5);

            // Her tegner jeg den vindende linje ved at forbinde de relevante celler
            line(
                this.cells[this.winningLine[0]].x + this.cellSize / 2,
                this.cells[this.winningLine[0]].y + this.cellSize / 2,
                this.cells[this.winningLine[2]].x + this.cellSize / 2,
                this.cells[this.winningLine[2]].y + this.cellSize / 2
            );
        }
    }

    // Håndterer museklik på bordet
    handleClick(x, y) {
        // Beregner række og kolonne baseret på musepositionen
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        const index = row * this.cols + col;

        // Hvis index er gyldigt, håndter museklik på den pågældende celle og tjek for vinder
        if (index >= 0 && index < this.cells.length) {
            this.cells[index].handleClick();
            checkWinner();
        }
    }
}

