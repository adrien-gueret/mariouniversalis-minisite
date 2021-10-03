function getActiveYears() {
  const currentYear = new Date().getFullYear();
  const firstYearWithGames = 1983;
  const lastYearWithGames = currentYear + 1;
  return [...Array(lastYearWithGames - firstYearWithGames + 1).keys()].map(x => x + firstYearWithGames);
}

module.exports = {
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'MU',
        fieldName:'mu',
        url: 'https://www.mariouniversalis.fr/graphql/',
        //url: 'http://localhost:8080/mariouniversalis/graphql'
      },
    }
  ],
  pathPrefix: `/minisite`,
  siteMetadata: {
    title: 'Mario Universalis',
    activeYears: getActiveYears(),
  },
}
