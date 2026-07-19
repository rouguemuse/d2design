import React from "react";

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
  
  // Build canonical URL safely if path is supplied
  const canonicalUrl = canonicalPath
    ? new URL(canonicalPath, domain).toString()
    : "";

  const imageUrl = image.startsWith("http")
    ? image
    : `${domain}${image}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {!noindex && canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {noindex && (
        <meta name="robots" content="noindex, nofollow" />
      )}
    </>
  );
}
