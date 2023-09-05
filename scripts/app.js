'use strict';
// Pages Variables
const landingPage = document.querySelector('.landing-page');
const imgPickPage = document.querySelector('.pick-image-page');

// Slider Variables
const slides = [...document.querySelectorAll('.slide')];
const startBtn = document.querySelector('.start-btn');

// Image Variables
const imgs = [...document.querySelectorAll('.img')];
let activeImgIndex = -1;

// Initial state
function init() {
  imgPickPage.style.display = 'none';
}

init();

// Slider
function slide() {
  let i = 0; // Start point

  function slideIn() {
    if (i < slides.length) {
      slides[i].classList.add('active');
      i++;
      setTimeout(slideOut, 2000);
    }
  }

  function slideOut() {
    if (i > 0) {
      slides[i - 1].classList.remove('active');
      if (i === slides.length) {
        i = 0; // Reset index to 0 when it reaches the end
      }
      setTimeout(slideIn, 500);
    }
  }

  slideIn();
}
slide();

// Pick an image
startBtn.addEventListener('click', function () {
  landingPage.style.display = 'none';
  imgPickPage.style.display = 'flex';
});

for (const [i, img] of imgs.entries()) {
  img.addEventListener('click', function () {
    if (activeImgIndex !== i) {
      if (activeImgIndex !== -1) {
        imgs[activeImgIndex].classList.remove('img-active');
      }
      console.log(activeImgIndex, img);
      img.classList.add('img-active');
      activeImgIndex = i;
    }
  });
}
