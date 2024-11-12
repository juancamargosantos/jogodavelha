// Variáveis de estado do jogo
let currentPlayer = 'X'; // Jogador inicial
let board = ['', '', '', '', '', '', '', '', '']; // Tabuleiro (posição 0 a 8)
let gameOver = false; // Flag para verificar se o jogo terminou

// Seleção dos elementos DOM
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Função para inicializar o tabuleiro
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
    });
    status.textContent = "Vez do Jogador X";
}

// Função para verificar se alguém ganhou
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            return board[a]; // Retorna o jogador vencedor
        }
    }

    if (!board.includes('')) {
        gameOver = true;
        return 'Empate';
    }

    return null;
}

// Função para atualizar o jogo quando uma célula for clicada
function handleCellClick(event) {
    if (gameOver) return;

    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index')); // Certifique-se de usar um número

    if (board[index] !== '') return; // Se a célula já estiver preenchida, não faz nada

    // Atualiza o tabuleiro
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.disabled = true;

    // Verifica se alguém ganhou
    const winner = checkWinner();
    if (winner) {
        if (winner === 'Empate') {
            status.textContent = "O jogo empatou!";
        } else {
            status.textContent = `Jogador ${winner} venceu!`;
        }
        return;
    }

    // Alterna o jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Vez do Jogador ${currentPlayer}`;
}

// Adiciona eventos de clique nas células
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Adiciona evento de clique no botão de reiniciar
resetButton.addEventListener('click', resetGame);

// Inicializa o jogo ao carregar a página
document.addEventListener('DOMContentLoaded', resetGame);
