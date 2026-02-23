// ===================================
// Typing Animation for Hero Section
// ===================================

const typingTexts = [
    "Aspiring Full Stack Developer",
    "Java & MongoDB Enthusiast",
    "UI/UX Designer",
    "Problem Solver"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!isDeleting) {
        // Typing
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            // Pause at end
            isDeleting = true;
            typingDelay = 2000;
        } else {
            typingDelay = 100;
        }
    } else {
        // Deleting
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingDelay = 500;
        } else {
            typingDelay = 50;
        }
    }
    
    setTimeout(typeText, typingDelay);
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeText, 1000);
});

// ===================================
// jQuery Smooth Scrolling
// ===================================

$(document).ready(function() {
    
    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
            
            // Close mobile menu after clicking
            $('.navbar-collapse').collapse('hide');
        }
    });
    
    // ===================================
    // Navbar Background on Scroll
    // ===================================
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
    
    // ===================================
    // Animate Progress Bars on Scroll
    // ===================================
    
    function animateProgressBars() {
        $('.progress-fill').each(function() {
            const progressBar = $(this);
            const progressValue = progressBar.data('progress');
            const elementTop = progressBar.offset().top;
            const elementBottom = elementTop + progressBar.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                if (!progressBar.hasClass('animated')) {
                    progressBar.css('width', progressValue + '%');
                    progressBar.addClass('animated');
                }
            }
        });
    }
    
    // Run on scroll
    $(window).on('scroll', animateProgressBars);
    
    // Run on load
    animateProgressBars();
    
    // ===================================
    // Fade In Elements on Scroll
    // ===================================
    
    function fadeInElements() {
        $('.glass-card').each(function() {
            const element = $(this);
            const elementTop = element.offset().top;
            const elementBottom = elementTop + element.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                element.css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }
    
    // Set initial state
    $('.glass-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });
    
    $(window).on('scroll', fadeInElements);
    fadeInElements();
    
    // ===================================
    // Active Navigation Link
    // ===================================
    
    $(window).on('scroll', function() {
        const scrollPos = $(document).scrollTop() + 100;
        
        $('section').each(function() {
            const currSection = $(this);
            const sectionTop = currSection.offset().top;
            const sectionHeight = currSection.height();
            const sectionId = currSection.attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });
    
    // ===================================
// Form Validation and WhatsApp Submission
// ===================================

$('#contactForm').on('submit', function(e) {
    e.preventDefault();

    // Reset messages
    $('.error-message').hide();
    $('#successMessage').hide();

    let isValid = true;

    const name = $('#name').val().trim();
    const email = $('#email').val().trim();
    const subject = $('#subject').val().trim();
    const message = $('#message').val().trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name Validation
    if (name === '') {
        $('#nameError').text('Please enter your name').show();
        isValid = false;
    } else if (name.length < 2) {
        $('#nameError').text('Name must be at least 2 characters').show();
        isValid = false;
    }

    // Email Validation
    if (email === '') {
        $('#emailError').text('Please enter your email').show();
        isValid = false;
    } else if (!emailRegex.test(email)) {
        $('#emailError').text('Please enter a valid email address').show();
        isValid = false;
    }

    // Subject Validation
    if (subject === '') {
        $('#subjectError').text('Please enter a subject').show();
        isValid = false;
    } else if (subject.length < 3) {
        $('#subjectError').text('Subject must be at least 3 characters').show();
        isValid = false;
    }

    // Message Validation
    if (message === '') {
        $('#messageError').text('Please enter your message').show();
        isValid = false;
    } else if (message.length < 10) {
        $('#messageError').text('Message must be at least 10 characters').show();
        isValid = false;
    }

    // If valid → Send to WhatsApp
    if (isValid) {

        const whatsappMessage = encodeURIComponent(
`New Contact Form Message:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`
        );

        const phoneNumber = "916381315310";

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

        window.open(whatsappURL, "_blank");

        $('#contactForm')[0].reset();

        $('#successMessage')
            .text('Redirecting to WhatsApp...')
            .fadeIn();

        setTimeout(function() {
            $('#successMessage').fadeOut();
        }, 4000);
    }
});
    // ===================================
    // Parallax Effect for Hero Section
    // ===================================
    
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    });
    
    // ===================================
    // Add Glow Effect on Mouse Move
    // ===================================
    
    $('.glass-card').on('mousemove', function(e) {
        const card = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.css({
            '--mouse-x': x + 'px',
            '--mouse-y': y + 'px'
        });
    });
    
    // ===================================
    // Counter Animation for Stats (Optional Enhancement)
    // ===================================
    
    function animateCounter(element, start, end, duration) {
        let current = start;
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        
        const timer = setInterval(function() {
            current += increment;
            element.textContent = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    // ===================================
    // Preloader (Optional)
    // ===================================
    
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });
    
    // ===================================
    // Back to Top Button (Optional Enhancement)
    // ===================================
    
    // Create back to top button
    $('body').append('<button id="backToTop" class="back-to-top"><i class="fas fa-arrow-up"></i></button>');
    
    // Add styles
    const style = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ff2d75, #ff6b9d);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(255, 45, 117, 0.5);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(255, 45, 117, 0.7);
        }
    `;
    
    $('<style>').text(style).appendTo('head');
    
    // Show/hide back to top button
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });
    
    // Scroll to top on click
    $('#backToTop').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
});

// ===================================
// Vanilla JavaScript for Additional Features
// ===================================

// Add random floating particles (optional visual enhancement)
document.addEventListener('DOMContentLoaded', function() {
    
    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    
    document.body.insertBefore(particlesContainer, document.body.firstChild);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 45, 117, 0.8), transparent);
            border-radius: 50%;
            left: ${left}%;
            bottom: -10px;
            animation: float-up ${duration}s ${delay}s infinite ease-in;
            opacity: 0.5;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-up {
            0% {
                bottom: -10px;
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            100% {
                bottom: 110%;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
});

// ===================================
// Console Message
// ===================================

console.log('%c Welcome to Sneha R\'s Portfolio! ', 'background: linear-gradient(135deg, #ff2d75, #ff6b9d); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Built with HTML, CSS, Bootstrap & JavaScript ', 'color: #ff2d75; font-size: 14px;');