const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

function moveButton() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate random position
    const randomX = Math.random() * (windowWidth - btnWidth);
    const randomY = Math.random() * (windowHeight - btnHeight);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Desktop (Mouse)
noBtn.addEventListener('mouseenter', moveButton);

// Mobile (Touch) - this prevents them from tapping it
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});

// Fallback click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});
