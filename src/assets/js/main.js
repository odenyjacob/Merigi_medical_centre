/**
 * Merigi Medical Centre - Core Website Logic
 * Unified & Optimized for all browsers (including Safari)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Selectors ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const backToTopBtn = document.getElementById('backToTop');
    const currentYearSpan = document.getElementById('current-year');
    const serviceModal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modalBody');
    const contactForm = document.getElementById('contactForm');

    // --- 2. Navigation & Mobile Menu ---
    if (hamburger && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('mobile-active');
            hamburger.classList.toggle('toggle');
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when clicking a link (important for mobile UX)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('mobile-active')) toggleMenu();
            });
        });
    }

    // --- 3. Optimized Back to Top (Safari Compatible) ---
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Support for all browser scroll properties
            const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollPos > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            // Standard smooth scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Safari / Edge Fallback: If behavior: 'smooth' isn't supported
            if (!('scrollBehavior' in document.documentElement.style)) {
                let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(function animateScroll() {
                        currentScroll -= currentScroll / 8;
                        window.scrollTo(0, currentScroll);
                        if (currentScroll > 1) {
                            window.requestAnimationFrame(animateScroll);
                        }
                    });
                }
            }
        });
    }

    // --- 4. Modal Logic ---
    window.openModal = function(serviceKey) {
        const data = serviceData[serviceKey];
        if (!data || !serviceModal) return;

        modalBody.innerHTML = `
            <div style="font-size: 3.5rem; text-align:center; margin-bottom:10px;">${data.icon}</div>
            <h2 style="color: #003b5c; text-align:center; margin-bottom:15px;">${data.title}</h2>
            <div style="color: #4a5568; line-height: 1.6; font-size: 1.1rem;">${data.text}</div>
            <button onclick="closeModal()" class="btn-primary" style="margin-top:25px; width:100%;">Close Details</button>
        `;
        
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    };

    window.closeModal = function() {
        if (serviceModal) {
            serviceModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Close modal on outside click or Escape key
    window.addEventListener('click', (e) => { if (e.target === serviceModal) closeModal(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // --- 5. Contact Form Submission (Formspree Integrated) ---
    if (contactForm) {
        // Create an element dynamically to show clear status messages (so we don't have to use ugly alerts)
        const statusDiv = document.createElement('div');
        statusDiv.className = 'form-status-msg';
        statusDiv.style.marginTop = '15px';
        statusDiv.style.fontWeight = '600';
        statusDiv.style.display = 'none';
        contactForm.appendChild(statusDiv);

        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Stop page reload
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerText;
            
            // UI state while processing
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            statusDiv.style.display = 'block';
            statusDiv.style.color = '#666';
            statusDiv.textContent = 'Processing your inquiry...';

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    statusDiv.style.color = 'green';
                    statusDiv.textContent = 'Thank you! Your inquiry has been sent successfully.';
                    contactForm.reset(); // Wipe fields for next entry
                } else {
                    const data = await response.json();
                    statusDiv.style.color = 'red';
                    statusDiv.textContent = data.errors ? data.errors.map(err => err.message).join(', ') : 'Oops! There was a problem submitting your form.';
                }
            } catch (error) {
                statusDiv.style.color = 'red';
                statusDiv.textContent = 'Network error. Please verify your connection and try again.';
            } finally {
                // Return button to original state
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // --- 6. Scroll Reveal Animations ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .timeline-item, .blog-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        scrollObserver.observe(el);
    });

    // --- 7. Automatic Year Update ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

// Service Data remains outside or at top
const serviceData = {
    // ... (Your existing serviceData object remains the same)
};