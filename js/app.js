// ===== SECURENEST SPA ENGINE =====

const App = {
  currentPage: 'home',

  routes: {
    home: renderHome,
    about: renderAbout,
    products: renderProducts,
    gallery: renderGallery,
    whyus: renderWhyUs,
    contact: renderContact,
  },

  init() {
    this.initNavbar();
    this.initMobileMenu();
    this.handleHashRoute();
    window.addEventListener('hashchange', () => this.handleHashRoute());
  },

  handleHashRoute() {
    const hash = window.location.hash.replace('#', '') || 'home';
    const page = this.routes[hash] ? hash : 'home';
    this.navigate(page, false);
  },

  navigate(page, updateHash = true) {
    this.currentPage = page;
    if (updateHash) window.location.hash = page === 'home' ? '' : page;

    const view = document.getElementById('page-view');
    view.style.opacity = '0';
    view.style.transform = 'translateY(12px)';

    setTimeout(() => {
      view.innerHTML = this.routes[page]();
      view.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      view.style.opacity = '1';
      view.style.transform = 'translateY(0)';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updateActiveNav(page);
      this.initRevealObserver();
      this.initPageSpecific(page);
    }, 200);
  },

  updateActiveNav(page) {
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
      a.classList.remove('active');
      if (a.dataset.page === page) a.classList.add('active');
    });
  },

  initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        this.navigate(page);
        const mm = document.getElementById('mobileMenu');
        const hb = document.getElementById('hamburger');
        if (mm) { mm.classList.remove('open'); hb.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
  },

  initMobileMenu() {
    const hb = document.getElementById('hamburger');
    const mm = document.getElementById('mobileMenu');
    hb.addEventListener('click', () => {
      const isOpen = mm.classList.toggle('open');
      hb.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  },

  initRevealObserver() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },

  initPageSpecific(page) {
    if (page === 'gallery') initGallery();
    if (page === 'products') initProductFilter();

    // Re-bind nav clicks after render
    document.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const pg = el.dataset.page;
        this.navigate(pg);
        const mm = document.getElementById('mobileMenu');
        const hb = document.getElementById('hamburger');
        if (mm) { mm.classList.remove('open'); hb.classList.remove('open'); document.body.style.overflow = ''; }
      });
    });
  }
};

// ===== NAVBAR HTML =====
function getNavbarHTML() {
  return `
  <nav id="navbar">
    <div class="nav-inner">
      <a href="#" class="nav-logo" data-page="home">
        <div class="nav-logo-icon">${logoSVG()}</div>
        <div class="nav-logo-text">
          <span>SECURENEST</span>
          <span>Smart Screens &amp; Grills</span>
        </div>
      </a>
      <ul class="nav-links">
        <li><a href="#" data-page="home">Home</a></li>
        <li><a href="#" data-page="about">About Us</a></li>
        <li><a href="#" data-page="products">Products</a></li>
        <li><a href="#" data-page="gallery">Gallery</a></li>
        <li><a href="#" data-page="whyus">Why Us</a></li>
        <li><a href="#" data-page="contact">Contact</a></li>
      </ul>
      <a href="#" class="btn btn-gold nav-cta" data-page="contact">Get A Quote</a>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="#" data-page="home">Home</a>
    <a href="#" data-page="about">About Us</a>
    <a href="#" data-page="products">Products</a>
    <a href="#" data-page="gallery">Gallery</a>
    <a href="#" data-page="whyus">Why Us</a>
    <a href="#" data-page="contact">Contact</a>
    <a href="#" class="btn btn-gold" data-page="contact">Get A Quote</a>
  </div>`;
}

// ===== LOGO SVG =====
function logoSVG() {
  return `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L4 12V24C4 33 12 40 22 43C32 40 40 33 40 24V12L22 2Z" fill="#C9A84C" fill-opacity="0.15" stroke="#C9A84C" stroke-width="1.5"/>
    <path d="M22 8L10 16V24C10 30 15 35 22 37C29 35 34 30 34 24V16L22 8Z" fill="none" stroke="#C9A84C" stroke-width="1"/>
    <text x="22" y="28" text-anchor="middle" font-family="Cormorant Garamond" font-size="11" font-weight="700" fill="#C9A84C">SN</text>
  </svg>`;
}

