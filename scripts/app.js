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
const imgs = [...document.querySelectorAll('.image-box__img')];
let activeImgIndex = -1;

// Shuffle / Dropdown
const puzzleCard = document.querySelector('.puzzle-card');
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
  const image = imgs[activeImgIndex];

  image.classList.remove('image-box__img--small');
  image.classList.add('puzzle-card__img');

  const numRows = 3;
  const numCols = 3;
  const imageWidth = 480;
  const divWidth = imageWidth / numCols;
  const divHeight = imageWidth / numRows;

  // Loop through each container and its corresponding image
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.width = `${divWidth}px`;
      div.style.height = `${divHeight}px`;
      div.style.left = `${j * (divWidth + 1.5)}px`;
      div.style.top = `${i * (divHeight + 1.5)}px`;
      div.style.backgroundImage = `url(${image.src})`;
      div.style.backgroundPosition = `-${j * divWidth}px -${i * divHeight}px`;
      div.style.border = '2px solid green';
      div.style.margin = '7px';
      div.style.borderRadius = '17px';
      div.style.gap = '5px';
      div.classList.add('div');
      puzzleCard.appendChild(div);
      console.log(div.classList);
    }
  }
  for (let [i, el] of Object.entries(puzzleCard)) {
    console.log(i, el);
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
