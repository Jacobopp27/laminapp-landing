// Device Detection
function getDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    // Android detection
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    return 'desktop';
}

// Update Download Buttons Based on Device
function updateDownloadButtons() {
    const device = getDevice();
    const appStoreButton = document.querySelector('.store-button:not(.disabled)');
    const googlePlayButton = document.querySelector('.store-button.disabled');
    const primaryButton = document.querySelector('.btn-primary[href="#download"]');
    
    // Update primary hero button
    if (primaryButton) {
        if (device === 'ios') {
            primaryButton.href = 'https://apps.apple.com/app/laminapp/id6756758592';
            primaryButton.innerHTML = '<span class="btn-icon">📱</span><span class="btn-text">Descargar en App Store</span>';
        } else if (device === 'android') {
            primaryButton.href = '#download'; // Keep scrolling since Android not ready
            primaryButton.innerHTML = '<span class="btn-icon">📱</span><span class="btn-text">Próximamente en Android</span>';
        } else {
            // Desktop - scroll to download section
            primaryButton.href = '#download';
        }
    }
    
    // Highlight appropriate store button
    if (device === 'ios' && appStoreButton) {
        appStoreButton.style.transform = 'scale(1.05)';
        appStoreButton.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
    } else if (device === 'android' && googlePlayButton) {
        // Android button disabled but highlighted
        googlePlayButton.style.opacity = '0.7';
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href === '#' || href.startsWith('#')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// Animate on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe screenshot items
    const screenshotItems = document.querySelectorAll('.screenshot-item');
    screenshotItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
}

// Handle Disabled Links
function handleDisabledLinks() {
    const disabledLinks = document.querySelectorAll('a.disabled, .store-button.disabled');
    
    disabledLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Google Play: Próximamente disponible 🎉\n\nLa versión de Android estará lista pronto. Por ahora, Laminapp está disponible en iPhone y iPad.');
        });
    });
}

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = entry.target;
                const text = target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                let current = 0;
                const increment = number / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + suffix;
                    }
                }, stepTime);
                
                target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Screenshots Carousel Auto-scroll
function initCarousel() {
    const carousel = document.querySelector('.screenshots-carousel');
    
    if (!carousel) return;
    
    let isScrolling = false;
    let scrollDirection = 1;
    
    // Auto-scroll every 3 seconds
    setInterval(() => {
        if (!isScrolling) {
            const scrollAmount = 250; // Width of one screenshot
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            
            if (carousel.scrollLeft >= maxScroll - 10) {
                scrollDirection = -1; // Scroll back
            } else if (carousel.scrollLeft <= 10) {
                scrollDirection = 1; // Scroll forward
            }
            
            carousel.scrollBy({
                left: scrollAmount * scrollDirection,
                behavior: 'smooth'
            });
        }
    }, 3000);
    
    // Pause auto-scroll on user interaction
    carousel.addEventListener('touchstart', () => {
        isScrolling = true;
    });
    
    carousel.addEventListener('touchend', () => {
        setTimeout(() => {
            isScrolling = false;
        }, 3000);
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    updateDownloadButtons();
    initSmoothScroll();
    initNavbarScroll();
    initScrollAnimations();
    handleDisabledLinks();
    animateStats();
    initCarousel();
    
    console.log('🎉 Laminapp Landing Page Loaded');
    console.log('📱 Device:', getDevice());
});

// Handle window resize
window.addEventListener('resize', () => {
    updateDownloadButtons();
});
