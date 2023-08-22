// Selección de elementos del DOM
const options = document.querySelectorAll('.option'); // Elementos de opción (piedra, papel, tijera)
const nameInput = document.getElementById('name-input'); // Campo de entrada de nombre
const nameError = document.getElementById('name-error'); // Mensaje de error de nombre
const resultMessage = document.getElementById('result-message'); // Mensaje de resultado
const playerScoreDisplay = document.getElementById('player-score'); // Marcador del jugador
const computerScoreDisplay = document.getElementById('computer-score'); // Marcador de la PC
const resetButton = document.getElementById('reset-button'); // Botón de reinicio

// Variables para el marcador y el juego
let playerScore = 0; // Puntaje del jugador
let computerScore = 0; // Puntaje de la PC

const maxAttempts = 5; // Número máximo de intentos
let currentAttempt = 0; // Intento actual
let playerWins = 0; // Victorias del jugador
let computerWins = 0; // Victorias de la PC

// Evento de reinicio del juego
resetButton.addEventListener('click', () => {
  // Restablecer todas las variables y marcadores
  playerScore = 0;
  computerScore = 0;
  currentAttempt = 0;
  playerWins = 0;
  computerWins = 0;

  resultMessage.textContent = ''; // Limpiar mensaje de resultado
  updateScores(); // Actualizar marcadores en la interfaz

  // Habilitar las opciones nuevamente para jugar
  options.forEach(option => {
    option.addEventListener('click', playRound);
  });
});

// Evento de clic en las opciones
options.forEach(option => {
  option.addEventListener('click', playRound); // Agregar función playRound al clic
});

// Función para jugar una ronda del juego
function playRound() {
  const playerName = nameInput.value;

  if (playerName.trim() === '') {
    nameError.textContent = 'Por favor, ingresa tu nombre.';
    return;
  }

  nameError.textContent = ''; // Limpiar mensaje de error de nombre

  // Verificar si el juego aún no ha terminado
  if (playerWins < maxAttempts / 2 && computerWins < maxAttempts / 2) {
    const playerChoice = this.id; // Opción elegida por el jugador
    const computerChoice = getComputerChoice(); // Opción aleatoria de la PC

    // Mostrar la elección del jugador y la PC
    resultMessage.textContent = `Elegiste ${playerChoice}. La PC eligió ${computerChoice}.`;

    const result = determineWinner(playerChoice, computerChoice); // Determinar el resultado de la ronda

    // Actualizar marcadores según el resultado
    if (result === '¡Ganaste!') {
      playerWins++;
    } else if (result === '¡Perdiste!') {
      computerWins++;
    }

    resultMessage.textContent = `${result} Elegiste ${playerChoice}. La PC eligió ${computerChoice}.`;
    updateScores(); // Actualizar marcadores en la interfaz

    currentAttempt++; // Incrementar el número de intentos

    // Verificar si se alcanzó el final del juego
    if (currentAttempt === maxAttempts) {
      if (playerWins > computerWins) {
        resultMessage.textContent = '¡Felicidades! ¡Ganaste el juego!';
      } else if (computerWins > playerWins) {
        resultMessage.textContent = '¡El PC ganó el juego! ¡Inténtalo de nuevo!';
      } else {
        resultMessage.textContent = '¡Empate! El juego terminó sin un ganador claro.';
      }

      // Deshabilitar las opciones después de completar el juego
      options.forEach(option => {
        option.removeEventListener('click', playRound);
      });
    }
  }
}

// Función para obtener la elección aleatoria de la computadora
function getComputerChoice() {
  const choices = ['piedra', 'papel', 'tijera'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Función para determinar el ganador de una ronda
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return '¡Empate!';
  } else if (
    (playerChoice === 'piedra' && computerChoice === 'tijera') ||
    (playerChoice === 'papel' && computerChoice === 'piedra') ||
    (playerChoice === 'tijera' && computerChoice === 'papel')
  ) {
    playerScore++;
    return '¡Ganaste!';
  } else {
    computerScore++;
    return '¡Perdiste!';
  }
}

// Función para actualizar los marcadores en la interfaz
function updateScores() {
  playerScoreDisplay.textContent = `Jugador: ${playerScore}`;
  computerScoreDisplay.textContent = `PC: ${computerScore}`;
}
