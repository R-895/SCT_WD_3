        const board = document.getElementById('board');
        const cells = document.querySelectorAll('.cell');
        const statusDisplay = document.getElementById('status');
        const restartButton = document.getElementById('restartButton');

        let currentPlayer = 'X';
        let boardState = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const handleCellClick = (e) => {
            const clickedCell = e.target;
            const clickedCellIndex = clickedCell.getAttribute('data-index');

            if (boardState[clickedCellIndex] !== '' || !gameActive) {
                return;
            }

            boardState[clickedCellIndex] = currentPlayer;
            clickedCell.classList.add(currentPlayer.toLowerCase());
            clickedCell.innerHTML = currentPlayer;

            checkForWinner();
        };

        const checkForWinner = () => {
            let roundWon = false;

            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = boardState[winCondition[0]];
                let b = boardState[winCondition[1]];
                let c = boardState[winCondition[2]];

                if (a === '' || b === '' || c === '') {
                    continue;
                }

                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = `${currentPlayer} has won!`;
                gameActive = false;
                return;
            }

            if (!boardState.includes('')) {
                statusDisplay.innerHTML = 'Game is a draw!';
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
        };

        const restartGame = () => {
            currentPlayer = 'X';
            boardState = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;

            cells.forEach(cell => {
                cell.innerHTML = '';
                cell.classList.remove('x', 'o');
            });
        };

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        restartButton.addEventListener('click', restartGame);

        statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;




