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
const dropdownListEl = document.querySelector('.dropdown__options');
const dropdownListItems = [...document.querySelectorAll('.dropdown__option')];
const dropdownOptionLabel = [
  ...document.querySelectorAll('.dropdown__option-label'),
];
const dropdownOptionInput = [
  ...document.querySelectorAll('.dropdown__option-input'),
];
let activeMovesAmount;
let isOpen = false;

// SEQUENCE
initialState();
startBtn.addEventListener('click', showImgPickPage);
handleImageClickEvents();
continueBtn.addEventListener('click', showPuzzlePage);

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

// Pick an image
function showImgPickPage() {
  homePage.style.display = 'none';
  imgPickPage.style.display = 'flex';
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].classList.add('image-box__img');
  }
}

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

  const activeImg = imgs[activeImgIndex];

  console.log(puzzleBox.clientHeight); // 496, 2px border from each side

  const boxWidth = puzzleBox.clientWidth - 12;
  const boxHeight = puzzleBox.clientHeight - 12;

  const rows = 3;
  const cols = 3;
  const pieceMargin = 1.5;

  const pieceWidth = Math.floor((boxWidth - (cols - 1) * pieceMargin) / cols);
  const pieceHeight = Math.floor((boxHeight - (rows - 1) * pieceMargin) / rows);

  console.log(boxWidth);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const piece = document.createElement('div');
      piece.style.position = 'absolute';
      piece.style.width = `${pieceWidth}px`;
      piece.style.height = `${pieceHeight}px`;
      piece.style.left = `${j * (pieceWidth + pieceMargin)}px`; // Include margin
      piece.style.top = `${i * (pieceHeight + pieceMargin)}px`; // Include margin
      piece.style.backgroundImage = `url(${activeImg.src})`;
      piece.style.backgroundPosition = `-${j * pieceWidth}px -${
        i * pieceHeight
      }px`;
      piece.style.border = '1px solid green';
      piece.style.margin = '6.5px';
      piece.style.borderRadius = '17px';
      puzzleBox.appendChild(piece);
      console.log(pieceWidth);
    }
  }
}

// Select Shuffle Amount
dropdownBtn.addEventListener('click', function () {
  dropdownListEl.classList.toggle('hidden');
  if (activeMovesAmount !== undefined) shuffleBtn.classList.remove('hidden');
  else dropdownListItems[0].classList.add('default');
});

dropdownListItems.forEach((el, i) => {
  el.addEventListener('click', function () {
    dropdownBtn.textContent = dropdownOptionLabel[i - 1].innerHTML;
    const chosenMoves = dropdownBtn.textContent;
    dropdownListEl.classList.add('hidden');
    shuffleBtn.classList.remove('hidden');
    activeMovesAmount = chosenMoves.replace(/\D/g, '');
  });
});

// puzzlePage.addEventListener('click', function (event) {
//   for (let input of dropdownOptionInput) {
//     if (event.target !== input) {
//
//       dropdownListEl.classList.add('hidden');
//     }
//   }
// });

dropdownListEl.addEventListener('mouseover', function () {
  dropdownListItems[0].classList.remove('default');
});
