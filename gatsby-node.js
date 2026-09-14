const path = require(`path`);

const getGames = (() => {
  let games = [];

  return async graphql => {
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
                            releaseDateEur: release_date(region: eur, format: "YYYY-MM-DD")
                            releaseDateUsa: release_date(region: usa, format: "YYYY-MM-DD")
                            releaseDateJap: release_date(region: jap, format: "YYYY-MM-DD")
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
  };
})();

const regions = ["eur", "usa", "jap"];

const compareReleaseDates = regionsToCompare => (gameA, gameB) => {
  for (const region of regionsToCompare) {
    const suffix = `${region[0].toUpperCase()}${region.slice(1)}`;
    const dateA = gameA[`releaseDate${suffix}`];
    const dateB = gameB[`releaseDate${suffix}`];

    if (dateA === dateB) {
      continue;
    }

    if (dateA === null) {
      return -1;
    }

    if (dateB === null) {
      return 1;
    }

    const comparison = dateA
      .replace(/\?/g, "0")
      .localeCompare(dateB.replace(/\?/g, "0"));

    if (comparison !== 0) {
      return comparison;
    }
  }

  return +gameA.id - +gameB.id;
};

const toYearGame = (game, region) => ({
  id: game.id,
  slug: game.slug,
  name: game.name,
  image: game.image,
  imagePreview: game.imagePreview,
  device: game.device,
  releaseDate: region === "all" ? game.releaseDate : game.releaseDate[region],
  ...(region === "all" ? { releaseYear: game.releaseYear } : {}),
});

const buildYearsData = (activeYears, games) =>
  Object.fromEntries(
    activeYears.map(year => {
      const yearData = {};

      for (const region of [...regions, "all"]) {
        const regionsToMatch = region === "all" ? regions : [region];
        const matchingGames = games
          .filter(game =>
            regionsToMatch.some(
              gameRegion => +game.releaseYear[gameRegion] === year
            )
          )
          .sort(compareReleaseDates(regionsToMatch));

        yearData[`allGames_${region}`] = {
          data: matchingGames.map(game => toYearGame(game, region)),
        };
        yearData[`unreleasedGames_${region}`] = {
          data: games
            .filter(
              game =>
                regionsToMatch.some(
                  gameRegion => +game.releaseYear[gameRegion] === year
                ) &&
                regionsToMatch.every(
                  gameRegion => game.isReleased[gameRegion] === false
                )
            )
            .map(({ id }) => ({ id })),
        };
      }

      return [year, yearData];
    })
  );

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data: siteData } = await graphql(`
    query {
      site {
        siteMetadata {
          activeYears
        }
      }
    }
  `);

  const { activeYears } = siteData.site.siteMetadata;
  const [firstYearWithGames] = activeYears;
  const lastYearWithGames = activeYears[activeYears.length - 1];

  const games = await getGames(graphql);
  const yearsData = buildYearsData(activeYears, games);

  activeYears.forEach(year => {
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

    createPage({
      path: `jeux-de-${year}`,
      ...page,
    });

    ["europe", "japon", "etats-unis"].forEach(region => {
      createPage({
        path: `jeux-de-${year}/${region}`,
        ...page,
      });
    });
  });

  for (const game of games) {
    const { releaseDateEur, releaseDateUsa, releaseDateJap, ...gameData } =
      game;

    createPage({
      path: game.slug,
      component: path.resolve("./src/templates/GameDetails.jsx"),
      context: { game: gameData },
    });
  }

  const { data: queryResponse } = await graphql(`
    query {
      mu {
        approximarios(per_page: 100) {
          data {
            id
            content

            game {
              id
              slug(withId: true)
              name
              imagePreview: image(hq: false)
              image
            }
          }
        }
      }
    }
  `);

  createPage({
    path: "approximarios",
    component: path.resolve("./src/templates/ApproxiMarios.jsx"),
    context: { approximarios: queryResponse.mu.approximarios.data },
  });
};
