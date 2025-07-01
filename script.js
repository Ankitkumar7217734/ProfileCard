// QR code popup functionality
const qrButton = document.querySelector('.qr-button');
const qrOverlay = document.getElementById('qr-overlay');
const closeBtn = document.querySelector('.close-btn');
let isAnimating = false;

// Show QR code overlay when QR button is clicked
qrButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAnimating) return;
    
    isAnimating = true;
    qrOverlay.style.display = 'flex';
    qrOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Force reflow to trigger the animation
    void qrOverlay.offsetHeight;
    
    // Add the active class to trigger the animation
    qrOverlay.style.opacity = '1';
    
    // Reset animation state after it completes
    setTimeout(() => {
        isAnimating = false;
    }, 400);
});

// Hide QR code overlay when close button is clicked
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    hideOverlay();
});

// Close the overlay if clicked outside of the content
qrOverlay.addEventListener('click', (e) => {
    if (e.target === qrOverlay) {
        hideOverlay();
    }
});

// Also close on escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && qrOverlay.style.display === 'flex' && !isAnimating) {
        hideOverlay();
    }
});

// Function to hide overlay with animation
function hideOverlay() {
    if (isAnimating) return;
    isAnimating = true;
    
    // Start the hide animation
    qrOverlay.style.opacity = '0';
    
    // Wait for the animation to complete before hiding the element
    setTimeout(() => {
        qrOverlay.style.display = 'none';
        qrOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        isAnimating = false;
    }, 300);
}
