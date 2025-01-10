// Select elements
const carousel = document.querySelector('.home-carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');

let currentIndex = 0;

// Function to update carousel position
function updateCarousel() {
  const offset = -currentIndex * 100; // Calculate the translation offset
  carousel.style.transform = `translateX(${offset}%)`;
}

// Previous button functionality
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  updateCarousel();
});

// Next button functionality
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  updateCarousel();
});
