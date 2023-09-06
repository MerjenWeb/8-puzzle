'use strict';
// Pages Variables
const landingPage = document.querySelector('.landing-page');
const imgPickPage = document.querySelector('.pick-image-page');
const puzzlePage = document.querySelector('.puzzle-page');

// Buttons
const startBtn = document.querySelector('.start-btn');
const continueBtn = document.querySelector('.continue-btn');
const dropdownBtn = document.querySelector('.dropdown-btn');
const shuffleBtn = document.querySelector('.start-shuffle-btn');

// Slider Variables
const slides = [...document.querySelectorAll('.slide')];
let slideIndex = 0; // Start point

// Image Variables
const imgs = [...document.querySelectorAll('.img')];
let activeImgIndex = -1;

// Shuffle Variables
const puzzleCard = document.querySelector('.puzzle-card');
const options = document.querySelector('.options');
const optionElements = [...document.querySelectorAll('.option')];
let activeMovesAmount;
let isOpen = false;

// Initial state
function initialState() {
  imgPickPage.style.display = 'none';
  continueBtn.style.display = 'none';
  puzzlePage.style.display = 'none';
  slide();
}

// Landing page (slider)
function slide() {
  if (slideIndex < slides.length) {
    slides[slideIndex].classList.add('active');
    slideIndex++;
    setTimeout(slideOut, 2500);
  }
}

function slideOut() {
  if (slideIndex > 0) {
    slides[slideIndex - 1].classList.remove('active');
    if (slideIndex === slides.length) {
      slideIndex = 0; // Reset index to 0 when it reaches the end
    }
    setTimeout(slide, 500);
  }
}

// Pick an image
function showImagePickPage() {
  landingPage.style.display = 'none';
  imgPickPage.style.display = 'flex';
}

function handleImageClickEvents() {
  for (const [i, img] of imgs.entries()) {
    img.addEventListener('click', function () {
      if (activeImgIndex !== i) {
        if (activeImgIndex !== -1) {
          imgs[activeImgIndex].classList.remove('img-active');
        }
        img.classList.add('img-active');
        activeImgIndex = i;
      }
      continueBtn.style.display = 'block';
      return activeImgIndex;
    });
  }
}

function showPuzzlePage() {
  imgPickPage.style.display = 'none';
  puzzlePage.style.display = 'flex';
  imgs[activeImgIndex].classList.remove('img-active');
  imgs[activeImgIndex].classList.add('shuffle-img');
  puzzleCard.insertAdjacentElement('beforeend', imgs[activeImgIndex]);
}

// Sequence
initialState();
startBtn.addEventListener('click', showImagePickPage);
handleImageClickEvents();
continueBtn.addEventListener('click', showPuzzlePage);

// Select Shuffle Amount
dropdownBtn.addEventListener('click', function () {
  options.classList.toggle('display-none');
});

// Continue working from here
optionElements.forEach((el, i) => {
  el.addEventListener('click', function () {
    optionElements.map(el => {
      el.classList.remove('chosen-default');
    });
    if (!el.classList.contains('chosen-default')) {
      el.classList.toggle('chosen-option');
      activeMovesAmount = el.textContent.replace(/\D/g, '');
      options.classList.add('display-none');
      shuffleBtn.classList.remove('display-none');
    }

    console.log(activeMovesAmount);
  });
});

// the user clicks on element and to that element we add - element[activeMovesAmount].classList.add('chosen-option')
// if the user clicks on the different one - then element[activeMovesAmount].classList.add('chosen-option')
// So there is only one activeMovesAmount
