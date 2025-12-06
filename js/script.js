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

// Save invitation as image using html2canvas
async function generateInvitationImage() {
    const saveBtn = document.getElementById('saveInvitationBtn');
    const originalText = saveBtn.innerHTML;
    
    try {
        // Show loading state
        saveBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle></svg>';
        saveBtn.disabled = true;
        
        // Get the letter element
        const letter = document.querySelector('.letter');
        const letterContainer = document.getElementById('letterContainer');
        
        // Temporarily show the letter if it's hidden
        const wasHidden = !letterContainer.classList.contains('show');
        if (wasHidden) {
            letterContainer.style.opacity = '0';
            letterContainer.style.pointerEvents = 'none';
            letterContainer.classList.add('show');
            // Wait for letter to render
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Create wrapper for capture with background
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            position: fixed;
            top: -10000px;
            left: -10000px;
            width: 1080px;
            padding: 120px 80px;
            background: linear-gradient(to top, hsl(275, 45%, 12%), hsl(270, 60%, 6%));
            box-sizing: border-box;
        `;
        
        // Clone the letter
        const letterClone = letter.cloneNode(true);
        letterClone.style.transform = 'scale(1) rotate(0deg)';
        letterClone.style.opacity = '1';
        letterClone.style.maxWidth = '100%';
        letterClone.style.width = '100%';
        letterClone.style.margin = '0 auto';
        
        // Remove close button from clone
        const closeBtn = letterClone.querySelector('.close-btn');
        if (closeBtn) closeBtn.remove();
        
        // Add stars to wrapper
        const starsHTML = [];
        for (let i = 0; i < 50; i++) {
            const size = 2 + Math.random() * 2;
            starsHTML.push(`
                <div style="
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: hsl(45, 100%, 95%);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: ${0.3 + Math.random() * 0.7};
                "></div>
            `);
        }
        wrapper.innerHTML = starsHTML.join('');
        wrapper.appendChild(letterClone);
        
        document.body.appendChild(wrapper);
        
        // Capture with html2canvas
        const canvas = await html2canvas(wrapper, {
            scale: 2,
            backgroundColor: null,
            logging: false,
            useCORS: true,
            allowTaint: true
        });
        
        // Clean up
        document.body.removeChild(wrapper);
        if (wasHidden) {
            letterContainer.classList.remove('show');
            letterContainer.style.opacity = '';
            letterContainer.style.pointerEvents = '';
        }
        
        // Convert to blob and download
        canvas.toBlob(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Engagement-Invitation-${firstName}${lastName ? '-' + lastName : ''}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            // Reset button
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
        }, 'image/png');
        
    } catch (error) {
        console.error('Error generating invitation:', error);
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
        alert('Sorry, there was an error generating the invitation image. Please try again.');
    }
}

// Add spin animation for loading state
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Add event listener to save button
const saveBtn = document.getElementById('saveInvitationBtn');
if (saveBtn) {
    saveBtn.addEventListener('click', generateInvitationImage);
}