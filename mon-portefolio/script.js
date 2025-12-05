document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Typing Effect
    const textElement = document.querySelector('.typing-text');
    const words = ['Web', 'Mobile', 'Designer UX/UI', 'Fullstack', 'Créatif'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            formStatus.innerHTML = '';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = '<p style="color: #27c93f;"><i class="fas fa-check-circle"></i> Message envoyé avec succès !</p>';
                    contactForm.reset();
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                formStatus.innerHTML = '<p style="color: #ff5f56;"><i class="fas fa-exclamation-circle"></i> Erreur lors de l\'envoi. Veuillez réessayer.</p>';
            } finally {
                // Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Envoyer le message';
            }
        });
    }

    // Initialize Map (Lomé, Togo)
    if (document.getElementById('map')) {
        // Coordinates for Lomé, Togo
        const lomeCoords = [6.1256, 1.2223];

        // Initialize map
        const map = L.map('map').setView(lomeCoords, 13);

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        // Add custom marker with popup
        const marker = L.marker(lomeCoords).addTo(map);
        marker.bindPopup(`
            <div style="text-align: center; font-family: 'Outfit', sans-serif;">
                <strong style="color: #3b82f6; font-size: 1.1rem;">📍 Alphonse DAMESSI</strong><br>
                <span style="color: #666;">Lomé, Togo</span><br>
                <a href="https://www.google.com/maps/search/?api=1&query=6.1256,1.2223" 
                   target="_blank" 
                   style="color: #3b82f6; text-decoration: none; margin-top: 0.5rem; display: inline-block;">
                   Ouvrir dans Google Maps →
                </a>
            </div>
        `).openPopup();

        // Add circle to show area
        L.circle(lomeCoords, {
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.2,
            radius: 500
        }).addTo(map);
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
