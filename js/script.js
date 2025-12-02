// Get guest name from URL
const params = new URLSearchParams(window.location.search);
const firstName = params.get('first_name') || 'Guest';
const lastName = params.get('last_name') || '';
const fullName = lastName ? `Dear ${firstName} ${lastName}` : `Dear ${firstName}`;
document.getElementById('guestName').textContent = fullName;

// Generate stars
const container = document.getElementById('container');
for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 60 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    star.style.width = (2 + Math.random() * 2) + 'px';
    star.style.height = star.style.width;
    container.appendChild(star);
}

// Generate floating particles
for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '0';
    particle.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
    particle.style.animationDelay = Math.random() * 12 + 's';
    particle.style.animationDuration = (10 + Math.random() * 5) + 's';
    container.appendChild(particle);
}

// Animation sequence
const lantern1 = document.getElementById('lantern1');
const lantern2 = document.getElementById('lantern2');
const sparkles = document.getElementById('sparkles');
const envelope = document.getElementById('envelope');

// Start lantern animation after 500ms
setTimeout(() => {
    lantern1.classList.add('animate-1');
    lantern2.classList.add('animate-2');
}, 500);

// Show sparkles at collision (8s)
setTimeout(() => {
    // Create sparkle elements
    for (let i = 0; i < 16; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✦';
    sparkle.style.color = i % 2 === 0 ? 'hsl(40, 95%, 60%)' : 'hsl(45, 100%, 80%)';
    sparkle.style.fontSize = (15 + Math.random() * 10) + 'px';
    const angle = (i / 16) * Math.PI * 2;
    const distance = 40 + Math.random() * 30;
    sparkle.style.left = Math.cos(angle) * distance + 'px';
    sparkle.style.top = Math.sin(angle) * distance + 'px';
    sparkle.style.animationDelay = (i * 0.04) + 's';
    sparkles.appendChild(sparkle);
    }
    sparkles.classList.add('show');
    
    // Fade out lanterns
    lantern1.style.transition = 'opacity 0.8s ease';
    lantern2.style.transition = 'opacity 0.8s ease';
    lantern1.style.opacity = '0';
    lantern2.style.opacity = '0';
}, 8000);

// Show envelope (8.5s)
setTimeout(() => {
    envelope.classList.add('show');
}, 8500);

function showLetter() {
    document.getElementById('letterContainer').classList.add('show');
}

function closeLetter(e) {
    e.stopPropagation();
    document.getElementById('letterContainer').classList.remove('show');
}

// Close letter when clicking outside
document.getElementById('letterContainer').addEventListener('click', function(e) {
    if (e.target === this) {
    this.classList.remove('show');
    }
});

// Skip animation with ?skip=true
if (params.get('skip') === 'true') {
    lantern1.style.display = 'none';
    lantern2.style.display = 'none';
    envelope.classList.add('show');
    envelope.style.animation = 'none';
    envelope.style.transform = 'translate(-50%, -50%) scale(1)';
}

// Background music autoplay handling with user interaction support
function startAudio() {
    const bgMusic = document.getElementById('bgMusic');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    
    if (bgMusic) {
        bgMusic.loop = true; // Ensure loop is set
        bgMusic.volume = 1; // Set volume to full
        
        // Try to play immediately
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay succeeded
                    if (audioToggleBtn) audioToggleBtn.classList.add('active');
                })
                .catch(() => {
                    // Autoplay failed, wait for user interaction
                    addPlayOnInteractionListeners();
                });
        }
    }
}

function addPlayOnInteractionListeners() {
    const bgMusic = document.getElementById('bgMusic');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    
    const playOnInteraction = () => {
        if (bgMusic && bgMusic.paused) {
            bgMusic.loop = true;
            bgMusic.play().then(() => {
                if (audioToggleBtn) audioToggleBtn.classList.add('active');
            }).catch(err => console.log('Audio playback error:', err));
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
    };
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
}

// Audio toggle button handler
function setupAudioToggle() {
    const bgMusic = document.getElementById('bgMusic');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    
    if (!audioToggleBtn || !bgMusic) return;
    
    audioToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                audioToggleBtn.classList.remove('muted');
                audioToggleBtn.classList.add('active');
            }).catch(err => console.log('Audio playback error:', err));
        } else {
            bgMusic.pause();
            audioToggleBtn.classList.add('muted');
            audioToggleBtn.classList.remove('active');
        }
    });
    
    // Update button state when audio ends or is paused
    bgMusic.addEventListener('play', () => {
        audioToggleBtn.classList.remove('muted');
        audioToggleBtn.classList.add('active');
    });
    
    bgMusic.addEventListener('pause', () => {
        audioToggleBtn.classList.add('muted');
        audioToggleBtn.classList.remove('active');
    });
    
    // Initial state
    if (bgMusic.paused) {
        audioToggleBtn.classList.add('muted');
    } else {
        audioToggleBtn.classList.add('active');
    }
}

// Start audio after a small delay to ensure page is ready
setTimeout(() => {
    startAudio();
    setupAudioToggle();
}, 100);