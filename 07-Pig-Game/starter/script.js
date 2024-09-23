'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions

let scores = [0, 0];

let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;

current0El.textContent = 0;
current1El.textContent = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    //2Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1: if true switch

    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      currentEl.textContent = currentScore; // Change later
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score to score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check if players score is <= 100
    if (scores[activePlayer] >= 20) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //If not switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  const dice = Math.trunc(Math.random() * 6) + 1;
  document.querySelector(`.player--1`).classList.remove('player--active');

  document.querySelector(`.player--0`).classList.add('player--active');

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;
  if (activePlayer === 1) activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  playing = true;
});
