import { isEscapeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const sliderBlock = form.querySelector('.effect-level');
const upload = form.querySelector('#upload-file');
const close = form.querySelector('#upload-cancel');
const img = form.querySelector('.img-upload__preview img');
const decreaseButton = form.querySelector('.scale__control--smaller');
const increaseButton = form.querySelector('.scale__control--bigger');
const scaleControl = form.querySelector('.scale__control--value');
let currentValue = Number.parseInt(scaleControl.value, 10);

const ScaleParams = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const resetEffect = () => {
  img.className = '';
  img.style.transform = '';
  img.style.filter = '';
  scaleControl.value = `${ScaleParams.MAX}%`;
  currentValue = ScaleParams.MAX;
};

const resetData = () => {
  form.reset();
  resetEffect();
  sliderBlock.classList.add('hidden');
};

const closeModal = () => {
  resetData();
  document.body.classList.remove('modal-open');
  overlay.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscPress);
  close.removeEventListener('click', closeModal);
  document.removeEventListener('click', onModalOutClick);
};

const openModal = () => {
  document.body.classList.add('modal-open');
  overlay.classList.remove('hidden');

  document.addEventListener('keydown', onModalEscPress);
  close.addEventListener('click', closeModal);
  document.addEventListener('click', onModalOutClick);
};

upload.addEventListener('click', openModal);

function onModalOutClick(evt) {
  if (evt.target === overlay) {
    closeModal();
  }
}

function onModalEscPress(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeModal();
  }
}

const decreaseScale = () => {
  if (!isNaN(currentValue)) {
    currentValue = Math.max(
      currentValue - ScaleParams.STEP,
      ScaleParams.MIN
    );
    scaleControl.value = `${currentValue}%`;
    img.style.transform = `scale(${currentValue / 100})`;
  }
};

const increaseScale = () => {
  if (!isNaN(currentValue)) {
    currentValue = Math.min(
      currentValue + ScaleParams.STEP,
      ScaleParams.MAX
    );
    scaleControl.value = `${currentValue}%`;
    img.style.transform = `scale(${currentValue / 100})`;
  }
};

decreaseButton.addEventListener('click', decreaseScale);
increaseButton.addEventListener('click', increaseScale);

export { resetData, resetEffect, form, img, sliderBlock };