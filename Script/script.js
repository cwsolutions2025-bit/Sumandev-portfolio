// ===============================
// Smooth scrolling for navigation
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close mobile menu if open
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// =====================================
// Contact Form submission (via mailto)
// =====================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:sumanbasnet2030@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // Reset form
    this.reset();
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
});

// =============================================
// Intersection Animation for Skills & Education
// =============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .education-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ================================
// Floating animation for profile image
// ================================
document.querySelector('.profile-img').classList.add('floating');

// =============================================
// My Books Fade-in + Intersection Animation
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    const bookCards = document.querySelectorAll(".book-card");
    bookCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
    });

    if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = "all 0.6s cubic-bezier(.2,.9,.3,1)";
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        bookCards.forEach(card => obs.observe(card));
    } else {
        // fallback: staggered reveal
        bookCards.forEach((card, i) => {
            setTimeout(() => {
                card.style.transition = "all 0.6s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 160);
        });
    }
});

// =============================================
// View Cover Modal for My Books Section
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("coverModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close-btn");

    // When "View Cover" button is clicked
    document.querySelectorAll(".view-cover").forEach(btn => {
        btn.addEventListener("click", () => {
            const imgSrc = btn.getAttribute("data-img");
            modalImg.src = imgSrc;
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // disable scroll when modal open
        });
    });

    // Close modal when X clicked
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // Close modal on outside click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

// =============================================
// Hamburger Menu Toggle
// =============================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking on nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }
});

// =============================================
// Theme Switching Functionality
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const colorOptions = document.querySelectorAll('.color-option');
    const body = document.body;

    // Color definitions with proper CSS variable mappings
    const colorSchemes = {
        'default': {
            primary: '#2563eb',
            primaryDark: '#1d4ed8',
            secondary: '#f97316',
            secondaryDark: '#ea580c'
        },
        'blue': {
            primary: '#3498db',
            primaryDark: '#2980b9',
            secondary: '#e74c3c',
            secondaryDark: '#c0392b'
        },
        'green': {
            primary: '#2ecc71',
            primaryDark: '#27ae60',
            secondary: '#e67e22',
            secondaryDark: '#d35400'
        },
        'purple': {
            primary: '#9b59b6',
            primaryDark: '#8e44ad',
            secondary: '#3498db',
            secondaryDark: '#2980b9'
        },
        'orange': {
            primary: '#e67e22',
            primaryDark: '#d35400',
            secondary: '#2ecc71',
            secondaryDark: '#27ae60'
        }
    };

    // Load saved theme and color
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('color') || 'default';
    
    // Apply saved theme and color
    applyTheme(savedTheme);
    applyColorScheme(savedColor);
    updateThemeIcon(savedTheme);
    setActiveColor(savedColor);

    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Color selection functionality
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            applyColorScheme(color);
            localStorage.setItem('color', color);
            setActiveColor(color);
        });
    });

    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        
        // Update theme-specific background gradients
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg-color', '#0f172a');
            document.documentElement.style.setProperty('--card-bg', '#1e293b');
            document.documentElement.style.setProperty('--text-color', '#f8fafc');
            document.documentElement.style.setProperty('--muted-text', '#94a3b8');
            document.documentElement.style.setProperty('--border-color', '#334155');
        } else {
            document.documentElement.style.setProperty('--bg-color', '#ffffff');
            document.documentElement.style.setProperty('--card-bg', '#f8fafc');
            document.documentElement.style.setProperty('--text-color', '#0f172a');
            document.documentElement.style.setProperty('--muted-text', '#64748b');
            document.documentElement.style.setProperty('--border-color', '#e2e8f0');
        }
    }

    function applyColorScheme(color) {
        const scheme = colorSchemes[color] || colorSchemes['default'];
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary', scheme.primary);
        document.documentElement.style.setProperty('--primary-dark', scheme.primaryDark);
        document.documentElement.style.setProperty('--secondary', scheme.secondary);
        document.documentElement.style.setProperty('--secondary-dark', scheme.secondaryDark);
        
        // Update body data attribute
        body.setAttribute('data-color', color);
        
        // Update theme toggle button color
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.style.background = scheme.primary;
        }
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    function setActiveColor(color) {
        colorOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-color') === color) {
                option.classList.add('active');
            }
        });
    }

    // Initialize theme toggle button color
    function initializeThemeToggle() {
        const currentColor = body.getAttribute('data-color') || 'default';
        const scheme = colorSchemes[currentColor] || colorSchemes['default'];
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.style.background = scheme.primary;
        }
    }

    // Call initialization
    initializeThemeToggle();
});

// =============================================
// Page Load Animations
// =============================================
window.addEventListener('load', function() {
    // Add loaded class to body for any post-load animations
    document.body.classList.add('loaded');
    
    // Ensure theme is properly applied after load
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('color') || 'default';
    
    document.body.setAttribute('data-theme', savedTheme);
    document.body.setAttribute('data-color', savedColor);
});

// =============================================
// Performance Optimization: Debounced Scroll Events
// =============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add subtle header background on scroll
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(30, 41, 59, 0.98)';
        }
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        if (document.body.getAttribute('data-theme') === 'dark') {
            header.style.background = 'rgba(30, 41, 59, 0.95)';
        }
    }
}, 10));
