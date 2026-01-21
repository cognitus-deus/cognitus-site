// ============================================
// COGNITUS AI - WEBSITE JAVASCRIPT
// Human Wisdom. Artificial Intelligence. Amplified.
// ============================================

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================
const themeToggle = $('#theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle?.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// ============================================
// COOKIE CONSENT
// ============================================
const cookieConsent = $('#cookie-consent');
const acceptCookies = $('#accept-cookies');

// Show cookie banner if not accepted
if (!localStorage.getItem('cookies-accepted')) {
    setTimeout(() => {
        cookieConsent?.classList.add('show');
    }, 1000);
}

acceptCookies?.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    cookieConsent?.classList.remove('show');
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = $('.mobile-menu-toggle');
const navMenu = $('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu?.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', 
        mobileMenuToggle.classList.contains('active'));
});

// Close mobile menu when clicking on a link
$$('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu?.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.mobile-menu-toggle')) {
        mobileMenuToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = $('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar?.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar?.classList.contains('scroll-down')) {
        // Scroll Down
        navbar?.classList.remove('scroll-up');
        navbar?.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar?.classList.contains('scroll-down')) {
        // Scroll Up
        navbar?.classList.remove('scroll-down');
        navbar?.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = $('#back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// ROI CALCULATOR
// ============================================
const calculateBtn = $('#calculate-roi');
const numEmployees = $('#num-employees');
const hoursWasted = $('#hours-wasted');
const hourlyRate = $('#hourly-rate');
const resultWasted = $('#result-wasted');
const resultSaved = $('#result-saved');

calculateBtn?.addEventListener('click', () => {
    const employees = parseInt(numEmployees?.value || 0);
    const hours = parseInt(hoursWasted?.value || 0);
    const rate = parseInt(hourlyRate?.value || 0);
    
    // Calculate annual wasted cost
    const weeksPerYear = 52;
    const annualWasted = employees * hours * rate * weeksPerYear;
    
    // Calculate potential savings (70% recovery)
    const potentialSaved = annualWasted * 0.7;
    
    // Format numbers with commas
    resultWasted.textContent = `$${annualWasted.toLocaleString('en-US')}`;
    resultSaved.textContent = `$${potentialSaved.toLocaleString('en-US')}`;
    
    // Animate the results
    $('#calculator-result').style.animation = 'none';
    setTimeout(() => {
        $('#calculator-result').style.animation = 'fadeIn 0.5s ease';
    }, 10);
});

// ============================================
// QUIZ FUNCTIONALITY
// ============================================
let currentQuestion = 1;
let totalScore = 0;
const totalQuestions = 3;

$$('.quiz-option').forEach(option => {
    option.addEventListener('click', function() {
        const points = parseInt(this.getAttribute('data-points'));
        totalScore += points;
        
        if (currentQuestion < totalQuestions) {
            // Hide current question
            $(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('active');
            
            // Show next question
            currentQuestion++;
            $(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('active');
        } else {
            // Show results
            showQuizResults();
        }
    });
});

function showQuizResults() {
    // Hide last question
    $(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('active');
    
    // Show result section
    const resultSection = $('#quiz-result');
    resultSection.classList.add('active');
    
    // Update score
    $('#quiz-score').textContent = `${totalScore}/15`;
    
    // Update message based on score
    let message = '';
    if (totalScore <= 5) {
        message = '🚀 Tu empresa necesita urgentemente una estrategia de IA ética. Estás en el momento perfecto para comenzar esta transformación.';
    } else if (totalScore <= 10) {
        message = '💡 Tienes bases sólidas pero hay oportunidades significativas de mejora. Una implementación guiada puede maximizar tu potencial.';
    } else {
        message = '⭐ ¡Excelente! Tu empresa está bien posicionada. Un partner experto puede llevarlos al siguiente nivel de madurez en IA.';
    }
    
    $('#quiz-message').textContent = message;
}

// Quiz restart button
$('#quiz-restart')?.addEventListener('click', () => {
    currentQuestion = 1;
    totalScore = 0;
    $('#quiz-result').classList.remove('active');
    $(`.quiz-question[data-question="1"]`).classList.add('active');
});

// ============================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================
const contactForm = $('#contact-form');
const submitBtn = $('#submit-btn');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset errors
    $$('.form-error').forEach(error => error.textContent = '');
    
    // Get form values
    const formData = {
        name: $('#name')?.value.trim(),
        company: $('#company')?.value.trim(),
        email: $('#email')?.value.trim(),
        phone: $('#phone')?.value.trim(),
        hoursLost: $('#hours-lost')?.value,
        message: $('#message')?.value.trim(),
        privacy: $('#privacy')?.checked,
        honeypot: $('input[name="honeypot"]')?.value
    };
    
    // Check honeypot (bot detection)
    if (formData.honeypot) {
        console.log('Bot detected');
        return;
    }
    
    // Validate form
    let isValid = true;
    
    if (!formData.name || formData.name.length < 2) {
        showError('name', 'Por favor ingresa tu nombre completo');
        isValid = false;
    }
    
    if (!formData.company || formData.company.length < 2) {
        showError('company', 'Por favor ingresa el nombre de tu empresa');
        isValid = false;
    }
    
    if (!isValidEmail(formData.email)) {
        showError('email', 'Por favor ingresa un email válido');
        isValid = false;
    }
    
    if (!formData.hoursLost) {
        showError('hours-lost', 'Por favor selecciona una opción');
        isValid = false;
    }
    
    if (!formData.message || formData.message.length < 10) {
        showError('message', 'Por favor cuéntanos más sobre tu desafío (mínimo 10 caracteres)');
        isValid = false;
    }
    
    if (!formData.privacy) {
        showError('privacy', 'Debes aceptar la política de privacidad');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    try {
        // In production, replace this with actual form submission
        await simulateFormSubmission(formData);
        
        // Show success message
        $('#form-success').classList.add('show');
        contactForm.reset();
        
        // Track conversion (Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'Contact',
                'event_label': 'Contact Form'
            });
        }
        
        // Scroll to success message
        $('#form-success').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('Hubo un error al enviar el formulario. Por favor intenta nuevamente o escríbenos a info@cognitus-ai.com');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Enviar solicitud';
        submitBtn.disabled = false;
    }
});

function showError(fieldId, message) {
    const errorElement = $(`#${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
    const field = $(`#${fieldId}`);
    if (field) {
        field.focus();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            console.log('Form data:', data);
            resolve();
        }, 1500);
    });
}

