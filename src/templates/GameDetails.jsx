import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import ChevronLeft from '../modules/icons/ChevronLeft';
import External from '../modules/icons/External';
import MainLayout from '../modules/layouts/MainLayout';
import { Block, Button, Image } from '../modules/ui';

import flagEUR from './images/eur.png';
import flagUSA from './images/usa.png';
import flagJAP from './images/jap.png';

const FLAGS = {
  eur: flagEUR,
  usa: flagUSA,
  jap: flagJAP,
};

const FLAGS_ALTS = {
  eur: 'Sortie européenne',
  usa: 'Sortie américaine',
  jap: 'Sortie japonaise'
};

const CenteredBlock = styled(Block)`
  margin: auto;
`;

const ImageContainer = styled.div`
  margin: auto;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 50%;     
  }
`;

const Description = styled.p`
  margin-top: ${({ theme }) => theme.spacing(5)};
  margin-bottom: ${({ theme }) => theme.spacing(5)};
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  border-left: 10px solid;
  padding-left: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.typography.variants.body2}

  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 75%;     
  }
`;

const GameDataList = styled.dl`
  text-align: left;
`;

const MainGameDataList = styled(GameDataList)`
  background: ${({ theme }) => theme.palette.background.secondary};
  padding: ${({ theme }) => theme.spacing(2)};
  display: inline-block;
  border-radius: 8px;
`;

const GameDataTitle = styled.dt`
  ${({ theme }) => theme.typography.variants.subtitle}
  margin-top: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const ReleaseDateFlag = styled(GameDataTitle)`
  margin: 0; 
  top: ${({ theme }) => theme.spacing(1.5)};
  position: relative;
`;

const DeviceLogo = styled.img`
  vertical-align: top;
  margin-right: ${({ theme }) => theme.spacing(1)};
`;

const GameDataInfo = styled.dd`
  ${({ theme }) => theme.typography.variants.body1}
`;

const ReleaseDateInfo = styled(GameDataInfo)`
  top: -${({ theme }) => theme.spacing(1.5)};
  position: relative;
`;

const Caption = styled.span`
  ${({ theme }) => theme.typography.variants.caption}
  color: ${({ theme }) => theme.palette.text.light};
`;

const ExternalLink = styled.a`
  vertical-align: middle;

  & svg {
    width: ${({ theme }) => theme.spacing(2)};
    vertical-align: middle;
    margin-left: ${({ theme }) => theme.spacing(0.5)};
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(4)};
`;

const YearLabel = styled.span`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: inline;
  }
`;

const PrevYearButton = styled(Button)`margin-right: auto;`;

export default function GameDetails({ data }) {
  const { game } = data.mu;

  return (
    <MainLayout>
      <Helmet>
        <title>{ `${game.name} - Mario Universalis` }</title>
        <meta name="description" content={game.description} />
      </Helmet>
      <CenteredBlock
        title={game.name}
        titleComponent="h1"
      >
        <ImageContainer>
          <Image
              src={game.image}
              previewSrc={game.imagePreview}
              alt={game.name}
              width="100%"
              height={400}
          />
        </ImageContainer>
    
        <Description>
          { game.description }
        </Description>

        <MainGameDataList>
          <GameDataTitle>Appareil</GameDataTitle>
          <GameDataInfo>
            <DeviceLogo
              src={game.device.logo}
              alt={`${game.device.name}`}
            />

            <Caption>({ game.device.name })</Caption>   
          </GameDataInfo>

          { /*game.popularity && (
            <>
              <GameDataTitle>Note moyenne (moyenne bayésienne)</GameDataTitle>
              <GameDataInfo>{ game.popularity }</GameDataInfo>
            </>
          ) */}

          <GameDataTitle>Dates de sortie</GameDataTitle>

          <GameDataInfo>
            <GameDataList>
              { ['eur', 'usa', 'jap'].map((region) => {
                const releaseDate = game.releaseDate[region];
                const hasReleaseData = Boolean(releaseDate);

                if (!hasReleaseData) {
                  return null;
                }

                const ageInYears = game.age[region];
                const ageInDays = game.ageInDays[region];
                const isReleased = game.isReleased[region];
                
                let ageLabel = '';

                if (isReleased) {
                  if (ageInYears === 0) {
                    ageLabel = ` (${['Aujourd\'hui !', 'Hier !', 'Avant-hier !'][ageInDays] || `il y a ${ageInDays} jours`})`;
                  } else {
                    ageLabel = ` (${ageInYears} an${ageInYears > 1 ? 's': ''})`
                  }
                } else {
                  const daysBeforeAnniversary = game.daysBeforeAnniversary[region];
                  const isPlanned = daysBeforeAnniversary !== null;
                  const isBlurryDate = releaseDate.indexOf('?') >= 0;

                  const blurryLabel = isBlurryDate ? ' au moins' : '';

                  if (isPlanned) {
                    ageLabel = ` (${['Aujourd\'hui !', 'Demain !', 'Après-demain !'][daysBeforeAnniversary] || `dans${blurryLabel} ${daysBeforeAnniversary} jour${daysBeforeAnniversary > 1 ? 's': ''}`})`;
                  }
                }

                return (
                  <React.Fragment key={region}>
                    <ReleaseDateFlag>
                      <img
                        src={FLAGS[region]}
                        alt={FLAGS_ALTS[region]}
                        title={FLAGS_ALTS[region]}
                      />
                    </ReleaseDateFlag>
                    <ReleaseDateInfo>
                      { game.releaseDate[region] }
                      { ageLabel && <Caption>{ ageLabel }</Caption> }
                    </ReleaseDateInfo>
                  </React.Fragment>
                );
              }) }
            </GameDataList>
          </GameDataInfo>

          <GameDataTitle>Manuel</GameDataTitle>
          <GameDataInfo>
          { game.manualURL ? (
            <ExternalLink href={game.manualURL} target="_blank">
              Voir le manuel de "{ game.name }"
              <External />
            </ExternalLink>
          ) : <Caption>Nous ne possédons pas le manuel de ce jeu.</Caption>}
          </GameDataInfo>
        </MainGameDataList>

        <Footer>
          { game.releaseYear && (
            <PrevYearButton $primary as={Link} to={`/jeux-de-${game.releaseYear}`}>
              <ChevronLeft />
              <span><YearLabel>Voir les autres jeux sortis en </YearLabel>{game.releaseYear}</span>
            </PrevYearButton>
          )}
        </Footer>

      </CenteredBlock>
    </MainLayout>
  );
}

export const query = graphql`
  query($id: ID!) {
    mu {
      game(id: $id) {
        id
        name
        description: description_fr
        image
        imagePreview: image(hq: false)
        releaseDate: release_date(region: all, format: "DD/MM/YYYY")
        releaseYear: release_date(region: eur, format: "YYYY")
        isReleased: is_released(region: all)
        daysBeforeAnniversary: days_before_anniversary
        age(region: all)
        ageInDays: age(unit: days, region: all)
        manualURL
        popularity
        device {
          name
          logo
        }
      }
    }
  }
`;
