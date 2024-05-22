// La funcionalidad va enfocada desde los objetos y clases -- The program is focus on objects

const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();  //Esto es para iniciar el juego

function TicTacToeGame() {
    // Creamos funciones constructoras -- Build the functions constructors
    const board = new Board();
    const humanPlayer = new HumanPlayer(board); // el parametro board es para que elijan el lugar
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;

    this.start = function() {   // config is to check any change in the div content
        const config = {childList: true};   // config es para verificar si hay algun cambio en el contenido del div en el DOM
        const observer = new MutationObserver(() => takeTurn());    // observer es quien verifica dichos cambios
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    };

    function takeTurn() {

        if (board.checkForWinner()) {   // Check for winner before take a turn
            return;
        };

        if (turn % 2 === 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        };

        turn++;
    };
};

// Codificamos cada constructor (funciones) -- Build each constructor

function Board() {
    this.positions = Array.from(document.querySelectorAll('.col'));
    
    this.checkForWinner = function() {
        let winner = false;

        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];

        const positions = this.positions;

        winnerCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;

            const isWinnigCombo = pos0InnerText !== '' && pos0InnerText === pos1InnerText && pos1InnerText === pos2InnerText;

            if (isWinnigCombo) {
                winner = true;
                winningCombo.forEach((index) => {
                    positions[index].className += ' winner';
                })
            };
        });

        return winner;

    };
};

function HumanPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach(el => el.addEventListener('click', handleTurnTaken));
    };

    function handleTurnTaken(e) {
        e.target.innerText = 'X';
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
    };
};

function ComputerPlayer(board) {
    this.takeTurn = function() {
        const availablePositions = board.positions.filter((p) => p.innerText === '');   // Posicion libre, innerText vacio
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O';
    };
};