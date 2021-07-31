import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';

import defaultTheme, { GlobalStyle } from '../theme';

import favicon from './images/favicon-192x192.png';

export default function App({ children }) {
    const [theme, setTheme] = useState(defaultTheme);

    const setThemeToExpose = (newTheme = defaultTheme) => setTheme(newTheme);

    return (
        <ThemeProvider theme={{
            ...theme,
            setTheme: setThemeToExpose,
        }}>
        <Helmet
            htmlAttributes={{
                lang: 'fr',
            }}
        >
            <link
                rel="icon"
                type="image/png"
                href={favicon}
                sizes="192x192"
            />
        </Helmet>
        <GlobalStyle />
        { children }
        </ThemeProvider>
    );
}