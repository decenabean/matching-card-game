/*
  File Name: game.js
  Author: Ana Decena
  Date: 23 April 2025
  Description: javascript to make the matching card game possible

  Certification of Authenticity: I certify that this program is entirely my own work. pinky promise

  Input: User can click on cards to "flip" them for a card matching game
  Output: Display changes based on user clicks
*/
window.flipCount = 0;
var gameBoard = document.getElementById("gameBoard");

// Creates pairs of card values
var cardImages = ['images/banana.png', 'images/cherries.png', 'images/grapes.png', 'images/orange.png','images/pear.png','images/strawberries.png'];
var gameCards = [...cardImages, ...cardImages]; // duplicate for pairs

// Shuffles the array so board is different each time
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Randomize positions
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swaps elements
  }
  return array;
}

// Shuffles cards so board is new each time
gameCards = shuffle(gameCards);


// Initializes variables to track flipped cards
let flippedCards = [];
let lockBoard = false;

// Initializes variables for flip count
let flipCount = 0;
const flipDisplay = document.getElementById("flipCount");


// Creates each card
gameCards.forEach((src, index) => {
  // each card is a div that I can add children to, so I can make it look like a card
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.image = src;
  card.dataset.index = index;

  // back face (hidden)
  const back = document.createElement("div");
  back.classList.add("back");
  back.innerText = "?";

  // front face (image)
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("front");
  img.style.display = "none"; // hidden intentionally
  img.style.width = "100%";
  img.style.height = "100%";

  // Front and back are "attached" together as children of the same card parent
  card.appendChild(back);
  card.appendChild(img);

  // Handles click event
  card.addEventListener("click", handleCardClick);

  // Adds card to board
  gameBoard.appendChild(card);
});

// Function to handle click event for each card
function handleCardClick(e) {
  const card = e.currentTarget;
  
  // Don't allow clicking a card twice or if locked
  if (lockBoard || card.classList.contains("flipped")) return;

  // Show the front image, hide the back
  card.classList.add("flipped");
  card.querySelector(".front").style.display = "block";
  card.querySelector(".back").style.display = "none";

  /*
  // Increases flip count and updates display
  flipCount++;
  flipDisplay.textContent = flipCount;
  */

  function handleCardFlip() {
    window.flipCount++;
    const event = new CustomEvent('flipCountUpdated', {
      detail: window.flipCount,
    });
    window.dispatchEvent(event);
  }


  // Track the flipped card
  flippedCards.push(card);
  handleCardFlip();

  // Prevent other clicks during comparison
  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.dataset.image === second.dataset.image) {
      flippedCards = [];
      lockBoard = false;
    } else {
      // If no match, flip back
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");

        first.querySelector(".front").style.display = "none";
        second.querySelector(".front").style.display = "none";

        first.querySelector(".back").style.display = "block";
        second.querySelector(".back").style.display = "block";

        flippedCards = [];
        lockBoard = false;
      }, 500); // 0.5 second delay
    }
  }
  
  // Resets board by reloading page
  document.getElementById("reset").addEventListener("click", () => {
    location.reload();
  });
}
