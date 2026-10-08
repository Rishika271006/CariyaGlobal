/**
 * CARIYA GLOBAL - Interactive Scripts
 * Handles WhatsApp Lead Routing, Mobile Nav Drawer, Header Scroll, FAQs & Year
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update Copyright Year
  const yearEls = document.querySelectorAll('#year, .current-year');
  const currYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currYear);

  // Sticky Header On Scroll
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Drawer Navigation
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (navToggle) navToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  // Submenu Accordions in Mobile Drawer
  const drawerSubmenuToggles = document.querySelectorAll('.drawer-nav-item.has-children > .drawer-nav-link');
  drawerSubmenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.drawer-nav-item');
      if (parent) {
        parent.classList.toggle('open');
        const chevron = toggle.querySelector('.chevron');
        if (chevron) {
          chevron.style.transform = parent.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // WhatsApp Lead Generation Form Handler
  const leadForms = document.querySelectorAll('.lead-form, .wa-lead-form, form[data-whatsapp]');
  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="waName"], input[name="name"]');
      const phoneInput = form.querySelector('input[name="waPhone"], input[name="phone"]');
      const courseInput = form.querySelector('select[name="waCourse"], select[name="interest"], select[name="course"]');
      const msgInput = form.querySelector('textarea[name="message"]');

      const name = nameInput ? nameInput.value.trim() : 'Prospective Student';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const course = courseInput ? courseInput.value : 'General Enquiry';
      const message = msgInput ? msgInput.value.trim() : '';

      let text = `Hello CARIYA Global!%0A%0A*Name:* ${encodeURIComponent(name)}`;
      if (phone) text += `%0A*Phone:* ${encodeURIComponent(phone)}`;
      if (course) text += `%0A*Course / Interest:* ${encodeURIComponent(course)}`;
      if (message) text += `%0A*Message:* ${encodeURIComponent(message)}`;
      text += `%0A%0APlease provide guidance regarding admissions, courses, and internship pathways across Asia.`;

      const targetNumber = '919115511250';
      const waUrl = `https://wa.me/${targetNumber}?text=${text}`;

      // Show friendly confirmation toast before opening
      showToast('Opening WhatsApp with your enquiry...', 'success');

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 300);
    });
  });

  // Contact Form fallback
  const contactForms = document.querySelectorAll('.contact-form:not([data-whatsapp])');
  contactForms.forEach(cForm => {
    cForm.addEventListener('submit', (e) => {
      const waCourse = cForm.querySelector('select[name="interest"]');
      if (waCourse) {
        e.preventDefault();
        const name = cForm.querySelector('input[name="name"]')?.value || '';
        const email = cForm.querySelector('input[name="email"]')?.value || '';
        const phone = cForm.querySelector('input[name="phone"]')?.value || '';
        const interest = waCourse.value || '';
        const msg = cForm.querySelector('textarea[name="message"]')?.value || '';

        let text = `Hello CARIYA Global!%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Interest:* ${encodeURIComponent(interest)}%0A*Message:* ${encodeURIComponent(msg)}`;
        const waUrl = `https://wa.me/919115511250?text=${text}`;
        showToast('Connecting you directly via WhatsApp...', 'success');
        setTimeout(() => window.open(waUrl, '_blank'), 400);
      }
    });
  });

  // Simple Toast UI
  function showToast(message, type = 'info') {
    let toast = document.querySelector('.cariya-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cariya-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: #0B2545;
        color: #fff;
        padding: 12px 24px;
        border-radius: 999px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        border: 1px solid rgba(255,255,255,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s;
        opacity: 0;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 3200);
  }

  // Dynamic hydration of Front Page Posts from CariyaPostsStore
  function initFrontPosts() {
    const container = document.getElementById('frontPostsContainer');
    if (!container || !window.CariyaPostsStore) return;

    const posts = window.CariyaPostsStore.getTopPublished(3);
    if (!posts || posts.length === 0) return;

    function sanitize(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    container.innerHTML = posts.map(post => `
      <article class="industry-card post-card" data-post-id="${sanitize(post.id)}">
        <div class="card-media-wrap">
          <img src="${sanitize(post.image || 'assets/images/hero-home.jpg')}" alt="${sanitize(post.title)}" onerror="this.src='assets/images/hero-home.jpg'">
          <span class="card-badge-tag">${sanitize(post.industry || 'Industry Insights')}</span>
        </div>
        <div class="card-body">
          <div style="display: flex; align-items: center; gap: 10px; font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px;">
            <span><i class="fa-regular fa-calendar" style="color: var(--blue-primary); margin-right: 4px;"></i> ${sanitize(post.date || 'Recent')}</span>
            <span>•</span>
            <span><i class="fa-regular fa-clock" style="color: var(--blue-primary); margin-right: 4px;"></i> ${sanitize(post.readTime || '4 min read')}</span>
          </div>
          <h3 style="font-size: 1.18rem; line-height: 1.45; margin-bottom: 10px; color: var(--navy);">${sanitize(post.title)}</h3>
          <p style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 20px; flex: 1;">${sanitize(post.excerpt || '')}</p>
          <a href="${sanitize(post.link || 'insights.html')}" class="btn btn-primary" style="margin-top: auto;">Read Article &rarr;</a>
        </div>
      </article>
    `).join('');
  }

  initFrontPosts();
});

