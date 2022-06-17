const path = require(`path`);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
                            name
                            slug(withId: true)
                            description: description_fr
                            image
                            genres {
                            name(lang: fr)
                            }
                            imagePreview: image(hq: false)
                            releaseDate: release_date(region: all, format: "DD/MM/YYYY")
                            releaseYear: release_date(region: all, format: "YYYY")
                            isReleased: is_released(region: all)
                            daysBeforeAnniversary: days_before_anniversary
                            age(region: all)
                            ageInDays: age(unit: days, region: all)
                            manualURL
                            popularity
                            totalRatings: total_ratings
                            videos {
                            data {
                                id
                                title
                                description
                                publishDate: publish_date
                                channel {
                                title
                                }
                                thumbnail {
                                width
                                height
                                url
                                }
                            }
                            }
                            device {
                            name
                            logo
                            }
                        }
                    }  
                }
            }`);
    
            hasNextPage = data.mu.games.pagination.has_next_page;
            games = games.concat(data.mu.games.data);

            await sleep(300);
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
        const page = {
            component: path.resolve(`./src/templates/GamesByYear.jsx`),
            context: {
                year,
                firstYearWithGames,
                lastYearWithGames,
            },
        };

        createPage({
            path: `jeux-de-${year}`,
            ...page,
        });

        ['europe', 'japon', 'etats-unis'].forEach((region) => {
            createPage({
                path: `jeux-de-${year}/${region}`,
                ...page,
            });
        });
    });

    const games = await getGames(graphql);
    
    for (const game of games) {
        createPage({
            path: game.slug,
            component: path.resolve('./src/templates/GameDetails.jsx'),
            context: { game },
        });

        await sleep(300);
    }
}
