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

// Save invitation as image
function generateInvitationImage() {
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = 1600;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'hsl(275, 45%, 12%)');
    gradient.addColorStop(1, 'hsl(270, 60%, 6%)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars
    drawStars(ctx, width, height);
    
    // Draw floating lanterns in background
    drawBackgroundLanterns(ctx, width, height);
    
    // Draw letter
    drawLetter(ctx, width, height);
    
    // Convert canvas to blob and download
    canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Engagement-Invitation-${firstName}${lastName ? '-' + lastName : ''}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

function drawStars(ctx, width, height) {
    ctx.fillStyle = 'hsl(45, 100%, 95%)';
    // Generate 60 stars similar to the page
    for (let i = 0; i < 60; i++) {
        const x = Math.random() * width;
        const y = Math.random() * (height * 0.6);
        const size = 2 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawBackgroundLanterns(ctx, width, height) {
    const lanternPositions = [
        { x: 0.05, y: 0.85, size: 40 },
        { x: 0.12, y: 0.8, size: 35 },
        { x: 0.22, y: 0.88, size: 45 },
        { x: 0.72, y: 0.8, size: 38 },
        { x: 0.82, y: 0.85, size: 42 },
        { x: 0.92, y: 0.75, size: 36 },
        { x: 0.4, y: 0.9, size: 44 },
        { x: 0.65, y: 0.85, size: 39 },
        { x: 0.8, y: 0.92, size: 41 },
        { x: 0.35, y: 0.8, size: 37 }
    ];
    
    lanternPositions.forEach(pos => {
        drawSimpleLantern(ctx, pos.x * width, pos.y * height, pos.size, 0.35);
    });
}

function drawSimpleLantern(ctx, x, y, size, opacity) {
    ctx.globalAlpha = opacity;
    
    // Glow effect
    const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 1.8);
    glowGradient.addColorStop(0, 'hsla(45, 100%, 90%, 0.8)');
    glowGradient.addColorStop(0.4, 'hsla(40, 95%, 75%, 0.6)');
    glowGradient.addColorStop(1, 'hsla(25, 90%, 35%, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.ellipse(x, y, size * 1.8, size * 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Main lantern body
    ctx.fillStyle = 'hsl(35, 80%, 60%)';
    ctx.fillRect(x - size / 2, y - size, size, size * 1.6);
    
    // Inner light
    ctx.fillStyle = 'hsla(45, 100%, 85%, 0.7)';
    ctx.fillRect(x - size / 2 + 4, y - size + 4, size - 8, size * 1.6 - 8);
    
    ctx.globalAlpha = 1;
}

function drawLetter(ctx, width, height) {
    const letterWidth = 680;
    const letterHeight = 880;
    const letterX = (width - letterWidth) / 2;
    const letterY = (height - letterHeight) / 2;
    
    // Letter background with gradient
    const letterGradient = ctx.createLinearGradient(letterX, letterY, letterX + letterWidth, letterY + letterHeight);
    letterGradient.addColorStop(0, 'hsl(35, 60%, 78%)');
    letterGradient.addColorStop(0.25, 'hsl(30, 55%, 72%)');
    letterGradient.addColorStop(0.5, 'hsl(35, 50%, 68%)');
    letterGradient.addColorStop(0.75, 'hsl(30, 45%, 64%)');
    letterGradient.addColorStop(1, 'hsl(35, 40%, 60%)');
    
    ctx.fillStyle = letterGradient;
    ctx.beginPath();
    ctx.roundRect(letterX, letterY, letterWidth, letterHeight, [12]);
    ctx.fill();
    
    // Letter border shadow
    ctx.strokeStyle = 'hsla(30, 40%, 50%, 0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(letterX, letterY, letterWidth, letterHeight, [12]);
    ctx.stroke();
    
    // Draw ribbon at top
    drawRibbon(ctx, width / 2, letterY + 20, 80);
    
    // Draw decorative top border
    drawTopBorder(ctx, letterX + 40, letterY + 60, letterWidth - 80);
    
    // Draw decorative bottom border
    drawBottomBorder(ctx, letterX + 40, letterY + letterHeight - 60, letterWidth - 80);
    
    // Draw left and right accents
    drawSideAccents(ctx, letterX + 30, letterY + 90, letterHeight - 180);
    
    // Draw sun symbol
    drawSunSymbol(ctx, width / 2, letterY + 110, 48);
    
    // Draw title
    ctx.font = 'bold 64px "Rapunzel", "Great Vibes", cursive';
    ctx.fillStyle = 'hsl(275, 60%, 28%)';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'hsla(275, 50%, 20%, 0.35)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillText("You're Invited", width / 2, letterY + 190);
    ctx.shadowColor = 'transparent';
    
    // Draw guest name
    ctx.font = 'italic 46px "Rapunzel", "Great Vibes", cursive';
    ctx.fillStyle = 'hsl(275, 50%, 38%)';
    ctx.shadowColor = 'hsla(275, 50%, 25%, 0.15)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.fillText(`Dear ${firstName}${lastName ? ' ' + lastName : ''}`, width / 2, letterY + 260);
    ctx.shadowColor = 'transparent';
    
    // Draw message - with better formatting
    ctx.font = '20px "Cormorant Garamond", serif';
    ctx.fillStyle = 'hsl(30, 40%, 25%)';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    
    // First line of message
    const line1 = "At last we see the light, and it's leading us to forever.";
    ctx.fillText(line1, width / 2, letterY + 330);
    
    // Blank line spacing
    // Second part of message
    const line2a = "We invite you to celebrate our engagement as we begin";
    const line2b = "this magical new chapter together.";
    ctx.fillText(line2a, width / 2, letterY + 390);
    ctx.fillText(line2b, width / 2, letterY + 420);
    
    // Draw details section with styling
    ctx.font = '22px "Rapunzel", "Cormorant Garamond", serif';
    ctx.fillStyle = 'hsl(30, 35%, 30%)';
    ctx.letterSpacing = '0.02em';
    ctx.fillText('Save the Date', width / 2, letterY + 520);
    
    // Draw location as a styled element
    ctx.font = 'bold 22px "Rapunzel", "Cormorant Garamond", serif';
    ctx.fillStyle = 'hsl(275, 55%, 42%)';
    ctx.fillText('Location', width / 2, letterY + 580);
    
    // Reset text align
    ctx.textAlign = 'left';
    ctx.shadowColor = 'transparent';
    
    // Draw decorative flowers
    drawFlowerImproved(ctx, letterX + 50, letterY + letterHeight - 80, 'hsl(275, 60%, 70%)');
    drawFlowerImproved(ctx, letterX + letterWidth - 50, letterY + letterHeight - 80, 'hsl(275, 60%, 70%)');
}

function drawRibbon(ctx, x, y, width) {
    // Shadow
    ctx.fillStyle = 'hsla(275, 50%, 35%, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + 3, width / 2 + 2, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Main ribbon
    ctx.fillStyle = 'hsl(275, 55%, 50%)';
    ctx.beginPath();
    ctx.ellipse(x, y, width / 2, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'hsl(275, 65%, 65%)';
    ctx.fillRect(x - width / 4, y - 4, width / 2, 4);
}

function drawTopBorder(ctx, x, y, width) {
    ctx.strokeStyle = 'hsl(275, 50%, 60%)';
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    const steps = 16;
    for (let i = 0; i < steps; i++) {
        const px = x + (width / steps) * i;
        const py = y + (i % 2 === 0 ? -12 : 12);
        ctx.lineTo(px, py);
    }
    ctx.lineTo(x + width, y);
    ctx.stroke();
    
    // Draw decorative dots along border
    ctx.fillStyle = 'hsl(275, 60%, 70%)';
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 6; i++) {
        const dotX = x + (width / 5) * i;
        ctx.beginPath();
        ctx.arc(dotX, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawBottomBorder(ctx, x, y, width) {
    ctx.strokeStyle = 'hsl(275, 50%, 60%)';
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    const steps = 16;
    for (let i = 0; i < steps; i++) {
        const px = x + (width / steps) * i;
        const py = y + (i % 2 === 0 ? 12 : -12);
        ctx.lineTo(px, py);
    }
    ctx.lineTo(x + width, y);
    ctx.stroke();
    
    // Draw decorative dots along border
    ctx.fillStyle = 'hsl(275, 60%, 70%)';
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 6; i++) {
        const dotX = x + (width / 5) * i;
        ctx.beginPath();
        ctx.arc(dotX, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

function drawSideAccents(ctx, x, y, height) {
    ctx.strokeStyle = 'hsl(275, 50%, 60%)';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.5;
    
    // Left side
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 0; i < 4; i++) {
        const py = y + (height / 4) * i;
        ctx.lineTo(x, py);
    }
    ctx.stroke();
    
    // Right side
    ctx.beginPath();
    ctx.moveTo(x + 30, y);
    for (let i = 0; i < 4; i++) {
        const py = y + (height / 4) * i;
        ctx.lineTo(x + 30, py);
    }
    ctx.stroke();
    
    ctx.globalAlpha = 1;
}

function drawSunSymbol(ctx, x, y, size) {
    // Outer glow
    ctx.fillStyle = 'hsla(40, 90%, 60%, 0.2)';
    ctx.beginPath();
    ctx.arc(x, y, size + 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Center circle - gradient
    const sunGradient = ctx.createRadialGradient(x - 5, y - 5, 0, x, y, size / 2);
    sunGradient.addColorStop(0, 'hsl(45, 100%, 70%)');
    sunGradient.addColorStop(0.7, 'hsl(40, 90%, 55%)');
    sunGradient.addColorStop(1, 'hsl(35, 85%, 45%)');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Rays
    ctx.strokeStyle = 'hsl(40, 85%, 50%)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = x + Math.cos(angle) * (size / 2 + 6);
        const y1 = y + Math.sin(angle) * (size / 2 + 6);
        const x2 = x + Math.cos(angle) * (size / 2 + 18);
        const y2 = y + Math.sin(angle) * (size / 2 + 18);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Inner highlight
    ctx.fillStyle = 'hsl(45, 100%, 75%)';
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, size / 4, 0, Math.PI * 2);
    ctx.fill();
}

function drawFlowerImproved(ctx, x, y, petalColor) {
    const petalSize = 7;
    ctx.fillStyle = petalColor;
    
    // Draw 5 petals with better shape
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const px = x + Math.cos(angle) * 11;
        const py = y + Math.sin(angle) * 11;
        
        // Petal glow
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = petalColor;
        ctx.beginPath();
        ctx.ellipse(px, py, petalSize * 1.3, petalSize * 1.5, angle, 0, Math.PI * 2);
        ctx.fill();
        
        // Petal
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = petalColor;
        ctx.beginPath();
        ctx.arc(px, py, petalSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Center
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'hsl(45, 85%, 60%)';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Center highlight
    ctx.fillStyle = 'hsl(45, 95%, 75%)';
    ctx.beginPath();
    ctx.arc(x - 1.5, y - 1.5, 2, 0, Math.PI * 2);
    ctx.fill();
}

// Add event listener to save button
const saveBtn = document.getElementById('saveInvitationBtn');
if (saveBtn) {
    saveBtn.addEventListener('click', generateInvitationImage);
}