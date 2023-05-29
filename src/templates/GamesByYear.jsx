import React, { useEffect, useContext } from "react";
import { Link } from "gatsby";
import styled, { ThemeContext } from "styled-components";

import Metas from "../modules/app/components/Metas";
import { GridGames, YEAR_OF_LUIGI } from "../modules/games";
import MainLayout from "../modules/layouts/MainLayout";
import RegionContext from "../modules/regions/context";
import FLAGS from "../modules/regions/flags";
import REGION_LABELS from "../modules/regions/regionLabels";
import REGION_SLUGS from "../modules/regions/regionSlugs";
import RegionSwitcher from "../modules/regions/RegionSwitcher";
import { Block, Button, NotFound } from "../modules/ui";

import luigiTheme from "../modules/theme/themes/luigi";

import ChevronLeft from "../modules/icons/ChevronLeft";
import ChevronRight from "../modules/icons/ChevronRight";

const CenteredBlock = styled(Block)`
  margin: auto;

  ${({ theme }) =>
    theme.images.gamesByYearDecoration
      ? `
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
  `
      : ""}
`;

const Grid = styled(GridGames)`
  margin: ${({ theme }) => theme.spacing(6, 0)};
  margin-left: auto;
  margin-right: auto;
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
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: 60px;
  position: relative;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    margin-bottom: 0;
  }
`;

const YearLabel = styled.span`
  display: none;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: inline;
  }
`;

const PrevYearButton = styled(Button)`
  margin-right: auto;
`;
const NextYearButton = styled(Button)`
  margin-left: auto;
`;
const SelectYearButton = styled(Button)`
  margin: auto;
  position: absolute;
  top: 60px;
  left: ${({ theme }) => theme.spacing(8)};
  right: ${({ theme }) => theme.spacing(8)};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
  }
`;

export default function GamesByYear({ pageContext }) {
  const { setTheme } = useContext(ThemeContext);
  const { region } = useContext(RegionContext);

  const { isFirstYear, isLastYear, year, yearData } = pageContext;

  const currentYear = new Date().getFullYear();
  const isCurrentYear = year === currentYear;
  const isFutureYear = year > currentYear;
  const isYearOfLuigi = year === YEAR_OF_LUIGI;

  const allGames = yearData[`allGames_${region}`].data;
  const totalGames = allGames.length;

  const unreleasedGameIds = yearData[`unreleasedGames_${region}`].data.map(
    ({ id }) => id
  );
  const totalUnreleasedGames = unreleasedGameIds.length;

  const totalReleasedGames = totalGames - totalUnreleasedGames;

  useEffect(() => {
    if (isYearOfLuigi) {
      setTheme(luigiTheme);
    } else {
      setTheme();
    }

    return () => setTheme();
  }, [isYearOfLuigi, setTheme]);

  useEffect(() => {
    localStorage.setItem("year", year);
  }, [year]);

  const title = isYearOfLuigi
    ? `Liste des jeux de ${year}, l'année de Luigi !`
    : `Liste des jeux de ${year}`;
  const description = isYearOfLuigi
    ? `Liste des jeux de Super Mario sortis en ${year}, l'année de Luigi !`
    : `Liste des jeux Super Mario sortis durant l'année ${year}.`;

  return (
    <MainLayout isYearOfLuigi={isYearOfLuigi}>
      <Metas title={title} description={description} />
      <CenteredBlock title={`Liste des jeux de ${year}`} titleComponent="h1">
        {totalGames > 0 ? (
          <>
            {Boolean(totalReleasedGames) && (
              <div>
                {totalReleasedGames > 1 ? (
                  <>
                    <strong>{totalReleasedGames}</strong>
                    {" jeux sont sortis "}
                    <RegionSwitcher year={year} />
                    {isCurrentYear ? " cette année" : ` en ${year}`}.
                  </>
                ) : (
                  <>
                    <strong>Un seul</strong>
                    {" jeu est sorti"}
                    <RegionSwitcher year={year} />
                    {isCurrentYear ? " cette année" : ` en ${year}`}.
                  </>
                )}
              </div>
            )}

            {Boolean(totalUnreleasedGames) && (
              <p>
                {totalUnreleasedGames > 1 ? (
                  <>
                    Il reste encore <strong>{totalUnreleasedGames}</strong> jeux
                    en attente de sortie !
                  </>
                ) : (
                  <>
                    Il reste encore <strong>un</strong> jeu en attente de sortie
                    !
                  </>
                )}
              </p>
            )}

            <Grid>
              {allGames.map((game, index) => {
                const { id, releaseDate, releaseYear } = game;
                const isReleased = !unreleasedGameIds.includes(id);
                let releaseDateContent = null;

                if (Boolean(releaseDate)) {
                  const isOnSpecificRegion = typeof releaseDate === "string";

                  if (isOnSpecificRegion) {
                    releaseDateContent = (
                      <ReleaseDate>
                        {!isReleased && "Prévu le"} {releaseDate}
                      </ReleaseDate>
                    );
                  } else {
                    const isGlobalRelease =
                      releaseDate.eur === releaseDate.usa &&
                      releaseDate.usa === releaseDate.jap;

                    if (isGlobalRelease) {
                      releaseDateContent = (
                        <Flag
                          src={FLAGS.all}
                          alt={`Sortie mondiale le ${releaseDate.eur}`}
                          title={`Sortie mondiale le ${releaseDate.eur}`}
                        />
                      );
                    } else {
                      releaseDateContent = Object.keys(releaseYear)
                        .filter(region => +releaseYear[region] === year)
                        .map(region => (
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
                  <GridGames.Item
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
                    {releaseDateContent}
                  </GridGames.Item>
                );
              })}
            </Grid>
          </>
        ) : (
          <NotFound>
            Aucun jeu Mario n'est{" "}
            {isCurrentYear || isFutureYear
              ? " prévu pour le moment "
              : " sorti "}
            <RegionSwitcher year={year} />
            en {year}.
          </NotFound>
        )}

        <YearNavigation>
          <PrevYearButton
            style={{ visibility: isFirstYear ? "hidden" : "visible" }}
            $primary
            as={isFirstYear ? "span" : Link}
            to={
              isFirstYear
                ? void 0
                : `/jeux-de-${year - 1}${REGION_SLUGS[region]}`
            }
          >
            <ChevronLeft />
            <span>
              <YearLabel>Année </YearLabel>
              {year - 1}
            </span>
          </PrevYearButton>

          <SelectYearButton as={Link} to="/selectionner-annee">
            <span>Autre année</span>
          </SelectYearButton>

          <NextYearButton
            style={{ visibility: isLastYear ? "hidden" : "visible" }}
            $primary
            as={isLastYear ? "span" : Link}
            to={
              isLastYear
                ? void 0
                : `/jeux-de-${year + 1}${REGION_SLUGS[region]}`
            }
          >
            <span>
              <YearLabel>Année </YearLabel>
              {year + 1}
            </span>
            <ChevronRight />
          </NextYearButton>
        </YearNavigation>
      </CenteredBlock>
    </MainLayout>
  );
}
