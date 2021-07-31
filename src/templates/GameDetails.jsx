import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';

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
  margin-top: ${({ theme }) => theme.spacing(3)};
  margin-left: auto;
  margin-right: auto;
  text-align: left;

  ${({ theme }) => theme.typography.variants.body1}

  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 75%;     
  }
`;

const GameDataList = styled.dl`
  text-align: left;
`;

const GameDataTitle = styled.dt`
  ${({ theme }) => theme.typography.variants.subtitle}
`;

const GameDataInfo = styled.dd`
  ${({ theme }) => theme.typography.variants.body1}
`;

const NoManual = styled.span`
  ${({ theme }) => theme.typography.variants.caption}
  color: ${({ theme }) => theme.palette.text.light};
`;

export default function GameDetails({ data }) {
  const { game } = data.mu;

  console.log(game);
  
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

        <GameDataList>
          <GameDataTitle>Appareil</GameDataTitle>
          <GameDataInfo>{ game.device.name }</GameDataInfo>

          <GameDataTitle>Dates de sortie</GameDataTitle>
          <GameDataInfo>
            <GameDataList>
              { ['eur', 'usa', 'jap'].map((region) => (
                <React.Fragment key={region}>
                  <GameDataTitle>
                    <img
                      src={FLAGS[region]}
                      alt={FLAGS_ALTS[region]}
                      title={FLAGS_ALTS[region]}
                    />
                  </GameDataTitle>
                  <GameDataInfo>
                    { game.releaseDate[region] }
                    { ' ' }
                    ( { game.age[region] } ans )
                  </GameDataInfo>
                </React.Fragment>
              )) }
            </GameDataList>
          </GameDataInfo>

          <GameDataTitle>Manuel</GameDataTitle>
          <GameDataInfo>
          { game.manualURL ? (
            "Oui"
          ) : <NoManual>Nous ne possédons pas le manuel de ce jeu.</NoManual>}
          </GameDataInfo>

          
        </GameDataList>
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
