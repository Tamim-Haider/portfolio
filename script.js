// Matrix Background Animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        drops[i]++;
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Close mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
    
    // Update URL hash
    window.location.hash = pageId;
}

// Check URL hash on load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const validPages = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
    
    if (validPages.includes(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Mobile menu toggle
document.getElementById('mobileMenuBtn').addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
});

// Typewriter effect
const typewriterText = document.querySelector('.typing-text');
const texts = [
    "Cybersecurity Enthusiast",
    "Ethical Hacker",
    "Problem Solver",
    "AI & Emerging Tech Explorer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = texts[textIndex];
    
    if (!isDeleting && charIndex < currentText.length) {
        typewriterText.textContent += currentText.charAt(charIndex);
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        typewriterText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before typing next
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
function init() {
    // Start animations
    setInterval(drawMatrix, 50);
    setTimeout(typeWriter, 1000);
    
    // Add click event to nav links for mobile
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);