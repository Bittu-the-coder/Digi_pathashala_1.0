import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, url, type = "website" }) => {
  const siteTitle = "Digi Pathshala";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription =
    "Join Digi Pathshala for quality online education. Live classes, expert teachers, and interactive learning tools.";
  const defaultImage = "https://digipathshala.com/og-image.jpg";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || "https://digipathshala.com"} />
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* If this is a course page, add course structured data */}
      {type === "course" && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: title,
            description: description,
            provider: {
              "@type": "Organization",
              name: "Digi Pathshala",
              sameAs: "https://digipathshala.com",
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
