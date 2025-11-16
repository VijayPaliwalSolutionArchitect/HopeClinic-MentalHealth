import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Hope Clinic - Professional Mental Health Services';
  const defaultDescription = 'Expert mental health therapy and counseling services by Dr. Bharat Agarwal. Online and offline consultations available.';
  const defaultImage = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200';
  const siteUrl = 'https://hopeclinic.com';

  return (
    <Helmet>
      <title>{title ? `${title} | Hope Clinic` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;