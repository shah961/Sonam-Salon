/**
 * SANAM SALON — CORE UI & FUNCTIONALITY
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  setCurrentYear();
  initFormValidation();
  initFAQAccordion();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNav');

  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    drawer.classList.toggle('is-open');
  });

  // Close drawer when clicking nav link
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('is-open');
    });
  });
}

/* Header Scroll Background Shift */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.padding = '0';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

/* Dynamic Current Year in Footer */
function setCurrentYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* Safe Contact Form Validation & Submission */
function initFormValidation() {
  const form = document.getElementById('appointmentForm');
  const feedback = document.getElementById('formFeedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Name Validation
    const nameInput = document.getElementById('userName');
    const nameGroup = nameInput.closest('.form-group');
    if (!nameInput.value.trim()) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    // Phone Validation
    const phoneInput = document.getElementById('userPhone');
    const phoneGroup = phoneInput.closest('.form-group');
    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneGroup.classList.add('has-error');
      isValid = false;
    } else {
      phoneGroup.classList.remove('has-error');
    }

    if (isValid) {
      feedback.hidden = false;
      feedback.innerHTML = `
        <p><strong>Thank you, ${escapeHtml(nameInput.value.trim())}.</strong></p>
        <p>Your appointment enquiry has been submitted. Please call <strong>+91 98556 22091</strong> to immediately confirm your appointment time with our desk staff.</p>
      `;
      form.reset();
    }
  });
}

/* Helper to escape text */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

/* FAQ Accordion Toggle */
function initFAQAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const faqItem = btn.closest('.faq-item');
      const isOpen = faqItem.classList.contains('is-open');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('is-open');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        faqItem.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
