let sliderImages = document.querySelectorAll('.slide');
    arrowLeft = document.querySelector('#arrow-left');
    arrowRight = document.querySelector('#arrow-right');
    current = 0;

// Clear all images (set display: none to all images)
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display= 'none';
    }
}

// Initialize the slider by showing the first one only
function startSlide() {
    reset();
    sliderImages[0].style.display = 'block';
}

// Show previous slide
function slideLeft() {
    // 1. clear all images
    reset();
    // 2. display previous image relative to current one
    sliderImages[current - 1].style.display = 'block';
    // 3. change current value accordingly
    current--;
}

// Show next slide
function slideRight() {
    // 1. clear all images
    reset();
    // 2. display next image relative to current one
    sliderImages[current + 1].style.display = 'block';
    // 3. change current value accordingly
    current++;
}

// Left arrow click
arrowLeft.addEventListener('click', function() {
    // if first image is the current one (index 0), the current value will be set to total number of images
    // so slide left will correctly go to previous image e.g. 3 -> 2
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();
});

// Right arrow click
arrowRight.addEventListener('click', function() {
    // if last image is the current one (index 2), set current to -1 so moving right will mean current = 0
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();
});

startSlide();