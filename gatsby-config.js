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
}
