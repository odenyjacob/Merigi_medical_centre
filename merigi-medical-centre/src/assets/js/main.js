/**
 * Merigi Medical Centre - Main JavaScript
 * Handles: Mobile Menu, Contact Form, and Service Modals
 */

// --- 1. Navigation & Hamburger Logic ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        hamburger.classList.toggle('toggle');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('mobile-active')) {
            navLinks.classList.remove('mobile-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// --- 2. Service Modal Data & Logic ---
const serviceData = {
    outpatient: {
        title: "Outpatient Services",
        icon: "🩺",
        text: "Our outpatient department provides quick and efficient care for non-emergency conditions. We offer general consultations, specialized clinics, and follow-up care for patients of all ages."
    },
    inpatient: {
        title: "Inpatient Services",
        icon: "🏥",
        text: "Our wards are designed to provide a healing environment. With 24/7 nursing care and modern monitoring equipment, we ensure your recovery is smooth and well-managed."
    },
    maternity: {
        title: "24/7 Maternity Care",
        icon: "👶",
        text: "We specialize in safe motherhood. Our services include Antenatal Care (ANC), skilled delivery, emergency C-sections if needed, and dedicated postnatal wards for you and your baby."
    },
    lab: {
        title: "Laboratory & Diagnostics",
        icon: "🧪",
        text: "Our lab is NEMA and KMLTTB compliant, providing accurate tests in Hematology, Biochemistry, and Parasitology to ensure correct diagnosis before treatment starts."
    },
    pharmacy: {
        title: "Qualified Pharmacy",
        icon: "💊",
        text: "We stock genuine and affordable medications. Our pharmacists are always available to explain dosage and provide counseling on your prescriptions."
    },
    imaging: {
        title: "Diagnostic Imaging Department",
        icon: "🩻",
        text: `
            <p>Our imaging department uses modern technology to provide clear insights for accurate medical decisions.</p>
            <div class="modal-list">
                <div class="list-item" style="background: #f7fafc; padding: 10px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid var(--merigi-teal);">
                    <strong>📟 Ultrasound (Sonography):</strong> 
                    Used for obstetric scans (pregnancy), abdominal, and pelvic examinations.
                </div>
                <div class="list-item" style="background: #f7fafc; padding: 10px; border-radius: 8px; margin-bottom: 8px; border-left: 4px solid var(--merigi-teal);">
                    <strong>🦴 Digital X-Ray:</strong> 
                    High-resolution imaging for fractures, chest infections, and orthopedic assessments.
                </div>
                <div class="list-item" style="background: #f7fafc; padding: 10px; border-radius: 8px; border-left: 4px solid var(--merigi-teal);">
                    <strong>📋 Specialized Scans:</strong> 
                    Targeted imaging for soft tissue injuries and internal organ health.
                </div>
            </div>`
    }
};

function openModal(serviceKey) {
    const modal = document.getElementById('serviceModal');
    const body = document.getElementById('modalBody');
    const data = serviceData[serviceKey];

    if (!data) return;

    body.innerHTML = `
        <div style="font-size: 3.5rem; text-align:center; margin-bottom:10px;">${data.icon}</div>
        <h2 style="color: #003b5c; text-align:center; margin-bottom:15px;">${data.title}</h2>
        <div style="color: #4a5568; line-height: 1.6; font-size: 1.1rem;">${data.text}</div>
        <button onclick="closeModal()" class="btn-primary" style="margin-top:20px; width:100%;">Close Details</button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Lock scroll
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

// Close modal when clicking outside the content box
window.addEventListener('click', (event) => {
    const modal = document.getElementById('serviceModal');
    if (event.target == modal) {
        closeModal();
    }
});

// --- 3. Contact Form Logic ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const submitBtn = this.querySelector('.btn-submit');
        
        // Visual feedback
        submitBtn.innerText = "Sending...";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        // Simulate server delay
        setTimeout(() => {
            alert(`Thank you, ${name}! Your message has been sent. We will contact you soon.`);
            contactForm.reset();
            submitBtn.innerText = "Send Message";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
        }, 1500);
    });
}

// --- 4. Automatic Year Update ---
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- 5. Back to Top Button Logic ---
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Show button after scrolling down 400px
    if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Creates the nice gliding effect
        });
    });
}

// --- 6. Scroll Reveal Effect ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .timeline-item').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
});