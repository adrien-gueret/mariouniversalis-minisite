import React, { useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled, { ThemeContext, keyframes } from 'styled-components';

import { GameCard, YEAR_OF_LUIGI } from '../modules/games';
import MainLayout from '../modules/layouts/MainLayout';
import RegionContext from '../modules/regions/context';
import FLAGS from '../modules/regions/flags';
import REGION_LABELS from '../modules/regions/regionLabels';
import REGION_SLUGS from '../modules/regions/regionSlugs';
import RegionSwitcher from '../modules/regions/RegionSwitcher';
import { Block, Button } from '../modules/ui';

import luigiTheme from '../modules/theme/themes/luigi';

import ChevronLeft from '../modules/icons/ChevronLeft';
import ChevronRight from '../modules/icons/ChevronRight';

const CenteredBlock = styled(Block)`
  margin: auto;

  ${({ theme }) => theme.images.gamesByYearDecoration ? `
    h1::after {
      content: '';
      margin-left: ${theme.spacing(1)};
      display: inline-block;
      vertical-align: middle;
      width: 150px;
      height: 150px;
      background-image: url(${theme.images.gamesByYearDecoration});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  ` : ''}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing(3)};
  margin: ${({ theme }) => theme.spacing(6, 0)};

  ${({ theme }) => theme.breakpoints.up('md')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${({ theme }) => theme.breakpoints.up('lg')} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const shadeAnimation = keyframes`
  from {
    opacity: 0.1;
  }

  to {
    opacity 1;
  }
`;

const GridGameItem = styled(GameCard)`
  opacity: 0.1;
  animation: 300ms ${shadeAnimation} ease-in 1 forwards;
`;

const ReleaseDate = styled.div`
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const Flag = styled.img`
  margin: ${({ theme }) => theme.spacing(2, 1, 0, 0)};
  cursor: help;
`;

const YearNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top:  ${({ theme }) => theme.spacing(4)};
  margin-bottom: 60px;
  position: relative;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-bottom: 0;
  }
`;

const YearLabel = styled.span`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: inline;
  }
`;

const PrevYearButton = styled(Button)`margin-right: auto;`;
const NextYearButton = styled(Button)`margin-left: auto;`;
const SelectYearButton = styled(Button)`
  margin: auto;
  position: absolute;
  top: 60px;
  left:  ${({ theme }) => theme.spacing(8)};
  right:  ${({ theme }) => theme.spacing(8)};

  ${({ theme }) => theme.breakpoints.up('sm')} {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
  }
