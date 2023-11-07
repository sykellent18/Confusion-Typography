// Get a reference to the 'text' element in the HTML document
const textElement = document.getElementById('text');

// The encrypted text to be revealed gradually
const encryptedText = '1infGadKmajXfVMYuWlNc0yV';

// The target text that will replace the encrypted text
const targetText = 'confusion';

// Initialize variables for animation and font weight control
let currentIndex = 1;
let removeCount = 0;
let fontWeight = 100;
let growing = true;
const growthFactor = 5;

// Function to generate a random background color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change the background color
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomColor();
}

// Function to smoothly animate the font weight change
function animateFontWeightChange(targetWeight) {
  const animationDuration = 10000;
  const startTime = performance.now();
  const startWeight = fontWeight;

  function updateFontWeight(timestamp) {
    const progress = (timestamp - startTime) / animationDuration;

    if (progress < 1) {
      fontWeight = startWeight + (targetWeight - startWeight) * progress;
      textElement.style.fontWeight = fontWeight;
      requestAnimationFrame(updateFontWeight);
    }
  }

  requestAnimationFrame(updateFontWeight);
}

// Function to continuously grow and shrink the text
function loop() {
  if (growing) {
    fontWeight += growthFactor;
  } else {
    fontWeight -= growthFactor;
  }

  if (fontWeight === 900) {
    growing = false;
  } else if (fontWeight === 100) {
    growing = true;
  }

  textElement.style.fontWeight = `${fontWeight}`;

  window.requestAnimationFrame(loop);
}

// Start the animation loop when the window is loaded
window.onload = loop;

// Listen for the first keydown event
document.addEventListener('keydown', () => {
  changeBackgroundColor(); // Change background color on first keydown

  if (currentIndex >= targetText.length) {
    if (removeCount < encryptedText.length - 1) {
      textElement.textContent = textElement.textContent.substr(0, currentIndex - 2) + textElement.textContent.substr(currentIndex);
      removeCount += 2;
    }

    if (removeCount >= encryptedText.length - 1) {
      textElement.textContent = targetText;
      animateFontWeightChange(400); // Animate the font weight to the desired value
    }
    return;
  }

  const currentChar = encryptedText[currentIndex];
  textElement.textContent = textElement.textContent.substr(0, currentIndex) + currentChar + textElement.textContent.substr(currentIndex + 0);
  currentIndex++;

  if (currentIndex >= targetText.length) {
    // All characters are revealed
  }
});

// Listen for subsequent keydown events to change the background color
document.addEventListener('keydown', changeBackgroundColor);
