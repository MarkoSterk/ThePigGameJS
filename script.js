'use strict';

//selecting elements
const winnerMsg = document.getElementById('winner-msg');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const WINNING_SCORE = 20;
let currentScore
let activePlayer
const scores = [];

const init = function() {
    //starting conditions
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');
    winnerMsg.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    btnRoll.disabled = false;
    btnHold.disabled = false;
    winnerMsg.textContent = '';
}

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//rolling dice
btnRoll.addEventListener('click', function() {
    //1. Generate random number (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1: if true, switch to next player
    if(dice !== 1){
        //Add the dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener('click', function() {
    //1. add current score to score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. check if player's score is >= 100.
    if (scores[activePlayer] >= WINNING_SCORE) {
        //Finish game
        document.querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

        document.querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

        btnRoll.disabled = true;
        btnHold.disabled = true;
        diceEl.classList.add('hidden');

        winnerMsg.textContent = `Player ${activePlayer+1} won the game!`
        winnerMsg.classList.remove('hidden');
    } else {
        //Switch to the next player
        switchPlayer();
    }
})

btnNew.addEventListener('click', function() {
    init();
})

init();