'use strict';
// VARIABLES
// Sections
const homePage = document.querySelector('.section-homepage');
const imgPickPage = document.querySelector('.section-image-selection');
const puzzlePage = document.querySelector('.section-puzzle');

// Buttons
const startBtn = document.querySelector('.btn--start');
const continueBtn = document.querySelector('.btn--continue');
const dropdownBtn = document.querySelector('.dropdown__btn');
const shuffleBtn = document.querySelector('.btn--shuffle');

// Slider
const slides = [...document.querySelectorAll('.slider__slide')];
let slideIndex = 0; // Start point

// Images
const imgs = [...document.querySelectorAll('.image')];
let activeImgIndex = -1;

// Shuffle / Dropdown
const puzzleBox = document.querySelector('.puzzle-box');
const dropdownBox = document.querySelector('.dropdown');
const dropdownListUl = document.querySelector('.dropdown__options');
const dropdownListLi = [...document.querySelectorAll('.dropdown__option')];
const dropdownOptionLabel = [
  ...document.querySelectorAll('.dropdown__option-label'),
];
const dropdownOptionInput = [
  ...document.querySelectorAll('.dropdown__option-input'),
];

let activeMovesAmount = -1;
let isClicked = false;
let isOpen = false;
let piecesArr;
let pieceWidth;
let pieceHeight;

// SEQUENCE
initialState();
startBtn.addEventListener('click', showImgPickPage);
handleImageClickEvents(); // returns the image that was chosen
continueBtn.addEventListener('click', showPuzzlePage);
initializeDropdown();

// INITIAL STATE
function initialState() {
  imgPickPage.style.display = 'none';
  puzzlePage.style.display = 'none';
  slide();
}

// Homepage (slider)
function slide() {
  if (slideIndex < slides.length) {
    slides[slideIndex].classList.add('slider__slide--active');
    slideIndex++;
    setTimeout(slideOut, 3500);
  }

  function slideOut() {
    if (slideIndex > 0) {
      slides[slideIndex - 1].classList.remove('slider__slide--active');
      if (slideIndex === slides.length) {
        slideIndex = 0; // Reset index to 0 when it reaches the end
      }
      setTimeout(slide, 50);
    }
  }
}

// Pick an image page
function showImgPickPage() {
  homePage.style.display = 'none';
  imgPickPage.style.display = 'flex';
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].classList.add('image-box__img');
  }
}

// Getting an index of a chosen image
function handleImageClickEvents() {
  for (const [i, img] of imgs.entries()) {
    img.addEventListener('click', function () {
      if (activeImgIndex !== i) {
        if (activeImgIndex !== -1) {
          imgs[activeImgIndex].classList.remove('image-box__img--small');
        }
        img.classList.add('image-box__img--small');
        activeImgIndex = i;
      }
      continueBtn.classList.remove('hidden');
      return activeImgIndex;
    });
  }
}

// Puzzle page
function showPuzzlePage() {
  imgPickPage.style.display = 'none';
  puzzlePage.style.display = 'flex';
  handlePuzzlePieces();
}

// Dropdown functionality
function initializeDropdown() {
  // Select Shuffle Amount - dropdown button
  dropdownBtn.addEventListener('click', function (event) {
    // By default, most events in JavaScript bubble, which means they follow the bubbling phase unless explicitly stopped.
    //For example, when you click on a button within a larger container element, the click event first reaches the button element, then travels up through its parent elements. This allows you to capture the event at various levels of the hierarchy and respond to it as needed.
    event.stopPropagation();
    isClicked = true;
    dropdownListUl.classList.toggle('hidden');
    if (activeMovesAmount !== undefined) shuffleBtn.classList.remove('hidden');
    else dropdownListLi[0].classList.add('default');
  });

  // Hiding the list items when clicked outside of the List
  puzzlePage.addEventListener('click', function (event) {
    if (isClicked) {
      dropdownListUl.classList.add('hidden');
    }
  });

  // Select Shuffle Amount - choose moves amount
  for (let i = 1; i < dropdownListLi.length; i++) {
    dropdownListLi[i].addEventListener('click', function () {
      dropdownBtn.textContent = dropdownOptionLabel[i - 1].innerHTML;
      activeMovesAmount = dropdownOptionInput[i - 1].id;
      dropdownListUl.classList.add('hidden');
      shuffleBtn.classList.remove('hidden');
    });
  }

  dropdownListUl.addEventListener('mouseover', function () {
    dropdownListLi[0].classList.remove('default');
  });
}

// Puzzle game
function createPiece(pieceWidth, pieceHeight, pieceMargin, i, j) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.style.position = 'absolute';
  piece.style.width = `${pieceWidth}px`;
  piece.style.height = `${pieceHeight}px`;
  piece.style.left = `${j * (pieceWidth + pieceMargin)}px`;
  piece.style.top = `${i * (pieceHeight + pieceMargin)}px`;
  piece.style.backgroundImage = `url(${imgs[activeImgIndex].src})`;
  piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`;
  piece.style.border = '1px solid green';
  piece.style.margin = '6.5px';
  piece.style.borderRadius = '17px';
  // + 1 to make it 1-based
  piece.dataset.row = i + 1; // row major
  piece.dataset.col = j + 1;
  return piece;
}

function initializePuzzle(puzzleBox, rows, cols, pieceMargin) {
  pieceWidth = Math.floor(
    (puzzleBox.clientWidth - 12 - (cols - 1) * pieceMargin) / cols
  );
  pieceHeight = Math.floor(
    (puzzleBox.clientHeight - 12 - (rows - 1) * pieceMargin) / rows
  );

  piecesArr = new Array(rows).fill(null).map(() => new Array(cols).fill(null));

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const piece = createPiece(pieceWidth, pieceHeight, pieceMargin, i, j);
      puzzleBox.appendChild(piece);
      // Update the puzzle board with piece positions
      piecesArr[i][j] = piece;
    }
  }

  //Set the initial empty position
  const pieceElArr = [...document.querySelectorAll('.piece')];
  pieceElArr[0].classList.add('empty');

  pieceElArr.forEach(piece => {
    piece.addEventListener('click', function () {
      const clickedRow = +piece.dataset.row;
      const clickedCol = +piece.dataset.col;
      const coords = [clickedRow, clickedCol];
    });
  });
  return piecesArr;
}

function handlePuzzlePieces() {
  const rows = 3;
  const cols = 3;
  const pieceMargin = 1.5;
  const puzzlePieces = initializePuzzle(puzzleBox, rows, cols, pieceMargin);
  console.log(puzzlePieces);
}
