// Opretter Cell-klassen med en konstruktør
class Cell {
    constructor(x, y, size) {
        this.x = x;          // x-koordinatet for cellen
        this.y = y;          // y-koordinatet for cellen
        this.size = size;     // størrelsen af cellen
        this.player = null;   // spiller, der ejer cellen 
    }

    // Viser cellen på lærredet
    display() {
        stroke(0);
        noFill();
        rect(this.x, this.y, this.size, this.size);

        // Hvis cellen ejes af en spiller, vis spillerens symbol
        if (this.player !== null) {
            textSize(32);
            textAlign(CENTER, CENTER);
            text(this.player.symbol, this.x + this.size / 2, this.y + this.size / 2);
        }
    }

    // Håndterer museklik på cellen
    handleClick() {
        // Hvis cellen er tom, tildel den aktuelle spiller og skift spilleren
        if (this.player === null) {
            this.player = currentPlayer;
            currentPlayer = (currentPlayer === player1) ? player2 : player1;
        }
    }
}
