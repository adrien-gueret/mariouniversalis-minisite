import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, h1, h2, h3, p, ul, li {
        margin: 0;
        padding: 0;
    }

    p + p {
        margin-top: ${({ theme }) => theme.spacing(2)};
    }

    html {
        font-family: sans-serif;
        font-size:  ${({ theme }) => theme.typography.baseSize};

        background-color: ${({ theme }) => theme.palette.background.primary};
        background-image: url(${({ theme }) => theme.images.pageBackground});

        color: ${({ theme }) => theme.palette.text.default};
    }

    html * {
        font-family: inherit !important;
    }

    body {
        ${({ theme }) => theme.typography.variants.body1}
        min-width: 375px;
    }    
`;

export default GlobalStyle;
