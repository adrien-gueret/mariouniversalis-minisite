const path = require(`path`);

const getGames = (() => {
    let games = [];

    return async (graphql) => {
        if (games.length) {
            return games;
        }

        let page = 0;
        let hasNextPage = false;

        do {
            page++;

            const { data } = await graphql(`
            query {
                mu {
                    games(per_page: 30, page: ${page}) {
                        pagination {
                            has_next_page
                        }
                        data {
                            id
                            slug(withId: true)
                            name
                            device {
                                name
                            }
                        }
                    }  
                }
            }`);
    
            hasNextPage = data.mu.games.pagination.has_next_page;
            games = games.concat(data.mu.games.data);
        } while (hasNextPage);

        return games;
    }
})();

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    const { data: siteData } = await graphql(`
    query {
        site {
            siteMetadata {
                activeYears
            }
        }
    }`);

    const { activeYears } = siteData.site.siteMetadata;
    const [firstYearWithGames] = activeYears;
    const lastYearWithGames = activeYears[activeYears.length - 1];

    activeYears.forEach((year) => {
        createPage({
            path: `jeux-de-${year}`,
            component: path.resolve(`./src/templates/GamesByYear.jsx`),
            context: {
                year,
                firstYearWithGames,
                lastYearWithGames,
            },
        });
    });

    const games = await getGames(graphql);

    Promise.all(games.map(async ({ id, slug }) => {
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/GameDetails.jsx`),
            context: { id },
        });
    }));
}