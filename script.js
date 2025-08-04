// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const targetSection = document.getElementById(target);
            
            if (targetSection) {
                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to sectiont
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for active nav states
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingNavLink = document.querySelector(`[data-target="${targetId}"]`);
                
                if (correspondingNavLink) {
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Contact Form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitButton = contactForm.querySelector('.submit-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonIcon = submitButton.querySelector('i');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showToast('Error', 'Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('Error', 'Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        buttonIcon.className = 'spinner';
        buttonText.textContent = 'Sending...';
        
        try {
            // Simulate API call (replace with actual backend endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showToast('Message Sent!', 'Thank you for your message. I\'ll get back to you soon!', 'success');
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            showToast('Error', 'Failed to send message. Please try again.', 'error');
            
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            buttonIcon.className = 'fas fa-paper-plane';
            buttonText.textContent = 'Send Message';
        }
    });
});

// Toast Notification System
function showToast(title, description, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = toast.querySelector('.toast-title');
    const toastDescription = toast.querySelector('.toast-description');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Set content
    toastTitle.textContent = title;
    toastDescription.textContent = description;
    
    // Set icon and style based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle toast-icon';
        toast.className = 'toast success';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon';
        toast.className = 'toast error';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.glow-button, .project-link-btn, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
});

//Typing effect for hero subt

document.addEventListener('DOMContentLoaded', function () {
    const typingSpan = document.querySelector('.typing-text');

    const words = ["Fullstack Developer", "Problem Solver", "Tech Enthusiast", "Keen Learner","Creative Thinker"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenWords = 1500;

    function typeEffect() {
        const currentWord = words[wordIndex];
        const currentText = currentWord.substring(0, charIndex);

        typingSpan.textContent = currentText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, deletingSpeed);
        } else {
            if (!isDeleting) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenWords);
            } else {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, typingSpeed);
            }
        }
    }

    typeEffect();
});

// Scroll progress indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #d73232ff, #5b0101ff);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
});

// Easter egg: Konami code
document.addEventListener('DOMContentLoaded', function() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    let userInput = [];
    
    document.addEventListener('keydown', function(e) {
        userInput.push(e.code);
        
        if (userInput.length > konamiCode.length) {
            userInput.shift();
        }
        
        if (userInput.join('') === konamiCode.join('')) {
            // Easter egg activated
            document.body.style.animation = 'rainbow 2s ease-in-out infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            showToast('Easter Egg!', 'You found the secret code! 🎉', 'success');
            
            setTimeout(() => {
                document.body.style.animation = '';
            }, 15000);
        }
    });
});