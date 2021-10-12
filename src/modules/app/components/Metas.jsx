import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation  } from '@reach/router';

export default function Metas({
    title = 'Mini-site des jeux Super Mario',
    description = "Découvrez une liste presque complète des jeux Super Mario avec, pour chacun de ces jeux, sa boite, une description et d'autres informations comme le manuel d'utilisation !",
    image = 'https://pbs.twimg.com/profile_banners/1340236746211127296/1608376902/600x200',
    url,
}) {
    const { href } = useLocation();
    const finalURL = url || href;
    const finalTitle = title ? `${title} - Mario Universalis` : 'Mario Universalis';
    return (
        <Helmet>
            <title>{ finalTitle }</title>
            <meta name="title" content={finalTitle} />
            <meta name="description" content={description} />


            { /* Open Graph / Facebook */ }
            <meta property="og:type" content="website" />
            <meta property="og:url" content={finalURL} />
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            { /* Twitter */ }
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={finalURL} />
            <meta property="twitter:title" content={finalTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}