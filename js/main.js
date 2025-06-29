// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .devlog-entry').forEach(el => {
    observer.observe(el);
});

// Add floating animation to particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
}

// Create particles periodically
setInterval(createParticle, 3000);

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Fixed Show All / Show One by One functionality
function initViewControls() {
    const showAllBtn = document.getElementById('show-all-btn');
    const showOneBtn = document.getElementById('show-one-btn');
    const navControls = document.getElementById('nav-controls');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSectionSpan = document.getElementById('current-section');
    
    // Get sections in the correct order
    const sections = [
        document.getElementById('what-is-pyla'),
        document.getElementById('getting-started'),
        document.getElementById('downloading'),
        document.getElementById('setup'),
        document.getElementById('starting'),
        document.getElementById('how-to-use'),
        document.getElementById('features'),
        document.getElementById('troubleshooting'),
        document.getElementById('bot-info'),
        document.getElementById('goal'),
        document.getElementById('gui'),
        document.getElementById('code')
    ];
    
    // Get navigation links
    const navLinks = document.querySelectorAll('.docs-nav a');
    
    let currentSectionIndex = 0;
    
    if (!showAllBtn || !showOneBtn || sections.length === 0) {
        return; // Exit if elements don't exist (not on docs page)
    }
    
    function updateNavigation() {
        // Update current section indicator
        if (currentSectionSpan) {
            currentSectionSpan.textContent = `${currentSectionIndex + 1} / ${sections.length}`;
        }
        
        // Update navigation buttons
        if (prevBtn) {
            prevBtn.disabled = currentSectionIndex === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = currentSectionIndex === sections.length - 1;
        }
        
        // Highlight current navigation link
        navLinks.forEach((link, index) => {
            if (index === currentSectionIndex) {
                link.classList.add('active-section');
            } else {
                link.classList.remove('active-section');
            }
        });
    }
    
    function showAllSections() {
        sections.forEach(section => {
            if (section) {
                section.classList.remove('hidden');
            }
        });
        showAllBtn.classList.add('active');
        showOneBtn.classList.remove('active');
        
        if (navControls) {
            navControls.style.display = 'none';
        }
        
        // Remove active section highlighting
        navLinks.forEach(link => {
            link.classList.remove('active-section');
        });
    }
    
    function showOneSection() {
        sections.forEach((section, index) => {
            if (section) {
                if (index === currentSectionIndex) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
        showOneBtn.classList.add('active');
        showAllBtn.classList.remove('active');
        
        if (navControls) {
            navControls.style.display = 'flex';
        }
        
        updateNavigation();
        scrollToCurrentSection();
    }
    
    function nextSection() {
        if (currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            showOneSection();
        }
    }
    
    function prevSection() {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showOneSection();
        }
    }
    
    function scrollToCurrentSection() {
        const currentSection = sections[currentSectionIndex];
        if (currentSection) {
            currentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Event listeners
    showAllBtn.addEventListener('click', showAllSections);
    showOneBtn.addEventListener('click', showOneSection);
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSection);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSection);
    }
    
    // Keyboard navigation for one-by-one mode
    document.addEventListener('keydown', (e) => {
        if (showOneBtn.classList.contains('active')) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                nextSection();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                prevSection();
            }
        }
    });
    
    // Update sidebar navigation to work with one-by-one mode
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            if (showOneBtn.classList.contains('active')) {
                e.preventDefault();
                currentSectionIndex = index;
                showOneSection();
            }
        });
    });
}

// Initialize view controls when DOM is loaded
document.addEventListener('DOMContentLoaded', initViewControls);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.style.display = 'block';
        } else {
            scrollTop.style.display = 'none';
        }
    }
});

// Discord button functionality
document.querySelectorAll('.discord-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('https://discord.gg/G6gZNyUnSg', '_blank', 'noopener,noreferrer');
    });
});

// Download button functionality - this will need to be updated with your download link
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Replace with your actual download link when available
        window.open('https://direct-link.net/1225539/AKZR1nbVFjgZ', '_blank', 'noopener,noreferrer');
    });
});
