/*
 * Create a list that holds all of your cards
 */
const images = [
  "fa fa-diamond",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-bomb"
];

const cardList = document.querySelector(".deck");

let openCards = [];
let matchingCards = [];

//Start the game
function startGame() {
  for (let i = 0; i < images.length; i++) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${images[i]}"></i>`;
    cardList.appendChild(card);
    //Add a click event to each card
    clicked(card);
  }
}

//Define the click event
let firstClick = true;
function clicked(card) {
  card.addEventListener("click", function() {
    if (firstClick) {
      startTimer();
      firstClick = false;
    }
    const currentCard = this;
    const previousCard = openCards[0];

    if (openCards.length === 1) {
      card.classList.add("open", "show", "disable");
      openCards.push(this);

      //compare the 2 cards that are open
      matched(currentCard, previousCard);
    } else {
      currentCard.classList.add("open", "show", "disable");
      openCards.push(this);
    }
  });
}
//Comparison of cards
function matched(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    //Matching
    currentCard.classList.add("match");
    previousCard.classList.add("match");
    matchingCards.push(currentCard, previousCard);
    openCards = [];
    gameOver();
  } else {
    setTimeout(function() {
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
    }, 400);
    openCards = [];
  }
  addMovement();
}

//Check if game is finished
function gameOver() {
  if (matchingCards.length === images.length) {
    stopTimer();
    alert("You Did It! Click To Restart Game");
  }
}

//Add moves
const movements = document.querySelector(".moves");
let moves = 0;
movements.innerHTML = 0;
function addMovement() {
  moves++;
  movements.innerHTML = moves;
  //change stars
  starRating();
}

const starsAmount = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsAmount.innerHTML = star + star + star;
function starRating() {
  if (moves < 10) {
    starsAmount.innerHTML = star + star + star;
  } else if (moves < 15) {
    starsAmount.innerHTML = star + star;
  } else {
    starsAmount.innerHTML = star;
  }
}

//Timer
const timerBox = document.querySelector(".timer");
let currentTimer,
  totalSeconds = 0;
timerBox.innerHTML = totalSeconds + "seconds";

function startTimer() {
  currentTimer = setInterval(function() {
    totalSeconds++;
    timerBox.innerHTML = totalSeconds + "seconds";
  }, 1000);
}
function stopTimer() {
  clearInterval(currentTimer);
}

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
  cardList.innerHTML = "";
  shuffle(images);
  startGame();
  resetGame();
});

function resetGame() {
  matchingCards = [];
  moves = 0;
  movements.innerHTML = moves;

  starsAmount.innerHTML = star + star + star;

  stopTimer();
  firstClick = true;
  totalSeconds = 0;
  timerBox.innerHTML = totalSeconds + "seconds";
}
shuffle(images);
startGame();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) */
