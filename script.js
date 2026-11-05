/**
 * Amazon Restaurant - Core Interactive Scripts
 * Mobile menu toggle, modal popups, active state management
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('nav.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            const isOpen = navLinks.classList.contains('open');
            mobileBtn.innerHTML = isOpen ? '✕' : '☰';
            mobileBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                mobileBtn.innerHTML = '☰';
            }
        });
    }

    // 2. Set current year in footer if element exists
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

/**
 * Global Popup Helper
 * @param {string} title 
 * @param {string} message 
 * @param {'success'|'error'} type 
 * @param {number|null} autoCloseTime 
 */
function showCustomPopup(title, message, type = 'success', autoCloseTime = null) {
    let existingOverlay = document.getElementById('popup-overlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
    overlay.className = 'popup-overlay';

    const icon = type === 'success' ? '✓' : '!';

    overlay.innerHTML = `
        <div class="custom-popup ${type}">
            <div class="popup-icon">${icon}</div>
            <h3>${title}</h3>
            <p>${message}</p>
            <button id="popup-btn">Dismiss</button>
        </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('popup-btn');
    closeBtn.addEventListener('click', function () {
        overlay.remove();
    });

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });

    if (autoCloseTime) {
        setTimeout(function () {
            if (overlay.parentElement) {
                overlay.remove();
            }
        }, autoCloseTime);
    }
}
