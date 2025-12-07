import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = "" }) {
    const fullTitle = `${title} | Hits`;
    const url = `https://hits.sh${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <link rel="canonical" href={url} />
        </Helmet>
    );
}
