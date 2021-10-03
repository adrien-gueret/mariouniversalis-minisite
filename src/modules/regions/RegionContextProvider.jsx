import React, { useState } from 'react';
import { useLocation } from '@reach/router';
import RegionContext from './context';

export default function RegionContextProvider(props) {
    const { pathname } = useLocation();
    let defaultRegion = 'all';

    [{ slug: 'europe', region: 'eur' }, { slug: 'etats-unis', region: 'usa' }, { slug: 'japon', region: 'jap' }].some(({ slug, region }) => {
        if (!pathname.includes(slug)) {
            return false;
        }

        defaultRegion = region;

        return true;
    });


    const [region, setRegion] = useState(defaultRegion);

    return (
        <RegionContext.Provider
            value={{ region, setRegion }}
            {...props}
        />
    );
}