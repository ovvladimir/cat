const element = document.querySelector('#squares');
const gradient = element.querySelector('#paint'), gradient_attr = gradient.getAttribute('gradientTransform');

gradient.animate([
  // key frames
  { transform: 'translate(1525px, 257.539px) scale(525, 525)' }
], {
  // sync options
  duration: 20000,
  iterations: Infinity
})