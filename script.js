// Particles animation - Optimized for mobile
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 25 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from accent colors
        const colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on load
window.addEventListener('load', createParticles);

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

// Skill tags interaction
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Profile pic hover effect enhancement
const profilePic = document.querySelector('.profile-pic');
const profileGlow = document.querySelector('.profile-pic-glow');

if (profilePic && profileGlow) {
    profilePic.addEventListener('mouseenter', () => {
        profileGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        profileGlow.style.opacity = '0.6';
    });
    
    profilePic.addEventListener('mouseleave', () => {
        profileGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        profileGlow.style.opacity = '0.3';
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-tag, .button, .profile-pic').forEach(el => {
    observer.observe(el);
});