// ===== FOOTER HTML =====
function getFooterHTML() {
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="#" class="nav-logo" data-page="home" style="display:inline-flex;gap:.75rem;align-items:center;margin-bottom:.5rem">
            ${logoSVG()}
            <div class="nav-logo-text"><span>SECURENEST</span><span>Smart Screens &amp; Grills</span></div>
          </a>
          <p>Crafting premium mosquito screens, invisible grills, and pleated doors for modern living. Quality that lasts a lifetime.</p>
          <div class="footer-social">
            <a href="https://www.facebook.com/share/1D9ZH1BxEv/" title="Facebook" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
            </a>
            <a href="#" title="Instagram" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2.16c3.2,0,3.58,0,4.85.07a6.65,6.65,0,0,1,2.23.41,4,4,0,0,1,1.48.86,4,4,0,0,1,.86,1.48A6.65,6.65,0,0,1,21.77,7.17c0,1.27.07,1.65.07,4.85s0,3.58-.07,4.85a6.65,6.65,0,0,1-.41,2.23,4,4,0,0,1-.86,1.48,4,4,0,0,1-1.48.86,6.65,6.65,0,0,1-2.23.41c-1.27.07-1.65.07-4.85.07s-3.58,0-4.85-.07a6.65,6.65,0,0,1-2.23-.41,4,4,0,0,1-1.48-.86,4,4,0,0,1-.86-1.48A6.65,6.65,0,0,1,2.23,16.83C2.16,15.56,2.16,15.18,2.16,12s0-3.58.07-4.85A6.65,6.65,0,0,1,2.64,4.92a4,4,0,0,1,.86-1.48A4,4,0,0,1,5,2.58a6.65,6.65,0,0,1,2.23-.41C8.47,2.1,8.85,2.1,12,2.16ZM12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7Zm0,8.25A3.25,3.25,0,1,1,15.25,12,3.25,3.25,0,0,1,12,15.25ZM17,5.5a1.17,1.17,0,1,0,1.17,1.17A1.17,1.17,0,0,0,17,5.5Z"/></svg>
            </a>
            <a href="https://wa.me/919182297010" title="WhatsApp" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="#" title="YouTube" target="_blank">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5,6.19a3,3,0,0,0-2.09-2.09C19.54,3.5,12,3.5,12,3.5s-7.54,0-9.41.59A3,3,0,0,0,.5,6.19,31.64,31.64,0,0,0,0,12a31.64,31.64,0,0,0,.5,5.81,3,3,0,0,0,2.09,2.09c1.87.6,9.41.6,9.41.6s7.54,0,9.41-.59a3,3,0,0,0,2.09-2.09A31.64,31.64,0,0,0,24,12,31.64,31.64,0,0,0,23.5,6.19ZM9.55,15.57V8.43L15.82,12Z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#" data-page="home">Home</a></li>
            <li><a href="#" data-page="about">About Us</a></li>
            <li><a href="#" data-page="products">Products</a></li>
            <li><a href="#" data-page="gallery">Gallery</a></li>
            <li><a href="#" data-page="contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Products</h4>
          <ul>
            <li><a href="#" data-page="products">Mosquito Screens</a></li>
            <li><a href="#" data-page="products">Invisible Grills</a></li>
            <li><a href="#" data-page="products">SS &amp; MS Grills</a></li>
            <li><a href="#" data-page="products">Pleated Doors</a></li>
            <li><a href="#" data-page="products">Cloth Hangs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <p>IDPL Colony,<br>Hyderabad, Telangana 500016</p>
          </div>
          <div class="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.29 6.29l.41-.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            <p>+91 98765 43210</p>
          </div>
          <div class="footer-contact-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <p>securenest@gmail.com</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 <span>SecureNest</span>. All rights reserved.</p>
        <p>Designed with precision. <span>Made for protection.</span></p>
      </div>
    </div>
  </footer>`;
}

// ===== HOME PAGE =====
function renderHome() {
  return `
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">Smart Solutions<br>For A <span class="gold">Safer Life</span></h1>
        <p class="hero-desc">Premium mosquito screens, invisible grills, pleated doors &amp; more – crafted for modern living.</p>
        <div class="hero-btns">
          <a href="#" class="btn btn-gold" data-page="products">Explore Products</a>
          <a href="#" class="btn btn-dark" data-page="gallery">View Gallery</a>
        </div>
      </div>
    </div>
    <div class="hero-badges">
      <div class="hero-badges-inner">
        ${['Premium Quality','Custom Fit','Modern Design','Trusted Service'].map(b => `
        <div class="hero-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          ${b}
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- PRODUCTS SHOWCASE -->
  <section class="section-padding" style="background:var(--dark)">
    <div class="container text-center">
      <span class="section-tag reveal">Our Products</span>
      <h2 class="section-title reveal reveal-delay-1">Designed For Comfort <span class="gold">&amp; Security</span></h2>
      <p class="section-subtitle reveal reveal-delay-2">Each product is precision-engineered for your home's unique requirements</p>
      <div class="products-grid reveal reveal-delay-2">
        ${[
          {name:'Mosquito Screens', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'},
          {name:'Invisible Grills', img:'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80'},
          {name:'SS & MS Grills', img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80'},
          {name:'Pleated Doors', img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80'},
          {name:'Cloth Hangs', img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80'}
        ].map(p => `
        <div class="product-card" data-page="products" style="cursor:pointer" onclick="App.navigate('products')">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          <div class="product-card-overlay">
            <div class="product-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="product-name">${p.name}</span>
          </div>
          <div class="product-card-arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="stats-section section-padding">
    <div class="container">
      <div class="stats-inner">
        <div class="stats-left reveal">
          <div class="stats-logo-big">${logoSVG().replace('width="44" height="44"','width="110" height="110"')}</div>
          <div class="stats-left-text">
            <h3>Built with precision.<br><span class="gold">Made for protection.</span></h3>
            <p>Let us help you create a safer, smarter space. Our expert team brings years of craftsmanship to every installation.</p>
            <a href="#" class="btn btn-outline" data-page="contact">Get a Free Consultation</a>
          </div>
        </div>
        <div class="stats-numbers">
          ${[['10+','Years of Experience'],['5000+','Happy Customers'],['100%','Quality Assurance']].map((s,i) => `
          <div class="stat-item reveal reveal-delay-${i+1}">
            <span class="stat-number">${s[0]}</span>
            <span class="stat-label">${s[1]}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- WHY CHOOSE -->
  <section class="section-padding" style="background:var(--dark)">
    <div class="container">
      <div class="why-grid">
        <div class="why-content">
          <span class="section-tag reveal">Why SecureNest?</span>
          <h2 class="section-title reveal reveal-delay-1">Why Choose <span class="gold">SecureNest?</span></h2>
          <div class="why-features">
            ${[
              {title:'Premium Materials', desc:'We use high-grade materials built to last through every season.',icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'},
              {title:'Expert Craftsmanship', desc:'Precision made by skilled professionals with 10+ years of experience.',icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'},
              {title:'Customized Solutions', desc:'Tailored to fit your space and needs with bespoke dimensions.',icon:'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z'},
              {title:'After-Sales Support', desc:"We're here for you, always. Lifetime customer support guaranteed.",icon:'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'}
            ].map((f,i) => `
            <div class="why-feature reveal reveal-delay-${i+1}">
              <div class="why-feature-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${f.icon}" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <h4>${f.title}</h4>
              <p>${f.desc}</p>
            </div>`).join('')}
          </div>
        </div>
        <div class="why-image reveal">
          <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80" alt="Why SecureNest" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- CTA STRIP -->
  <div class="cta-strip">
    <div class="container">
      <div class="cta-strip-inner">
        <div>
          <h2>Secure What Matters <span class="gold">Most</span></h2>
          <p>Premium screens &amp; grills for your peace of mind.</p>
        </div>
        <a href="#" class="btn btn-gold" data-page="contact">Get In Touch</a>
      </div>
    </div>
  </div>

  ${getFooterHTML()}`;
}

// ===== ABOUT PAGE =====
function renderAbout() {
  return `
  <div class="page-hero">
    <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80')"></div>
    <div class="container page-hero-content">
      <div class="breadcrumb"><a href="#" data-page="home">Home</a> / About Us</div>
      <h1>About <span class="gold">SecureNest</span></h1>
    </div>
  </div>

  <section class="section-padding" style="background:var(--dark)">
    <div class="container">
      <div class="about-story">
        <div class="about-story-image reveal">
          <img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80" alt="Our Story">
        </div>
        <div class="reveal reveal-delay-1">
          <span class="about-tag">Our Story</span>
          <h2>A Decade of <span class="gold">Trusted Protection</span></h2>
          <p>Founded in 2014, SecureNest began with a simple vision — to provide homeowners with beautiful, durable, and effective protection solutions. What started as a small workshop in Hyderabad has grown into a trusted brand serving over 5,000 happy families.</p>
          <p>Every product we make is a testament to our commitment to quality. We source only the finest materials, employ skilled craftsmen, and ensure every installation meets our exacting standards.</p>
          <p>Our team of 50+ professionals works tirelessly to deliver solutions that are not just functional, but aesthetically pleasing — designed to complement the modern home.</p>
          <div style="display:flex;gap:1rem;margin-top:1.75rem;flex-wrap:wrap">
            <a href="#" class="btn btn-gold" data-page="contact">Work With Us</a>
            <a href="#" class="btn btn-outline" data-page="products">Our Products</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding" style="background:var(--black)">
    <div class="container text-center">
      <span class="section-tag reveal">Our Values</span>
      <h2 class="section-title reveal reveal-delay-1">What Drives <span class="gold">Us Forward</span></h2>
      <div class="values-grid">
        ${[
          {n:'01', title:'Integrity', desc:'We believe in honest business. Transparent pricing, clear communication, and no hidden surprises.'},
          {n:'02', title:'Precision', desc:'Every cut, weld, and installation is executed with meticulous attention to detail and accuracy.'},
          {n:'03', title:'Innovation', desc:'We continuously explore new materials and techniques to deliver smarter, more durable solutions.'},
          {n:'04', title:'Customer First', desc:'Your satisfaction is our mission. We listen, adapt, and deliver exactly what you need.'},
          {n:'05', title:'Sustainability', desc:'We choose materials and processes that are eco-friendly and responsibly sourced.'},
          {n:'06', title:'Community', desc:'As a local business, we give back to the community that has supported our growth.'}
        ].map((v,i) => `
        <div class="value-card reveal reveal-delay-${(i%3)+1}">
          <div class="value-num">${v.n}</div>
          <h4>${v.title}</h4>
          <p>${v.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section-padding" style="background:var(--dark)">
    <div class="container text-center">
      <span class="section-tag reveal">Our Team</span>
      <h2 class="section-title reveal reveal-delay-1">The People <span class="gold">Behind SecureNest</span></h2>
      <div class="team-grid">
        ${[
          {name:'Md Javeed', role:'Founder & CEO', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'},
          {name:'Md Feroz', role:'Design Lead', img:'assets/team/feroz.jpg'},
          {name:'Anand Reddy', role:'Head of Operations', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80'},
          {name:'Divya Nair', role:'Customer Relations', img:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80'}
        ].map((t,i) => `
        <div class="team-card reveal reveal-delay-${i+1}">
          <div class="team-card-img"><img src="${t.img}" alt="${t.name}" loading="lazy"></div>
          <div class="team-card-info">
            <h4>${t.name}</h4>
            <span>${t.role}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <div class="cta-strip">
    <div class="container">
      <div class="cta-strip-inner">
        <div><h2>Ready to <span class="gold">Secure Your Home?</span></h2><p>Get a free consultation from our experts today.</p></div>
        <a href="#" class="btn btn-gold" data-page="contact">Book a Consultation</a>
      </div>
    </div>
  </div>
  ${getFooterHTML()}`;
}

// ===== PRODUCTS PAGE =====
const PRODUCTS_DATA = [
  {id:1, name:'Mosquito Screens', category:'screens', desc:'High-quality fiberglass and SS mesh screens that keep insects out while allowing fresh air to flow freely.', img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', tags:['Fiberglass','Stainless Steel','Custom Size'], badge:'Bestseller'},
  {id:2, name:'Invisible Grills', category:'grills', desc:'Ultra-strong SS316 wire grills that are virtually invisible, giving your home an unobstructed view.', img:'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80', tags:['SS316 Wire','Child Safe','High Tensile'], badge:'Premium'},
  {id:3, name:'SS Grills', category:'grills', desc:'Stainless steel grills crafted with precision, combining strength with contemporary design aesthetics.', img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', tags:['Stainless Steel','Rust-Proof','Custom Design'], badge:''},
  {id:4, name:'MS Grills', category:'grills', desc:'Mild steel grills with powder coating for maximum corrosion resistance and long-lasting durability.', img:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80', tags:['Powder Coated','Mild Steel','Heavy Duty'], badge:''},
  {id:5, name:'Pleated Doors', category:'doors', desc:'Elegant pleated mesh doors that fold neatly when open, ideal for balconies and sliding door entrances.', img:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', tags:['Fold-Away','Smooth Slide','Anti-Insects'], badge:'New'},
  {id:6, name:'Cloth Hangs', category:'other', desc:'Stylish and functional cloth hanging systems for wardrobes, balconies, and utility spaces.', img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', tags:['Space-Saving','Durable','Versatile'], badge:''},
];

function renderProducts() {
  return `
  <div class="page-hero">
    <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80')"></div>
    <div class="container page-hero-content">
      <div class="breadcrumb"><a href="#" data-page="home">Home</a> / Products</div>
      <h1>Our <span class="gold">Products</span></h1>
    </div>
  </div>

  <section class="section-padding" style="background:var(--dark)">
    <div class="container">
      <div class="text-center" style="margin-bottom:1rem">
        <span class="section-tag reveal">What We Offer</span>
        <h2 class="section-title reveal reveal-delay-1">Designed For Comfort <span class="gold">&amp; Security</span></h2>
        <p class="section-subtitle reveal reveal-delay-2">Every product is precision-engineered, custom-fitted, and built to last</p>
      </div>
      <div class="products-filter reveal reveal-delay-2" id="filterBtns">
        ${[['all','All Products'],['screens','Screens'],['grills','Grills'],['doors','Doors'],['other','Others']].map(([val,label]) => `
        <button class="filter-btn${val==='all'?' active':''}" data-filter="${val}">${label}</button>`).join('')}
      </div>
      <div class="products-list" id="productsList">
        ${PRODUCTS_DATA.map((p,i) => `
        <div class="product-item reveal reveal-delay-${(i%3)+1}" data-cat="${p.category}">
          <div class="product-item-img">
            <img src="${p.img}" alt="${p.name}" loading="lazy">
            ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          </div>
          <div class="product-item-info">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="product-features">
              ${p.tags.map(t => `<span class="product-feature-tag">${t}</span>`).join('')}
            </div>
            <a href="#" class="btn btn-outline" data-page="contact" style="font-size:.7rem;padding:.65rem 1.4rem">Get Quote</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <div class="cta-strip">
    <div class="container">
      <div class="cta-strip-inner">
        <div><h2>Need A Custom <span class="gold">Solution?</span></h2><p>We fabricate and install to your exact requirements.</p></div>
        <a href="#" class="btn btn-gold" data-page="contact">Request Custom Quote</a>
      </div>
    </div>
  </div>
  ${getFooterHTML()}`;
}

function initProductFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.product-item').forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// ===== GALLERY PAGE =====
const GALLERY_IMGS = [
  /*
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&q=80',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80',
  */
  'assets/gallery/img-1.jpg',
  'assets/gallery/img-2.jpg',
  'assets/gallery/img-3.jpg',
  'assets/gallery/img-4.jpg',
  'assets/gallery/img-5.jpg',
];

function renderGallery() {
  return `
  <div class="page-hero">
    <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80')"></div>
    <div class="container page-hero-content">
      <div class="breadcrumb"><a href="#" data-page="home">Home</a> / Gallery</div>
      <h1>Our <span class="gold">Gallery</span></h1>
    </div>
  </div>

  <section class="section-padding" style="background:var(--dark)">
    <div class="container">
      <div class="text-center" style="margin-bottom:3rem">
        <span class="section-tag reveal">Portfolio</span>
        <h2 class="section-title reveal reveal-delay-1">Our Work Speaks <span class="gold">For Itself</span></h2>
        <p class="section-subtitle reveal reveal-delay-2">Browse through our portfolio of completed installations across Hyderabad</p>
      </div>
      <div class="gallery-grid">
        ${GALLERY_IMGS.map((img,i) => `
        <div class="gallery-item reveal">
          <img src="${img}" alt="Gallery ${i+1}" loading="lazy">
        </div>`).join('')}
      </div>
    </div>
  </section>

  <div class="cta-strip">
    <div class="container">
      <div class="cta-strip-inner">
        <div><h2>Like What You <span class="gold">See?</span></h2><p>Let us create a similar transformation for your home.</p></div>
        <a href="#" class="btn btn-gold" data-page="contact">Start Your Project</a>
      </div>
    </div>
  </div>
  ${getFooterHTML()}`;
}

function initGallery() {
  // No initialization needed - just a simple image grid
}

// ===== WHY US PAGE =====
function renderWhyUs() {
  return `
  <div class="page-hero">
    <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1600&q=80')"></div>
    <div class="container page-hero-content">
      <div class="breadcrumb"><a href="#" data-page="home">Home</a> / Why Us</div>
      <h1>Why Choose <span class="gold">SecureNest</span></h1>
    </div>
  </div>

  <!-- FEATURES -->
  <section class="section-padding" style="background:var(--dark)">
    <div class="container text-center">
      <span class="section-tag reveal">Our Advantages</span>
      <h2 class="section-title reveal reveal-delay-1">The <span class="gold">SecureNest</span> Difference</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-top:3rem">
        ${[
          {icon:'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title:'Premium Materials', desc:'SS316 wire, high-grade fiberglass, powder-coated steel — materials chosen for durability and aesthetics.'},
          {icon:'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', title:'Expert Craftsmen', desc:'Our team of 50+ skilled professionals has 10+ years of combined experience in precision fabrication.'},
          {icon:'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z', title:'Warranty Backed', desc:'All products come with a warranty. We stand behind every installation we make.'},
          {icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'On-Time Delivery', desc:'We respect your time. Our installations are completed within the promised timeframe, every time.'},
          {icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title:'Dedicated Team', desc:'You get a single point of contact from inquiry to installation and post-service support.'},
          {icon:'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', title:'Free Home Visit', desc:'Book a free consultation and our expert will visit your home to assess and recommend the best solution.'}
        ].map((f,i) => `
        <div class="value-card reveal reveal-delay-${(i%3)+1}">
          <div class="why-feature-icon" style="margin-bottom:1rem">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${f.icon}" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="section-padding" style="background:var(--black)">
    <div class="container">
      <div class="text-center">
        <span class="section-tag reveal">How It Works</span>
        <h2 class="section-title reveal reveal-delay-1">Our Simple <span class="gold">Process</span></h2>
      </div>
      <div class="process-timeline">
        ${[
          {n:'01', title:'Free Consultation', desc:'Book a free home visit. Our expert assesses your space and understands your requirements.'},
          {n:'02', title:'Custom Design', desc:'We create a tailored design and quote based on your exact measurements and preferences.'},
          {n:'03', title:'Precision Fabrication', desc:'Our workshop fabricates your products with precision using premium materials.'},
          {n:'04', title:'Professional Installation', desc:'Our certified team installs everything cleanly, quickly, and with zero mess.'},
          {n:'05', title:'Quality Check & Handover', desc:'We conduct a thorough quality inspection and walk you through the installation.'},
        ].map(s => `
        <div class="process-step reveal">
          <div class="process-num">${s.n}</div>
          <div class="process-content">
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="section-padding" style="background:var(--dark)">
    <div class="container text-center">
      <span class="section-tag reveal">Testimonials</span>
      <h2 class="section-title reveal reveal-delay-1">What Our Customers <span class="gold">Say</span></h2>
      <div class="testimonials-grid">
        ${[
          {text:'SecureNest transformed our balcony completely. The invisible grills are beautiful and our kids are now completely safe. Exceptional quality and service!', name:'Ramesh Babu', role:'Homeowner, Banjara Hills', init:'RB'},
          {text:'The mosquito screens they installed are top-notch. No more insects, excellent airflow. The team was professional and completed the work in a single day.', name:'Sunita Rao', role:'Apartment Owner, Gachibowli', init:'SR'},
          {text:'I had custom pleated doors installed for my balcony. The craftsmanship is excellent and the after-sales support has been outstanding. Highly recommend!', name:'Vikram Nair', role:'Villa Owner, Jubilee Hills', init:'VN'},
        ].map((t,i) => `
        <div class="testimonial-card reveal reveal-delay-${i+1}">
          <div class="stars">★★★★★</div>
          <p>"${t.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">${t.init}</div>
            <div class="testimonial-author-info"><h5>${t.name}</h5><span>${t.role}</span></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <div class="cta-strip">
    <div class="container">
      <div class="cta-strip-inner">
        <div><h2>Join <span class="gold">5000+ Happy Families</span></h2><p>Experience the SecureNest difference today.</p></div>
        <a href="#" class="btn btn-gold" data-page="contact">Get A Free Quote</a>
      </div>
    </div>
  </div>
  ${getFooterHTML()}`;
}

// ===== CONTACT PAGE =====
function renderContact() {
  return `
  <div class="page-hero">
    <div class="page-hero-bg" style="background-image:url('https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1600&q=80')"></div>
    <div class="container page-hero-content">
      <div class="breadcrumb"><a href="#" data-page="home">Home</a> / Contact</div>
      <h1>Get In <span class="gold">Touch</span></h1>
    </div>
  </div>

  <section class="section-padding" style="background:var(--dark)">
    <div class="container">
      <div class="text-center" style="margin-bottom:3.5rem">
        <span class="section-tag reveal">Contact Info</span>
        <h2 class="section-title reveal reveal-delay-1">Let's Build Something <span class="gold">Great Together</span></h2>
        <p class="section-subtitle reveal reveal-delay-2">Whether you have a question about our products, need a quote, or want to book a free home visit — we're here to help.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.5rem;margin-bottom:3rem">
        ${[
          {icon:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z', icon2:'M12 10m-3 0a3 3 0 106 0 3 3 0 00-6 0', title:'Our Office', text:'IDPL Colony,<br>Hyderabad, Telangana 500016', full:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z'},
          {full:'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 14a16 16 0 006.29 6.29l.41-.41a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z', title:'Phone', text:'+91 95812 44586<br>+91 87654 32109'},
          {full:'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6', title:'Email', text:'hello@securenest.in<br>support@securenest.in'},
          {full:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'Working Hours', text:'Mon–Sat: 9:00 AM – 7:00 PM<br>Sunday: 10:00 AM – 4:00 PM'},
        ].map((c,i) => `
        <div class="value-card reveal reveal-delay-${i+1}" style="text-align:center;padding:2.5rem 2rem">
          <div class="contact-info-icon" style="margin:0 auto 1.25rem;width:56px;height:56px">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${c.full}" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <h4 style="font-family:var(--font-body);font-size:.72rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem">${c.title}</h4>
          <p style="font-size:.88rem;color:var(--gray-light);font-weight:300;line-height:1.8">${c.text}</p>
        </div>`).join('')}
      </div>

      <div class="map-embed reveal">
        <iframe
          src="https://www.google.com/maps?q=IDPL+Colony+Hyderabad+Telangana+500037&output=embed"
          width="100%"
          height="450"
          style="border:0;border-radius:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </section>

  ${getFooterHTML()}`;
}

// ===== BOOT =====
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app-navbar').innerHTML = getNavbarHTML();
  App.init();
  App.navigate('home', false);
});