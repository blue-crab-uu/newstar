import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";


export default function Seo({ title, description, lang, meta }) {
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

    const metaDescription = description || site.siteMetadata.description;
    const defaultTitle = site.siteMetadata.title;

    return (
        <div>
            <Helmet
                htmlAttributes={{
                    lang,
                }}
                title={title}
                titleTemplate={`%s | ${defaultTitle}`}
                meta={[
                    {
                        name: `description`,
                        content: metaDescription,
                    },
                    {
                        name: `keywords`,
                        content: site.siteMetadata.keywords,
                    }

                ].concat(meta)}
            />
        </div>
    );
}

Seo.defaultProps = {
    lang: 'en',
    meta: [],
    description: 'Exchange rate inquiry',
};

