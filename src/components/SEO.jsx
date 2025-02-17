import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, keywords, author }) => {

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
    </Helmet>
  );
};

export default SEO;