`;

export default function GamesByYear({ data, pageContext, ...otherProps }) {
  const { setTheme } = useContext(ThemeContext);
  const { region } = useContext(RegionContext);

  const currentYear = new Date().getFullYear();
  const isCurrentYear = pageContext.year === currentYear;
  const isFutureYear = pageContext.year > currentYear;
  const isYearOfLuigi = pageContext.year === YEAR_OF_LUIGI;
  
  const allGames = data.mu[`allGames_${region}`].data;
  const totalGames = allGames.length;

  const unreleasedGameIds = data.mu[`unreleasedGames_${region}`].data.map(({ id }) => id);
  const totalUnreleasedGames = unreleasedGameIds.length;

  const totalReleasedGames = totalGames - totalUnreleasedGames;

  const isFirstYear = pageContext.year <= pageContext.firstYearWithGames;
  const isLastYear = pageContext.year >= pageContext.lastYearWithGames;

  useEffect(() => {
    if (isYearOfLuigi) {
      setTheme(luigiTheme);
    } else {
      setTheme();
    }

    return () => setTheme();
  }, [isYearOfLuigi, setTheme]);

  useEffect(() => {
    localStorage.setItem('year', pageContext.year);
  }, [pageContext.year]);
  
  return (
    <MainLayout isYearOfLuigi={isYearOfLuigi}>
      <Helmet>
        <title>{ `Liste des jeux de ${pageContext.year} - Mario Universalis` }</title>
        <meta name="description" content={`Liste des jeux Super Mario de l'année ${pageContext.year}`} />
      </Helmet>
      <CenteredBlock
        title={`Liste des jeux de ${pageContext.year}`}
        titleComponent="h1"
      >
        { totalGames > 0 ? (
          <>
            { Boolean(totalReleasedGames) && (
              <div>
                { totalReleasedGames > 1 ? (
                  <>
                    <strong>{ totalReleasedGames }</strong>
                    { ' jeux sont sortis ' }
                    <RegionSwitcher year={pageContext.year} />
                    {isCurrentYear ? ' cette année' : ` en ${pageContext.year}`}.
                  </>
                ) : (
                  <>
                    <strong>Un seul</strong>
                    { ' jeu est sorti' }
                    <RegionSwitcher year={pageContext.year} />
                    {isCurrentYear ? ' cette année' : ` en ${pageContext.year}`}.</>
                )}
              </div>
            )}
            
            { Boolean(totalUnreleasedGames) && (
              <p>
                { totalUnreleasedGames > 1 ? (
                  <>Il reste encore <strong>{ totalUnreleasedGames }</strong> jeux en attente de sortie !</>
                ) : (
                  <>Il reste encore <strong>un</strong> jeu en attente de sortie !</>
                )}
              </p>
            )}

            <Grid>
              { 
                allGames.map((game, index) => {
                  const { id, releaseDate, releaseYear } = game;
                  const isReleased = !unreleasedGameIds.includes(id);
                  let releaseDateContent = null;

                  if (Boolean(releaseDate)) {
                    const isOnSpecificRegion = typeof releaseDate === 'string';

                    if (isOnSpecificRegion) {
                      releaseDateContent = (
                        <ReleaseDate>
                            { !isReleased && 'Prévu le'} { releaseDate }
                        </ReleaseDate>
                      );
                    } else {
                      const isGlobalRelease = releaseDate.eur === releaseDate.usa && releaseDate.usa === releaseDate.jap;

                      if (isGlobalRelease) {
                        releaseDateContent = (
                          <Flag
                              src={FLAGS.all}
                              alt={`Sortie mondiale le ${releaseDate.eur}`}
                              title={`Sortie mondiale le ${releaseDate.eur}`}
                          />
                        );
                      } else {
                        releaseDateContent = Object
                          .keys(releaseYear)
                          .filter((region) => +releaseYear[region] === pageContext.year)
                          .map((region) => (
                              <Flag
                                  key={region}
                                  src={FLAGS[region]}
                                  alt={`Sorti le ${releaseDate[region]} ${REGION_LABELS[region]}`}
                                  title={`Sorti le ${releaseDate[region]} ${REGION_LABELS[region]}`}
                              />
                        ));
                      }
                    }
                  }

                  return (
                    <GridGameItem
                      key={game.id}
                      name={game.name}
                      image={game.image}
                      slug={game.slug}
                      imagePreview={game.imagePreview}
                      deviceName={game.device.name}
                      deviceLogo={game.device.logo}
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      { releaseDateContent }
                    </GridGameItem>
                  );
                })
              }
            </Grid>
          </>
        ) : (
          <>
            <p>
              Aucun jeu Mario n'est sorti
              <RegionSwitcher year={pageContext.year} />
              {(isCurrentYear || isFutureYear) && ' pour le moment' }
              cette année-là...
            </p>
          </>
        )}

        <YearNavigation>
          <PrevYearButton
            style={{ visibility: isFirstYear ? 'hidden' : 'visible' }}
            $primary
            as={isFirstYear ? 'span' : Link}
            to={isFirstYear ? void 0 : `/jeux-de-${pageContext.year - 1}${REGION_SLUGS[region]}`}
          >
            <ChevronLeft />
            <span><YearLabel>Année </YearLabel>{pageContext.year - 1}</span>
          </PrevYearButton>

          <SelectYearButton as={Link} to="/selectionner-annee">
            <span>Autre année</span>
          </SelectYearButton>
          
         
            <NextYearButton
              style={{ visibility: isLastYear ? 'hidden' : 'visible' }}
              $primary
              as={isLastYear ? 'span' : Link}
              to={isLastYear ? void 0 : `/jeux-de-${pageContext.year + 1}${REGION_SLUGS[region]}`}
            >
              <span><YearLabel>Année </YearLabel>{pageContext.year + 1}</span>
              <ChevronRight />
            </NextYearButton>
         
        </YearNavigation>
            
      </CenteredBlock>
    </MainLayout>
  );
}

export const query = graphql`
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
      allGames_eur: games(release_year: { eur: $year }, per_page: 20, order_by: { field: release_date_eur }) {
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

      allGames_usa: games(release_year: { usa: $year }, per_page: 20, order_by: { field: release_date_usa }) {
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

      allGames_jap: games(release_year: { jap: $year }, per_page: 20, order_by: { field: release_date_jap }) {
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
        per_page: 20,
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
  }
`;
