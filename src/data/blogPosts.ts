export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate?: string;
  category: string;
  readTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-paint-correction-must-come-before-every-ceramic-coating',
    category: 'Paint Correction',
    title: 'Why Paint Correction Must Come Before Every Ceramic Coating',
    description: 'Ceramic coatings are permanent. That means whatever is under the coating stays there — forever. Here\'s the science behind why skipping correction is the most expensive mistake you can make.',
    readTime: '8 min read',
    publishedDate: 'July 9, 2026',
    featuredImage: '/img_black_paint.png',
    featuredImageAlt: 'Machine polishing clear coat during paint correction',
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
    slug: 'how-long-do-ceramic-coatings-actually-last',
    category: 'Ceramic Coatings',
    title: 'How Long Do Ceramic Coatings Actually Last?',
    description: 'Marketing says 5–10 years. Reality depends on prep, product, application, and maintenance. Here\'s an honest breakdown.',
    readTime: '6 min read',
    publishedDate: 'July 8, 2026',
    featuredImage: '/img_water_bead.png',
    featuredImageAlt: 'Water beading on a ceramic coated vehicle surface',
    body: `<p>If you've researched paint protection, you've likely seen bold claims. "Lifetime protection," "9H hardness," "10-year durability." But how long does a professional nano-ceramic coating actually last on a real-world vehicle?</p>
           <h3>The Simple Answer</h3>
           <p>A professional grade, multi-layer ceramic coating will realistically last between <strong>2 and 5 years</strong>. Any claims of "lifetime" or "10 years" without mandatory annual maintenance inspections are marketing exaggerations.</p>
           <h3>Key Factors Influencing Durability</h3>
           <ol>
             <li><strong>Surface Prep:</strong> A coating requires a chemically clean, bare paint surface to form a permanent bond. Any residual wax, polish oils, or microscopic contamination will block bonding, causing early failure.</li>
             <li><strong>Maintenance Wash Routine:</strong> Running a coated vehicle through abrasive automated car washes is the fastest way to micro-scratch and strip the coating. Only hand wash with pH-neutral soap.</li>
             <li><strong>Climate:</strong> Extreme heat, road salt, chemical fallout, and heavy UV exposure put more strain on the coating shell over time.</li>
           </ol>
           <p>Ultimately, a ceramic coating is an investment in preservation. By protecting the clear coat, it keeps the paint beneath looking brand new for years.</p>`
  }
];
