document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const root = document.documentElement;
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Refresh icons so Sun/Moon swap correctly
        lucide.createIcons();

        // Specific fix for the mobile button text/icon color update
        const mobileBtn = document.getElementById('theme-toggle-mobile');
        if (mobileBtn) {
            if (theme === 'light') {
                mobileBtn.classList.remove('btn-outline-light');
                mobileBtn.classList.add('btn-outline-dark');
            } else {
                mobileBtn.classList.remove('btn-outline-dark');
                mobileBtn.classList.add('btn-outline-light');
            }
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggles.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            const newTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    });

    // Intersection Observer for Scroll Reveal
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 4. ADD THIS: Simple check for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            console.log("Login Form Submitted!");
            // You can add validation here later
        });
    }
});