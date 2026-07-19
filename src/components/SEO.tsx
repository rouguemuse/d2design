import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, path }) => {
  useEffect(() => {
    document.title = title;
    
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[\${attr}="\${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', `https://www.d2autodetail.com\${path}`, true);
    setMeta('og:type', 'website', true);
    setMeta('og:image', 'https://www.d2autodetail.com/media/d2-hero-poster.webp', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', 'https://www.d2autodetail.com/media/d2-hero-poster.webp');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://www.d2autodetail.com\${path}`);

  }, [title, description, path]);

  return null;
};
