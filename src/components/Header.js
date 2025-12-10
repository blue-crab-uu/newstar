import React from "react";
import { graphql,useStaticQuery } from "gatsby";
import { use } from "react";

export default function Header() {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `);
    return(
        <div>
            <h1>{data.site.siteMetadata.title}</h1>
            <p>{data.site.siteMetadata.description}</p>

        </div>

    )
}