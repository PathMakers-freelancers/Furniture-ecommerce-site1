// Theme Management
const themeToggles = document.querySelectorAll('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light'; // Default to light for professional look

document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcons(currentTheme);

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
});

function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Parallax Effect (JS Fallback/Enhancement)
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.hero-bg-parallax');
    if (parallax) {
        let scrollPosition = window.pageYOffset;
        // Move background slower than scroll
        parallax.style.transform = `translate3d(0, ${scrollPosition * 0.5}px, 0)`;
    }

    // Parallax for generic parallax sections if any
    document.querySelectorAll('.parallax-element').forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const offset = window.pageYOffset * speed;
        el.style.transform = `translateY(${offset}px)`;
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Counter Animation Strategy
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';

            // Clean content to get number
            const currentText = counter.innerText.replace(/[^0-9.]/g, '');
            const count = +currentText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = prefix + Math.ceil(count + inc).toLocaleString() + suffix;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = prefix + target.toLocaleString() + suffix;
            }
        };

        // Trigger when in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
};

window.addEventListener('load', animateCounters);

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksContainer.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
}

// Fade out preloader
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }
});

// Dashboard Sidebar & Menu Toggles
const dashboardToggle = document.querySelector('.volt-hamburger');
const dashboardNavOverlay = document.querySelector('.volt-nav-overlay');

// Map toggleSidebar to global scope for any inline onclicks that remain
window.toggleSidebar = function () {
    if (dashboardNavOverlay) {
        const isActive = dashboardNavOverlay.classList.toggle('active');
        const icon = dashboardToggle?.querySelector('i');
        if (icon) {
            icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
        }
    }
};

if (dashboardToggle) {
    dashboardToggle.addEventListener('click', (e) => {
        e.preventDefault();
        window.toggleSidebar();
    });
}

// Close dashboard menu on click outside
document.addEventListener('click', (e) => {
    if (dashboardNavOverlay && dashboardNavOverlay.classList.contains('active')) {
        if (!dashboardNavOverlay.contains(e.target) && dashboardToggle && !dashboardToggle.contains(e.target)) {
            window.toggleSidebar();
        }
    }
});
