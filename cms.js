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
      title: 'Paint Correction',
      desc: 'Measured correction designed to restore clarity and depth. Machine polishing that removes swirl marks, scratches, and oxidation.',
      priceSedan: 300,
      priceSuv: 400,
      priceTruck: 450,
      priceExotic: 600
    },
    {
      id: 'svc-2',
      num: '02',
      title: 'Ceramic Coating',
      desc: 'Long-term hydrophobic surface protection built on proper preparation. Nano-ceramic layer that chemically bonds to paint for extreme gloss.',
      priceSedan: 575,
      priceSuv: 750,
      priceTruck: 850,
      priceExotic: 1200
    },
    {
      id: 'svc-3',
      num: '03',
      title: 'PPF',
      desc: 'Premium paint protection film designed to shield against rock chips, road debris, and physical impacts. High-grade clear bra protection.',
      priceSedan: 1500,
      priceSuv: 1800,
      priceTruck: 2000,
      priceExotic: 2500
    },
    {
      id: 'svc-4',
      num: '04',
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
      tag: 'Paint Correction',
      title: 'Why Paint Correction Must Come Before Every Ceramic Coating',
      excerpt: 'Ceramic coatings are permanent. That means whatever is under the coating stays there — forever. Here\'s the science behind why skipping correction is the most expensive mistake you can make.',
      readTime: '8 min read',
      date: 'July 9, 2026',
      image: 'img_black_paint.png',
      body: `<p>Ceramic coatings have revolutionized paint protection. A professionally applied nano-ceramic layer bonds chemically to your clear coat, creating a semi-permanent hydrophobic shell that repels water, resists UV, and maintains gloss for years. But there's a catch — and it's a big one.</p>
             <h3>Coatings Are Permanent. Defects Are Too.</h3>
             <p>Unlike wax or sealant, a ceramic coating cannot simply be washed off or buffed away. Once it cures, it becomes part of the paint's surface. That means every swirl mark, water spot, fine scratch, and hologram that existed before the coating went on will remain perfectly preserved underneath it — locked in, magnified by the very gloss you paid for.</p>
             <h3>The Magnification Effect</h3>
             <p>Ceramic coatings enhance depth and clarity dramatically. A corrected, defect-free surface looks astonishing under a coating. An uncorrected surface looks worse — because the high-gloss finish now amplifies every imperfection instead of hiding it the way older wax products did.</p>
             <h3>What Proper Correction Involves</h3>
             <p>A complete pre-coating correction process starts with a full decontamination — iron fallout removal, clay bar treatment, and a thorough wash. From there, we assess paint thickness with a digital gauge and inspect under high-intensity lighting. Depending on the severity of defects, we'll run single-stage or multi-stage machine polishing before a final IPA wipe-down to remove all residue. Only then does the coating go on.</p>
             <p>The result is a surface that's factory-smooth — or better — sealed beneath glass-like ceramic protection. That's the Detail Driven standard.</p>`
    },
    {
      id: 'post-2',
      num: '02',
      tag: 'Ceramic Coatings',
      title: 'How Long Do Ceramic Coatings Actually Last?',
      excerpt: 'Marketing says 5–10 years. Reality depends on prep, product, application, and maintenance. Here\'s an honest breakdown.',
      readTime: '6 min read',
      date: 'July 8, 2026',
      image: 'img_water_bead.png',
      body: `<p>If you've researched paint protection, you've likely seen bold claims. "Lifetime protection," "9H hardness," "10-year durability." But how long does a professional nano-ceramic coating actually last on a real-world vehicle?</p>
             <h3>The Simple Answer</h3>
             <p>A professional grade, multi-layer ceramic coating will realistically last between <strong>2 and 5 years</strong>. Any claims of "lifetime" or "10 years" without mandatory annual maintenance inspections are marketing exaggerations.</p>
             <h3>Key Factors Influencing Durability</h3>
             <ol>
               <li><strong>Surface Prep:</strong> A coating requires a chemically clean, bare paint surface to form a permanent bond. Any residual wax, polish oils, or microscopic contamination will block bonding, causing early failure.</li>
               <li><strong>Maintenance Wash Routine:</strong> Running a coated vehicle through abrasive automated car washes is the fastest way to micro-scratch and strip the coating. Only hand wash with pH-neutral soap.</li>
               <li><strong>Climate:</strong> Extreme heat, road salt, chemical fallout, and heavy UV exposure put more strain on the coating shell over time.</li>
             </ol>
             <p>With annual decontaminating washes and silica-based top-ups, keeping your coating performing at 100% gloss and water-beading for a full 5 years is easily achievable.</p>`
    },
    {
      id: 'post-3',
      num: '03',
      tag: 'Maintenance',
      title: 'The Right Way to Wash a Ceramic Coated Car',
      excerpt: 'Two-bucket method, pH-neutral soap, no automatic car washes. What you do after the coating is just as important as the coating itself.',
      readTime: '4 min read',
      date: 'July 5, 2026',
      image: 'premium_detailing.png',
      body: `<p>A ceramic coating makes your car incredibly easy to wash thanks to its self-cleaning, hydrophobic properties. However, it is not armor. Wash it incorrectly, and you will introduce swirl marks that can only be polished out by removing the coating.</p>
             <h3>The Golden Rule: No Automatic Car Washes</h3>
             <p>Avoid tunnel car washes with spinning brushes. These brushes collect dirt from every previous dirty vehicle and drag it across your paint like sandpaper. Touchless automatic washes are better, but use harsh high-alkaline chemicals that degrade the hydrophobic layer over time.</p>
             <h3>The Two-Bucket System</h3>
             <p>Always hand wash using the two-bucket method:</p>
             <ul>
               <li><strong>Bucket 1:</strong> Clean water with a grit guard (for rinsing the wash mitt).</li>
               <li><strong>Bucket 2:</strong> Warm water mixed with pH-neutral, wax-free car shampoo.</li>
             </ul>
             <p>Rinse the mitt in the rinse bucket before picking up fresh soap. Dry with a thick microfiber towel using a detailing spray as lubrication to minimize friction.</p>`
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
      youtubeId: 'qAHEZl-L39w',
      title: 'Full Exterior Wash & Certified Ceramic Coating Install',
      category: 'ceramic',
      duration: '14:20'
    },
    {
      id: 'vid-2',
      youtubeId: 'l1r4fK6_L2A',
      title: 'Restoring Swirl-Marked Black Paint // Step-by-Step Polish',
      category: 'correction',
      duration: '18:45'
    },
    {
      id: 'vid-3',
      youtubeId: 'e8i5cQ-u3E4',
      title: 'Interior Deep Clean, Leather Restoration & Conditioning',
      category: 'detail',
      duration: '10:15'
    }
  ];

  // --- GETTERS & SETTERS ---
  window.D2CMS = {
    getServices: function () {
      const stored = localStorage.getItem('d2_services');
      if (!stored || !stored.includes('PPF')) {
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
