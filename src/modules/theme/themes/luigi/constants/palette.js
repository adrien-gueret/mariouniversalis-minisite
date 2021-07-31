import defaultPalette, { baseColors } from '../../default/constants/palette';

const palette = {
    ...defaultPalette,
    background: {
        ...defaultPalette.background,
        primary: baseColors.green,
    },
    button: {
        primary: baseColors.green,
    },
};

export default palette;
