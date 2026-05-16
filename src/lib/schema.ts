export const schemaMarkup = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mintmediahouse.in/#organization",
      "name": "Mint Media House",
      "alternateName": "MintMedia",
      "url": "https://mintmediahouse.in",
      "description":
        "UI Animation & Launch Video Agency for SaaS. Viral video content for founders. 10M+ views generated.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mintmediahouse.in/logo.png",
        "width": 512,
        "height": 512,
      },
      "email": "hello@mintmediahouse.in",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "MH",
        "postalCode": "400000",
        "addressCountry": "IN",
        "streetAddress": "Mumbai, India",
      },
      "sameAs": [
        "https://twitter.com/mintmediahouse",
        "https://linkedin.com/company/mintmediahouse",
        "https://instagram.com/mintmediahouse",
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "hello@mintmediahouse.in",
        "areaServed": "IN",
        "availableLanguage": "en",
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://mintmediahouse.in/#localbusiness",
      "name": "Mint Media House",
      "image": "https://mintmediahouse.in/logo.png",
      "url": "https://mintmediahouse.in",
      "telephone": "+91-9XXX-XXX-XXX",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "MH",
        "addressCountry": "IN",
        "streetAddress": "Mumbai, Maharashtra",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.0760",
        "longitude": "72.8777",
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mintmediahouse.in/#website",
      "url": "https://mintmediahouse.in",
      "name": "Mint Media House",
      "description": "UI Animation & Launch Video Agency for SaaS Founders",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://mintmediahouse.in?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ProductCollection",
      "@id": "https://mintmediahouse.in/#services",
      "name": "Video Production Services",
      "description": "UI Animations, Launch Videos, Brand Films",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Video Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "UI Animations",
            "description": "Custom UI animations for SaaS products",
            "url": "https://mintmediahouse.in#pricing",
          },
          {
            "@type": "Offer",
            "name": "Launch Videos",
            "description": "Premium product launch videos",
            "url": "https://mintmediahouse.in#pricing",
          },
          {
            "@type": "Offer",
            "name": "Personal Brand Videos",
            "description": "Monthly personal brand video series",
            "url": "https://mintmediahouse.in#pricing",
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://mintmediahouse.in",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://mintmediahouse.in#services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Portfolio",
          "item": "https://mintmediahouse.in#work",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Pricing",
          "item": "https://mintmediahouse.in#pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://mintmediahouse.in/#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does a launch video cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide fully custom quotes based on your project's complexity, length, and revision needs. Get in touch and we'll send a tailored proposal within 24 hours — no commitment required.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does the video production process take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most projects take 5-8 business days from concept to final delivery. Rush delivery is available on select projects.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you offer revisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! All packages include revisions. Retainer packages include unlimited revisions until you're satisfied.",
          },
        },
      ],
    },
  ],
};
