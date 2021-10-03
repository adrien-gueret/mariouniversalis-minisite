import React, { useContext } from 'react';

import RegionContext from './context';

export default function RegionSwitcher() {
    const { region, setRegion } = useContext(RegionContext);

    const regionToLabel = {
        all: <>dans <em>le monde</em></>,
        eur: <>en <em>Europe</em></>,
        jap: <>au <em>Japon</em></>,
        usa: <>aux <em>États-Unis</em></>,
    };

    regionToLabel[region];

    return (
        <>
            Test
        </>
    );
}
