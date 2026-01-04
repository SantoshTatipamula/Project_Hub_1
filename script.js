// Initialize Lucide icons and theme toggle behaviour
document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       Lucide Icons
    ================================ */
    lucide.createIcons();

    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');

    // Load saved theme or default to dark
    const saved = localStorage.getItem('theme');
    const defaultTheme = saved ? saved : 'dark';
    root.setAttribute('data-theme', defaultTheme);

    function updateToggleAttributes(theme) {
        if (toggle) {
            toggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
            toggle.title = theme === 'light' ? 'Switch to dark' : 'Switch to light';
        }
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
            mobileToggle.title = theme === 'light' ? 'Switch to dark' : 'Switch to light';
        }
    }
    updateToggleAttributes(defaultTheme);

    function toggleTheme() {
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateToggleAttributes(next);
    }

    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            toggleTheme();
            const off = bootstrap.Offcanvas.getInstance(
                document.getElementById('mobileSidebar')
            );
            if (off) off.hide();
        });
    }

    /* =====================================================
       ✅ SCROLL REVEAL ANIMATION (REQUIRED)
       ===================================================== */
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        obs.unobserve(entry.target); // animate once
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(el => observer.observe(el));
    }

});
