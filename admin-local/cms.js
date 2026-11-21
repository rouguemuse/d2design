/**
 * D2 — Detail Driven
 * Core CMS Utility (cms.js)
 * Manages LocalStorage data syncing for Services, Blog Posts, Orders, and Ads.
 */

(function () {
  'use strict';

  // --- DEFAULT DATA SEEDING ---
  const DEFAULT_SERVICES = [
    {
      id: 'svc-1',
      num: '01',
      title: 'Complete Detail',
      desc: 'Complete interior and exterior deep detailing. Thorough cleaning, decontamination, and hand-applied paint and cabin protection.',
      priceSedan: 225,
      priceSuv: 275,
      priceTruck: 300,
      priceExotic: 400
    },
    {
      id: 'svc-2',
      num: '02',
      title: 'Paint Correction',
      desc: 'Measured correction designed to restore clarity and depth. Machine polishing that removes swirl marks, scratches, and oxidation.',
      priceSedan: 300,
      priceSuv: 400,
      priceTruck: 450,
      priceExotic: 600
    },
    {
      id: 'svc-3',
      num: '03',
      title: 'Ceramic Coating',
      desc: 'Long-term hydrophobic surface protection built on proper preparation. Nano-ceramic layer that chemically bonds to paint for extreme gloss.',
      priceSedan: 575,
      priceSuv: 750,
      priceTruck: 850,
      priceExotic: 1200
    },
    {
      id: 'svc-4',
      num: '04',
      title: 'PPF',
      desc: 'Premium paint protection film designed to shield against rock chips, road debris, and physical impacts. High-grade clear bra protection.',
      priceSedan: 1500,
      priceSuv: 1800,
      priceTruck: 2000,
      priceExotic: 2500
    },
    {
      id: 'svc-5',
      num: '05',
      title: 'Vehicle Restoration',
      desc: 'Bespoke preparation, multi-stage correction, and full-vehicle surface restoration. Quote available upon custom assessment.',
      priceSedan: 0,
      priceSuv: 0,
      priceTruck: 0,
      priceExotic: 0
    }
  ];

    const DEFAULT_BLOG_POSTS = [
    {
      id: 'post-1',
      num: '01',
      tag: 'Ceramic Coatings',
      title: 'What Is a Ceramic Coating? The Ultimate Protection Guide',
      excerpt: 'Learn what a ceramic coating actually is, how it protects your vehicle, and why it is the gold standard of modern paint protection.',
      readTime: '5 min read',
      date: 'July 18, 2026',
      image: 'img_water_bead.png',
      body: `<p>A ceramic coating is a liquid polymer that is professionally applied to the exterior of a vehicle. The coating chemically bonds with the vehicle's factory paint, creating a sacrificial layer of protection that doesn't wash away or require frequent reapplication like traditional wax or sealants.</p>
             <h3>How It Works</h3>
             <p>Typically composed of Silicon Dioxide (SiO2) or Silicon Carbide (SiC), these nano-coatings fill in the microscopic pores of your clear coat. When cured, it forms a flat, extremely hard protective glass-like barrier that is highly hydrophobic.</p>
             <h3>Core Benefits</h3>
             <ul>
               <li><strong>Hydrophobic Performance:</strong> Water, mud, and grime bead up and roll off with ease, making the washing process incredibly simple.</li>
               <li><strong>UV & Chemical Protection:</strong> Shields paint from harmful ultraviolet rays that cause fading and oxidation, while protecting against bird droppings, acid rain, and road salt.</li>
               <li><strong>Deep Mirror Gloss:</strong> Enhances the reflective properties of your paint, creating a high-gloss wet look.</li>
             </ul>
             <p>While a ceramic coating is not bulletproof armor (it will not prevent deep rock chips or heavy scratches), it is the ultimate shield for daily driving preservation. Contact Detail Driven to inquire about adding a ceramic coating to your vehicle.</p>`
    }
  ];

  const DEFAULT_ORDERS = [
    {
      id: 'D2-1001',
      date: '2026-07-09',
      client: 'Alexander Wright',
      email: 'alex@wrightm4.com',
      phone: '(555) 123-4567',
      vehicle: '2022 BMW M4 Competition',
      service: 'Paint Correction + Ceramic Coating',
      status: 'Paid',
      amount: 1648,
      items: [
        { desc: 'Multi-Stage Paint Correction (BMW M4)', cost: 899 },
        { desc: 'D2 Ceramic Glass Shield (5-Year Coating)', cost: 749 }
      ]
    },
    {
      id: 'D2-1002',
      date: '2026-07-08',
      client: 'Sarah Jenkins',
      email: 's.jenkins@gmail.com',
      phone: '(555) 987-6543',
      vehicle: '2024 Porsche Macan GTS',
      service: 'Ceramic Coating',
      status: 'Invoice Sent',
      amount: 1499,
      items: [
        { desc: 'Ceramic Coating Package (SUV)', cost: 1499 }
      ]
    },
    {
      id: 'D2-1003',
      date: '2026-07-07',
      client: 'Marcus Vance',
      email: 'marcus@vancedesign.com',
      phone: '(555) 444-8899',
      vehicle: '1967 Chevrolet Camaro SS',
      service: 'Full Restoration Detail',
      status: 'Pending Assessment',
      amount: 499,
      items: [
        { desc: 'Premium Detail & Leather Restoration (Exotic/Classic)', cost: 499 }
      ]
    }
  ];

  const DEFAULT_BEFORE_AFTER = [
    {
      id: 'ba-1',
      title: 'BMW Paint Swirl Restoration',
      before: 'img_black_paint.png', // Swirls representation
      after: 'premium_detailing.png'
    },
    {
      id: 'ba-2',
      title: 'Leather Interior Deep Clean',
      before: 'img_leather.png',
      after: 'img_carbon.png'
    }
  ];

    const DEFAULT_TV_VIDEOS = [
    {
      id: 'vid-1',
      youtubeId: 'voPqfGSQp0I',
      title: 'Paint & Aesthetics: The Last Thing On The Dealer’s Mind | Porsche GT3 Weissach New Delivery Detail',
      category: 'detail',
      duration: '14:20'
    },
    {
      id: 'vid-2',
      youtubeId: 'DtfwRGnUyNo',
      title: '18 Years of Oxidation & Swirl Marks - Porsche Cayman Paint Correction',
      category: 'correction',
      duration: '18:45'
    },
    {
      id: 'vid-3',
      youtubeId: 'FFYJVuMa_qE',
      title: 'Satin Paint Requires Different Care | Range Rover Long Wheelbase',
      category: 'ceramic',
      duration: '10:15'
    }
  ];

  // --- GETTERS & SETTERS ---
  window.D2CMS = {
    getServices: function () {
      const stored = localStorage.getItem('d2_services');
      if (!stored || !stored.includes('Complete Detail')) {
        localStorage.setItem('d2_services', JSON.stringify(DEFAULT_SERVICES));
      }
      return JSON.parse(localStorage.getItem('d2_services'));
    },
    saveServices: function (services) {
      localStorage.setItem('d2_services', JSON.stringify(services));
      window.dispatchEvent(new Event('d2_services_updated'));
    },
    getBlogPosts: function () {
      if (!localStorage.getItem('d2_blog_posts')) {
        localStorage.setItem('d2_blog_posts', JSON.stringify(DEFAULT_BLOG_POSTS));
      }
      return JSON.parse(localStorage.getItem('d2_blog_posts'));
    },
    saveBlogPosts: function (posts) {
      localStorage.setItem('d2_blog_posts', JSON.stringify(posts));
      window.dispatchEvent(new Event('d2_blog_updated'));
    },
    getOrders: function () {
      if (!localStorage.getItem('d2_orders')) {
        localStorage.setItem('d2_orders', JSON.stringify(DEFAULT_ORDERS));
      }
      return JSON.parse(localStorage.getItem('d2_orders'));
    },
    saveOrders: function (orders) {
      localStorage.setItem('d2_orders', JSON.stringify(orders));
      window.dispatchEvent(new Event('d2_orders_updated'));
    },
    getBeforeAfter: function () {
      if (!localStorage.getItem('d2_before_after')) {
        localStorage.setItem('d2_before_after', JSON.stringify(DEFAULT_BEFORE_AFTER));
      }
      return JSON.parse(localStorage.getItem('d2_before_after'));
    },
    saveBeforeAfter: function (list) {
      localStorage.setItem('d2_before_after', JSON.stringify(list));
      window.dispatchEvent(new Event('d2_ba_updated'));
    },
    getTvVideos: function () {
      if (!localStorage.getItem('d2_tv_videos')) {
        localStorage.setItem('d2_tv_videos', JSON.stringify(DEFAULT_TV_VIDEOS));
      }
      return JSON.parse(localStorage.getItem('d2_tv_videos'));
    },
    saveTvVideos: function (vids) {
      localStorage.setItem('d2_tv_videos', JSON.stringify(vids));
      window.dispatchEvent(new Event('d2_tv_updated'));
    }
  };

  // Pre-seed local storage immediately
  window.D2CMS.getServices();
  window.D2CMS.getBlogPosts();
  window.D2CMS.getOrders();
  window.D2CMS.getBeforeAfter();
  window.D2CMS.getTvVideos();

  // --- DYNAMIC RENDERING HELPERS FOR CLIENT PAGES ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Services Grid rendering (if target element exists)
    const clientSvcGrid = document.querySelector('#services .services-grid');
    if (clientSvcGrid) {
      const svcs = window.D2CMS.getServices();
      // Render first 3 services
      let html = '';
      svcs.forEach((svc, index) => {
        const num = svc.num || '0' + (index + 1);
        html += `
          <article class="service-card reveal" style="--delay: ${index * 80}">
            <div class="service-num">${num}</div>
            <hr class="service-hr" style="border:none; border-top:1.5px solid var(--border-color, #E5E5E5); margin-bottom:16px;" />
            <h3 class="service-card-title">${svc.title}</h3>
            <p>${svc.desc}</p>
            <a href="#quote" class="service-inquire">+ Inquire</a>
          </article>
        `;
      });
      clientSvcGrid.innerHTML = html;
    }

    // 2. Dynamic Blog Grid rendering (if target exists in blog.html)
    const clientBlogGrid = document.querySelector('.blog-grid');
    if (clientBlogGrid) {
      const posts = window.D2CMS.getBlogPosts();
      let html = '';
      // Skip the first one if we render it as featured post
      posts.forEach((post, index) => {
        // If it's blog.html, render posts index 1+ or all depending on structure
        const num = post.num || '0' + (index + 1);
        html += `
          <article class="blog-card reveal" data-delay="${index * 80}">
            <div class="blog-img-wrap">
              <img src="${post.image}" alt="${post.title}" class="blog-img" style="width:100%; aspect-ratio:16/9; object-fit:cover; display:block;" />
            </div>
            <div class="blog-body">
              <div class="blog-meta">
                <span class="tag">${post.tag}</span>
                <span>${post.readTime}</span>
              </div>
              <h3 class="blog-title">${post.title}</h3>
              <p class="blog-excerpt">${post.excerpt}</p>
              <a href="#" class="blog-read" onclick="openPost('${post.id}'); return false;">
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </article>
        `;
      });
      clientBlogGrid.innerHTML = html;
    }

    // 3. Dynamic TV Video Grid rendering (if target exists in ddtv.html)
    const clientTvGrid = document.querySelector('#video-grid');
    if (clientTvGrid) {
      const vids = window.D2CMS.getTvVideos();
      let html = '';
      vids.forEach((vid, index) => {
        html += `
          <div class="video-card reveal" data-category="${vid.category}" style="--delay: ${index * 80}; cursor: pointer;" onclick="loadTvVideo('${vid.youtubeId}', '${vid.title.replace(/'/g, "\\'")}')">
            <div class="video-thumb" style="position:relative; width:100%; aspect-ratio:16/9; overflow:hidden; background:#000; border-radius:4px;">
              <img src="https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg" alt="${vid.title}" style="width:100%; height:100%; object-fit:cover;" />
              <div class="play-icon" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.15); transition:background 0.3s;">
                <div style="width:44px; height:44px; border-radius:50%; background:var(--accent, #CF1C1C); color:#fff; display:flex; align-items:center; justify-content:center;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>
            <div class="video-info" style="padding:16px 0 0;">
              <p class="video-tag" style="font-size:10px; letter-spacing:1px; text-transform:uppercase; color:var(--accent, #CF1C1C); font-weight:700;">${vid.category === 'correction' ? 'Paint Correction' : vid.category === 'ceramic' ? 'Ceramic Coating' : vid.category === 'detail' ? 'Full Details' : 'Pro Tips'}</p>
              <h3 class="video-title" style="font-family:var(--font-head); font-size:20px; letter-spacing:0.5px; line-height:1.2; margin-top:4px; color:var(--text-main);">${vid.title}</h3>
              <p class="video-desc" style="font-size:12px; color:var(--text-muted); margin-top:6px; line-height:1.5;">Click to play video inside main screen above.</p>
            </div>
          </div>
        `;
      });
      clientTvGrid.innerHTML = html;

      // Re-trigger scroll reveal since grid is dynamically loaded
      if (typeof observer !== 'undefined') {
        document.querySelectorAll('#video-grid .reveal').forEach(el => observer.observe(el));
      }
    }
  });

})();
