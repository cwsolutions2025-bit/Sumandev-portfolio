
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Form submission with email handling
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Create mailto link with form data
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

        // Add animation to skill cards when they come into view
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

        // Floating animation for profile image
        document.querySelector('.profile-img').classList.add('floating');
// My Books fade-in + simple intersection observer for nicer load
document.addEventListener("DOMContentLoaded", () => {
    // existing scripts may be here — do not overwrite; append below
    const bookCards = document.querySelectorAll(".book-card");
    bookCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
    });

    // use IntersectionObserver if available for performance
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
        // fallback: simple staggered reveal
        bookCards.forEach((card, i) => {
            setTimeout(() => {
                card.style.transition = "all 0.6s ease";
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
            }, i * 160);
        });
    }
});
    