import React, { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonicalPath?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function SEO({
  title,
  description,
  canonicalPath,
  image = "/media/d2-hero-poster.webp",
  type = "website",
  noindex = false
}: SEOProps) {
  const domain = "https://www.d2autodetail.com";
  const canonicalUrl = canonicalPath
    ? new URL(canonicalPath, domain).toString()
    : "";
  const imageUrl = image.startsWith("http")
    ? image
    : `${domain}${image}`;

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:type', type, true);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    if (canonicalUrl) {
      setMeta('og:url', canonicalUrl, true);
    }
    setMeta('og:image', imageUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      if (robots) robots.remove();
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    } else if (canonical) {
      canonical.remove();
    }
  }, [title, description, canonicalUrl, imageUrl, type, noindex]);

  return null;
}
