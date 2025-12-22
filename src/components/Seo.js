import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export default function Seo({ title, description, lang, meta, image, pathname, keywords }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
        }
      }
    }
  `);

  const siteUrl = `${process.env.GATSBY_API_URL4}`;
  const defaultImage = `/home-1200x630.png`;
  const defaultTitle = site.siteMetadata.title;

  const seo = {
    title: title || defaultTitle,
    description: description || site.siteMetadata.description,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname || `/`}`,
    keywords: keywords || site.siteMetadata.keywords,
  };

  return (
    <Helmet
      title={seo.title}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={[
        // 基础 SEO
        { name: `description`, content: seo.description },
        { name: `keywords`, content: seo.keywords },

        // Open Graph
        { property: `og:type`, content: `website` },
        { property: `og:title`, content: seo.title },
        { property: `og:description`, content: seo.description },
        { property: `og:image`, content: seo.image },
        { property: `og:url`, content: seo.url },
        { property: `og:locale`, content: lang || `en_US` },
        { property: `og:site_name`, content: defaultTitle },

        // Twitter Card
        { name: `twitter:card`, content: `summary_large_image` },
        { name: `twitter:title`, content: seo.title },
        { name: `twitter:description`, content: seo.description },
        { name: `twitter:image`, content: seo.image },
      ].concat(meta || [])}
    />
  );
}