// Real-time email validation
$('#email')?.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !isValidEmail(email)) {
        showError('email', 'Por favor ingresa un email válido');
    } else {
        $('#email-error').textContent = '';
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = $(href);
        if (target) {
            e.preventDefault();
            const navHeight = navbar?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
$$('.methodology-card, .service-card, .testimonial-card, .case-study-content, .problem-box, .solution-box').forEach(el => {
    observer.observe(el);
});

// ============================================
// GLIDER ANIMATION (Conway's Game of Life)
// ============================================
const gliderBackground = $('.glider-background');

if (gliderBackground) {
    // Create canvas for glider animation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.opacity = '0.03';
    gliderBackground.innerHTML = '';
    gliderBackground.appendChild(canvas);
    
    // Glider pattern positions (relative)
    let gliderX = 50;
    let gliderY = 50;
    const cellSize = 20;
    
    function drawGlider() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--cognitus-violet').trim();
        
        // Glider pattern
        const pattern = [
            [1, 0],
            [2, 1],
            [0, 2],
            [1, 2],
            [2, 2]
        ];
        
        pattern.forEach(([dx, dy]) => {
            ctx.fillRect(
                (gliderX + dx) * cellSize,
                (gliderY + dy) * cellSize,
                cellSize - 2,
                cellSize - 2
            );
        });
        
        // Move glider diagonally
        gliderX += 0.5;
        gliderY += 0.5;
        
        // Reset if out of bounds
        if (gliderX * cellSize > canvas.width || gliderY * cellSize > canvas.height) {
            gliderX = -5;
            gliderY = -5;
        }
    }
    
    // Animate glider
    setInterval(drawGlider, 200);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    $$('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// ANALYTICS INITIALIZATION
// ============================================

// Google Analytics 4 - Replace with your measurement ID
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with actual GA4 ID

// Track page views
gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname
});

// Track scroll depth
let scrollDepths = [25, 50, 75, 100];
let scrollTracked = [];

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
    
    scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !scrollTracked.includes(depth)) {
            scrollTracked.push(depth);
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    'event_category': 'Engagement',
                    'event_label': `${depth}%`,
                    'value': depth
                });
            }
        }
    });
});

// Track CTA clicks
$$('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'event_category': 'Engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        }
    });
});

// ============================================
// SERVICE WORKER REGISTRATION (for offline capability)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🧠 Cognitus AI', 'font-size: 24px; font-weight: bold; color: #8A2BE2;');
console.log('%cHuman Wisdom. Artificial Intelligence. Amplified.', 'font-size: 14px; color: #D4AF37;');
console.log('%c¿Interesado en cómo construimos esto? Visítanos en cognitus-ai.com', 'font-size: 12px; color: #2D3748;');