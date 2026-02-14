// 1. Get Elements
const noBtn = document.getElementById('noBtn');
const originalYesBtn = document.getElementById('yesBtn');
const questionText = document.getElementById('mainQuestion');
const music = document.getElementById('bgMusic');
const lyricsBox = document.getElementById('lyricsBox');

// 2. Read URL Parameters
const params = new URLSearchParams(window.location.search);
const qText = params.get('q') || "Will you be my Valentine?";
const yText = params.get('y') || "Yes";
const nText = params.get('n') || "No";
const type = params.get('t') || "page"; // 'page' or 'whatsapp'
const phone = params.get('p');
const waMsg = params.get('m');

// 3. Apply Text from URL
questionText.innerText = qText;
originalYesBtn.innerText = yText;
noBtn.innerText = nText;

// 4. THE SUCCESS FUNCTION (Redirects properly)
function handleSuccess() {
    if (type === 'whatsapp' && phone) {
        window.location.href = `https://wa.me/${phone}?text=${waMsg}`;
    } else {
        window.location.href = 'yes.html';
    }
}

// Add click event to the original Yes button
originalYesBtn.addEventListener('click', handleSuccess);

// 5. THE LOGIC
let noCount = 0;

function escapeAndClone() {
    noCount++;

    // --- A. GET CURRENT POSITION ---
    // We get exactly where the No button is right now on the screen
    const rect = noBtn.getBoundingClientRect();
    
    // --- B. CREATE GHOST YES BUTTON ---
    const ghostYes = document.createElement('button');
    ghostYes.innerText = yText; 
    ghostYes.classList.add('ghost-btn'); // Use the fixed style
    
    // Set it to exactly where the No button was
    ghostYes.style.left = rect.left + 'px';
    ghostYes.style.top = rect.top + 'px';
    ghostYes.style.width = rect.width + 'px'; // Match size
    ghostYes.style.height = rect.height + 'px';
    
    // IMPORTANT: Make the ghost clickable!
    ghostYes.addEventListener('click', handleSuccess);
    
    // Add to BODY (so it's not trapped in the container)
    document.body.appendChild(ghostYes);

    // --- C. TELEPORT NO BUTTON ---
    // Switch No Button to 'fixed' so it moves relative to the whole screen
    noBtn.style.position = 'fixed';

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe range (Screen Size - Button Size - 20px Padding)
    const maxX = windowWidth - btnWidth - 20;
    const maxY = windowHeight - btnHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply new position (ensure it is never negative)
    noBtn.style.left = Math.max(10, randomX) + 'px';
    noBtn.style.top = Math.max(10, randomY) + 'px';

    // --- D. CHECK FOR MUSIC (10th try) ---
    if (noCount === 10) {
        triggerTwiceMode();
    }
}

function triggerTwiceMode() {
    lyricsBox.classList.remove('hidden');
    document.body.style.backgroundColor = "#ff99aa";
    
    // Try to play music
    music.play().catch(error => {
        console.log("Autoplay blocked. User needs to interact first.");
    });
}

// --- EVENT LISTENERS ---

// Desktop: Mouse hover triggers the move
noBtn.addEventListener('mouseenter', escapeAndClone);

// Mobile: Touch triggers the move
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Stop the touch from clicking
    escapeAndClone();
});

// Fallback Click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    escapeAndClone();
});