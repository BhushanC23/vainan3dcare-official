/**
 * VAINAN 3D CARE PVT LTD — Master Frontend Scripts
 * Optimized for Modern Mobile UX & Responsive Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle & Touch UX
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  function openMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  // Close drawer when any nav link is tapped
  if (mobileDrawer) {
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // 2. Mobile Floating Bottom Action Bar (Dynamic Injection if not in HTML)
  if (!document.querySelector('.mobile-bottom-bar')) {
    const currentPath = window.location.pathname;
    const isPricing = currentPath.includes('pricing.html');
    const isContact = currentPath.includes('contact.html');

    const bottomBar = document.createElement('nav');
    bottomBar.className = 'mobile-bottom-bar';
    bottomBar.setAttribute('aria-label', 'Mobile Quick Actions');
    bottomBar.innerHTML = `
      <a href="tel:+919146712371" class="mobile-bottom-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span>Call Lab</span>
      </a>
      <a href="https://wa.me/919146712371?text=Hello%20VAINAN%203D%20CARE%2C%20I%20would%20like%20to%20inquire%20about%20dental%20manufacturing%20services." target="_blank" rel="noopener" class="mobile-bottom-action">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span>WhatsApp</span>
      </a>
      <a href="contact.html#order-form" class="mobile-bottom-action ${isContact ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        <span>Order Rx</span>
      </a>
      <a href="pricing.html" class="mobile-bottom-action featured-action ${isPricing ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
        <span>Rate List</span>
      </a>
    `;
    document.body.appendChild(bottomBar);
  }

  // 3. Back to Top Button
  if (!document.querySelector('.back-to-top')) {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Mobile Table Swipe Hints (on pages with .table-responsive)
  const tableResponsives = document.querySelectorAll('.table-responsive');
  if (tableResponsives.length > 0) {
    tableResponsives.forEach(tableBox => {
      if (!tableBox.previousElementSibling || !tableBox.previousElementSibling.classList.contains('mobile-table-hint')) {
        const hint = document.createElement('div');
        hint.className = 'mobile-table-hint';
        hint.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <span>Swipe table horizontally to compare specifications, warranty & rates &rarr;</span>
        `;
        tableBox.parentNode.insertBefore(hint, tableBox);
      }
    });
  }

  // 5. Pricing Category Filter Tabs (on pricing.html)
  const categoryTabBtns = document.querySelectorAll('.category-tab-btn');
  const pricingCards = document.querySelectorAll('.pricing-table-card');

  if (categoryTabBtns.length > 0 && pricingCards.length > 0) {
    categoryTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');

        pricingCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });

        // Smoothly scroll to the first visible card on mobile
        if (window.innerWidth < 768) {
          const firstVisible = Array.from(pricingCards).find(c => c.style.display !== 'none');
          if (firstVisible) {
            firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // 6. Pricing Search Filter
  const priceSearchInput = document.getElementById('priceSearchInput');
  if (priceSearchInput) {
    priceSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      pricingCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 7. Contact Form Feedback Simulation
  const contactForm = document.getElementById('inquiryContactForm');
  const formFeedback = document.getElementById('contactFormFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING...';
      }

      setTimeout(() => {
        formFeedback.style.display = 'block';
        formFeedback.className = 'table-note-box';
        formFeedback.style.backgroundColor = '#EBF7F4';
        formFeedback.style.borderLeftColor = '#1FA88C';
        formFeedback.style.color = '#0F6352';
        formFeedback.innerHTML = '<strong>Inquiry Sent:</strong> Thank you for reaching out to Vainan 3D Care. A technical representative will review your request and contact you within business hours.';
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'SUBMIT INQUIRY';
        }
      }, 700);
    });
  }
});
