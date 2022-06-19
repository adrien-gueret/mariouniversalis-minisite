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
        } while (hasNextPage);

        return games;
    }
})();

const getYearsData = (() => {
    let yearData = null;

    return async (activeYears, graphql) => {
        if (yearData) {
            return yearData;
        }

        yearData = {};

        await Promise.all(activeYears.map(async (year) => {
            const { data } = await graphql(`
            fragment GameFragment on MU_Game {
                id
                slug(withId: true)
                name
                image
                imagePreview: image(hq: false)
                device {
                    name
                    logo
                }
            }

            query($year: Int!) {
                mu {
                    allGames_eur: games(release_year: { eur: $year }, per_page: 30, order_by: { field: release_date_eur }) {
                        data {
                        ...GameFragment
                        releaseDate: release_date(region: eur, format: "DD/MM/YYYY")
                        }
                    }

                    unreleasedGames_eur: games(release_year: { eur: $year }, has_been_released: { eur: false }) {
                        data {
                        id
                        }
                    }

                    allGames_usa: games(release_year: { usa: $year }, per_page: 30, order_by: { field: release_date_usa }) {
                        data {
                        ...GameFragment
                        releaseDate: release_date(region: usa, format: "DD/MM/YYYY")
                        }
                    }

                    unreleasedGames_usa: games(release_year: { usa: $year }, has_been_released: { usa: false }) {
                        data {
                        id
                        }
                    }

                    allGames_jap: games(release_year: { jap: $year }, per_page: 30, order_by: { field: release_date_jap }) {
                        data {
                        ...GameFragment
                        releaseDate: release_date(region: jap, format: "DD/MM/YYYY")
                        }
                    }

                    unreleasedGames_jap: games(release_year: { jap: $year }, has_been_released: { jap: false }) {
                        data {
                        id
                        }
                    }

                    allGames_all: games(
                        release_year: { eur: $year, jap: $year, usa: $year, operator: OR },
                        per_page: 30,
                        order_by: { field: release_date_eur, then: { field: release_date_usa, then: { field: release_date_jap } } }
                    ) {
                        data {
                        ...GameFragment
                        releaseDate: release_date(region: all, format: "DD/MM/YYYY")
                        releaseYear: release_date(region: all, format: "YYYY")
                        }
                    }

                    unreleasedGames_all: games(
                        release_year: { eur: $year, jap: $year, usa: $year, operator: OR },
                        has_been_released: { eur: false, jap: false, usa: false, operator: AND }
                    ) {
                        data {
                        id
                        }
                    }
                }
            }`, { year });

            yearData[year] = data.mu;
        }));

        return yearData;
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

    const yearsData = await getYearsData(activeYears, graphql);

    activeYears.forEach((year) => {
        const yearData = yearsData[year];

        if (!yearData) {
            return;
        }

        const page = {
            component: path.resolve(`./src/templates/GamesByYear.jsx`),
            context: {
                yearData,
                year,
                isFirstYear: year <= firstYearWithGames,
                isLastYear: year >= lastYearWithGames,
            },
        };

        console.log(page);

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
    }
}
