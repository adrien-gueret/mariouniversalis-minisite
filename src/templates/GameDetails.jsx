import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import External from '../modules/icons/External';
import MainLayout from '../modules/layouts/MainLayout';
import { Block, Image } from '../modules/ui';

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

            { ' ' }

            <Caption>({ game.device.name })</Caption>   
          </GameDataInfo>

          <GameDataTitle>Dates de sortie</GameDataTitle>

          <GameDataInfo>
            <GameDataList>
              { ['eur', 'usa', 'jap'].map((region) => (
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
                    { ' ' }
                    ({ game.age[region] } ans)
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
        age(region: all)
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
