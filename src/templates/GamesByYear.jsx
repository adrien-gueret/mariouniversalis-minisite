import React, { useLayoutEffect, useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled, { ThemeContext } from 'styled-components';

import { GameCard, YEAR_OF_LUIGI } from '../modules/games';
import MainLayout from '../modules/layouts/MainLayout';
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

const GridGameItem = styled(GameCard)`
  opacity: 0;
  transition: opacity 300ms;
`;

const YearNavigation = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top:  ${({ theme }) => theme.spacing(4)};
`;

const YearLabel = styled.span`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: inline;
  }
`;

const PrevYearButton = styled(Button)`margin-right: auto;`;
const NextYearButton = styled(Button)`margin-left: auto;`;
const SelectYearButton = styled(Button)`margin: auto;`;

export default function GamesByYear({ data, pageContext }) {
  const [isInit, setIsInit] = useState(false);

  const currentYear = new Date().getFullYear();
  const isCurrentYear = pageContext.year === currentYear;
  const isYearOfLuigi = pageContext.year === YEAR_OF_LUIGI;
  
  const allGames = data.mu.allGames.data;
  const totalGames = allGames.length;

  const unreleasedGameIds = data.mu.unreleasedGames.data.map(({ id }) => id);
  const totalUnreleasedGames = unreleasedGameIds.length;

  const totalReleasedGames = totalGames - totalUnreleasedGames;

  const { setTheme } = useContext(ThemeContext);

  const isFirstYear = pageContext.year <= pageContext.firstYearWithGames;
  const isLastYear = pageContext.year >= pageContext.lastYearWithGames;

  useLayoutEffect(() => {
    setIsInit(true);
  }, []);

  useEffect(() => {
    if (isYearOfLuigi) {
      setTheme(luigiTheme);
    } else {
      setTheme();
    }

    return () => setTheme();
  }, [isYearOfLuigi, setTheme]);

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
              <p>
                { totalReleasedGames > 1 ? (
                  <><strong>{ totalReleasedGames }</strong> jeux sont sortis {isCurrentYear ? ' cette année' : ` en ${pageContext.year}`}.</>
                ) : (
                  <><strong>Un seul</strong> jeu est sorti {isCurrentYear ? ' cette année' : ` en ${pageContext.year}`}.</>
                )}
              </p>
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
                allGames.map((game, index) => (
                  <GridGameItem
                    key={game.id}
                    name={game.name}
                    image={game.image}
                    slug={game.slug}
                    imagePreview={game.imagePreview}
                    deviceName={game.device.name}
                    deviceLogo={game.device.logo}
                    releaseDate={game.releaseDate}
                    isReleased={!unreleasedGameIds.includes(game.id)}
                    style={{
                      opacity: (isInit || index === 0) ? 1 : 0,
                      transitionDelay: `${(index - 1) * 50}ms`,
                    }}
                  >
                    { game.description }
                  </GridGameItem>
                ))
              }
            </Grid>
          </>
        ) : (
          <>
            <p>
              Cette année ne possède aucun jeu Mario{isCurrentYear && ' pour le moment' }...
            </p>
          </>
        )}

        <YearNavigation>
          <PrevYearButton
            style={{ visibility: isFirstYear ? 'hidden' : 'visible' }}
            $primary
            as={isFirstYear ? 'span' : Link}
            to={isFirstYear ? void 0 : `/jeux-de-${pageContext.year - 1}`}
          >
            <ChevronLeft />
            <span><YearLabel>Année </YearLabel>{pageContext.year - 1}</span>
          </PrevYearButton>

          <SelectYearButton as={Link} to="/selectionner-annee">
            <span>Autre <YearLabel>année</YearLabel></span>
          </SelectYearButton>
          
         
            <NextYearButton
              style={{ visibility: isLastYear ? 'hidden' : 'visible' }}
              $primary
              as={isLastYear ? 'span' : Link}
              to={isLastYear ? void 0 : `/jeux-de-${pageContext.year + 1}`}
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
  query($year: Int!) {
    mu {
      allGames: games(release_year: { eur: $year }, per_page: 20, order_by: { field: release_date_eur }) {
        data {
          id
          slug(withId: true)
          name
          description: description_fr
          image
          imagePreview: image(hq: false)
          releaseDate: release_date(region: eur, format: "DD/MM/YYYY")
          device {
            name
            logo
          }
        }
      }

      unreleasedGames: games(release_year: { eur: $year }, has_been_released: { eur: false }) {
        data {
          id
        }
      }
    }
  }
`;
