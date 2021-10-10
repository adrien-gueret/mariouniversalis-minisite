import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import VideoCard from '../modules/games/components/VideoCard';
import ChevronLeft from '../modules/icons/ChevronLeft';
import External from '../modules/icons/External';
import MainLayout from '../modules/layouts/MainLayout';
import RegionContext from '../modules/regions/context';
import FLAGS from '../modules/regions/flags';
import SLUGS from '../modules/regions/regionSlugs';
import { Block, Button, Image, InfoTooltip, ConfettiLuncher } from '../modules/ui';

import warioSign from './images/wario_sign.png';

const FLAGS_ALTS = {
  eur: 'Sortie européenne',
  usa: 'Sortie américaine',
  jap: 'Sortie japonaise',
  all: 'Sortie mondiale',
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
  display: flex;
  flex-wrap: wrap;
`;

const PopularityInfo = styled(GameDataInfo)`
  background-image: url(${warioSign});
  height: 75px;
  width: 100px;
  position: relative;
`;

const PopularityValue = styled.span`
  color: ${({ theme }) => theme.palette.text.contrasted};
  position: absolute;
  right: 3px;
  top: 7px;
  display: block;
  width: 54px;
  text-align: center;
  font-weight: bold;
  transform: rotate(19deg);
`;

const ReleaseDateInfo = styled(GameDataInfo)`
  top: -${({ theme }) => theme.spacing(1.5)};
  position: relative;
`;

const ReleaseDate = styled.span`
  margin-right: ${({ theme }) => theme.spacing(0.5)};
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

const InfoTooltipContainer = styled(InfoTooltip)`
  margin-left: ${({ theme }) => theme.spacing(.5)};
  vertical-align: bottom;
`;

const VideoContainer = styled.section`
  text-align: left;
`;

const Grid = styled.ul`
  
  list-style: none;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing(6, 0)};

  &>li {
    margin-bottom: ${({ theme }) => theme.spacing(3)};
  }

  ${({ theme }) => theme.breakpoints.up('sm')} {
    display: grid;
    grid-template-columns: repeat(auto-fill, 480px);
    grid-gap: ${({ theme }) => theme.spacing(3)};
  }
`;

export default function GameDetails({ data }) {
  const [ isFirstRender, setIsFirstRender ]= useState(true);
  
  useEffect(() => {
    setIsFirstRender(false);
  }, [setIsFirstRender]);

  const { region: currentRegion } = useContext(RegionContext);
  
  const { game } = data.mu;
  const { videos } = game;

  const popularity = Math.round(game.popularity * 10) / 10;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: game.description,
    image: game.image,
    url: `https://www.mariouniversalis.fr/${game.slug}`,
    genre: game.genres.map(({ name }) => name).join(' '),
    gamePlatform: [game.device.name],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: popularity,
      worstRating: 0,
      bestRating: 20,
      ratingCount: game.totalRatings,
    },
    video: videos.data.map(({ id, title, thumbnail, channel, description, publishDate }) => ({
      '@type': 'VideoObject',
      name: title,
      author: channel,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      thumbnailUrl: thumbnail.url,
      description: description,
      uploadDate: publishDate,
    })),
  };

  if (game.manualURL) {
    jsonld.gameTip = game.manualUrl;
  }

  const title = `${game.name} - Mario Universalis`;
  let shouldRenderConfetti = false;

  const isGlobalRelease = game.releaseDate.eur === game.releaseDate.usa && game.releaseDate.usa === game.releaseDate.jap;
  const regionsToCheck = isGlobalRelease ? ['eur'] : ['eur', 'usa', 'jap'];

  const ageLabels = regionsToCheck
  .filter((region) => Boolean(game.releaseDate[region]))
  .map((region) => {
    const releaseDate = game.releaseDate[region];
    const ageInYears = game.age[region];
    const ageInDays = game.ageInDays[region];
    const isReleased = game.isReleased[region];
    
    let ageLabel = '';

    if (isReleased) {
      if (ageInYears === 0) {
        ageLabel = ` (${['Aujourd\'hui !', 'Hier', 'Avant-hier'][ageInDays] || `il y a ${ageInDays} jours`})`;
      } else {
        const splittedReleaseDate = releaseDate.split('/');
        const anniversaryDay = +splittedReleaseDate[0];
        const anniversaryMonth = +splittedReleaseDate[1];
        const today = new Date();

        const isAnniversaryToday = anniversaryDay === today.getDate() && anniversaryMonth === today.getMonth() + 1;

        shouldRenderConfetti = shouldRenderConfetti || isAnniversaryToday;

        ageLabel = ` (${ageInYears} an${ageInYears > 1 ? 's': ''}${isAnniversaryToday ? ' - Anniversaire aujour\'hui ! 🎉' : ''})`;
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

    return { region, flagRegion: isGlobalRelease ? 'all' : region, ageLabel };
  });

  const isSSR = typeof window === 'undefined';
  const releaseYear =  game.releaseYear[currentRegion]
    || (!isSSR && +localStorage.getItem('year'))
    || game.releaseYear.eur || game.releaseYear.usa || game.releaseYear.jap;

  return (
    <MainLayout>
      <Helmet>
        <title>{ title }</title>
        <meta name="title" content={ title } />
        <meta name="description" content={game.description} />


        { /* Open Graph / Facebook */ }
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.mariouniversalis.fr/minisite/${game.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={game.description} />
        <meta property="og:image" content={game.image} />

        { /* Twitter */ }
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.mariouniversalis.fr/minisite/${game.slug}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={game.description} />
        <meta property="twitter:image" content={game.image} />
      </Helmet>
      
      { (shouldRenderConfetti && !isFirstRender) && <ConfettiLuncher /> }

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
    
        <Description>{ game.description }</Description>

        <MainGameDataList>
          <GameDataTitle>Appareil</GameDataTitle>
          <GameDataInfo>
            <DeviceLogo
              src={game.device.logo}
              alt={`${game.device.name}`}
            />

            <Caption>({ game.device.name })</Caption>   
          </GameDataInfo>

          { game.popularity && (
            <>
              <GameDataTitle>
                Popularité
                <InfoTooltipContainer
                  title={`Moyenne bayésienne sur 20 calculée sur un total de ${game.totalRatings} note${game.totalRatings > 1 ? 's' : ''}`}
                />
              </GameDataTitle>
              <PopularityInfo>
                <PopularityValue>{ popularity }</PopularityValue>
              </PopularityInfo>
            </>
          ) }

          <GameDataTitle>{ `Date${isGlobalRelease ? '' : 's'} de sortie` }</GameDataTitle>

          <GameDataInfo>
            <GameDataList>
              { ageLabels.map(({ region, flagRegion, ageLabel }) => (
                  <React.Fragment key={region}>
                    <ReleaseDateFlag>
                      <img
                        src={FLAGS[flagRegion]}
                        alt={FLAGS_ALTS[flagRegion]}
                        title={FLAGS_ALTS[flagRegion]}
                      />
                    </ReleaseDateFlag>
                    <ReleaseDateInfo>
                      <ReleaseDate>{ game.releaseDate[region] }</ReleaseDate>
                      { ageLabel && <Caption>{ ageLabel }</Caption> }
                    </ReleaseDateInfo>
                  </React.Fragment>
                )) }
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

        { Boolean(videos.data.length) && (
          <VideoContainer>
            <h2>Vidéo{videos.data.length > 1 ? 's' : ''} autour de ce jeu</h2>

            <Grid>
              { videos.data.map(({ id, title, thumbnail, channel }) => (
                <li key={id}>
                  <VideoCard
                    title={title}
                    thumbnailWidth={thumbnail.width}
                    thumbnailHeight={thumbnail.height}
                    channel={channel.title}
                    videoId={id}
                  />
                </li>
              )) }
            </Grid>
          </VideoContainer>
        )}
        

        <Footer>
          { releaseYear && (
            <PrevYearButton $primary as={Link} to={`/jeux-de-${releaseYear}${SLUGS[currentRegion]}`}>
              <ChevronLeft />
              <span><YearLabel>Voir les autres jeux sortis en </YearLabel>{releaseYear}</span>
            </PrevYearButton>
          )}
        </Footer>

        <script type="application/ld+json">{JSON.stringify(jsonld)}</script>

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
        slug
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
`;
