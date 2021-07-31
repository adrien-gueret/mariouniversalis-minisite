const getSpacing = baseSpacing => (...values) => {
    return values.map(value => `${baseSpacing * value}px`).join(' ');
};

export default getSpacing;
