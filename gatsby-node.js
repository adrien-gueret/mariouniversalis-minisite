const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;

    // Games by year
    const currentYear = new Date().getFullYear();
    const firstYearWithGames = 1986;
    const lastYearWithGames = currentYear + 1;
    const activeYears = [...Array(lastYearWithGames - firstYearWithGames + 1).keys()].map(x => x + firstYearWithGames);

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

    // Game details
    let page = 0;
    let hasNextPage = false;
    let games = [];

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
                    }
                }  
            }
        }`);

        hasNextPage = data.mu.games.pagination.has_next_page;
        games = games.concat(data.mu.games.data);
    } while (hasNextPage);

    games.forEach(({ id, slug }) => {
        createPage({
            path: slug,
            component: path.resolve(`./src/templates/GameDetails.jsx`),
            context: { id },
        });
    });
  }