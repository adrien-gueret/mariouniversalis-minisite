import { css } from 'styled-components';

const typograhy = {
    baseSize: '16px',
    variants: {
        body1: css`
            font-size: 1rem;
            font-weight: normal;
        `,
        body2: css`
            font-size: 1.2rem;
            font-weight: normal;
            line-height: 1.8rem;
        `,
        title: css`
            font-size: 2.5rem;
            line-height: 2.5rem;
            font-weight: bold;
            text-shadow: 2px 2px rgb(0 0 0 / 20%);
        `,
        subtitle: css`
            font-size: 1.2rem;
            line-height: 1.2rem;
            font-weight: bold;
        `,
        button: css`
            font-size: 1.4rem;
            font-weight: bold;
        `,
        caption: css`
            font-size: .8rem;
            font-weight: normal;
        `,
    },
};

export default typograhy;
