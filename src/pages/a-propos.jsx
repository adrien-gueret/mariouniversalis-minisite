import React from "react";
import styled from "styled-components";

import Metas from "../modules/app/components/Metas";
import MainLayout from "../modules/layouts/MainLayout";
import { Block } from "../modules/ui";

const CenteredBlock = styled(Block)`
  margin: auto;
`;

const Content = styled.div`
  text-align: left;
`;

const Subtitle = styled.h2`
  ${({ theme }) => theme.typography.variants.subtitle}
  text-align: center;
  margin: ${({ theme }) => theme.spacing(-3, 0, 3, 0)};
  font-style: italic;
`;

export default function About() {
  return (
    <MainLayout>
      <Metas
        title="À propos"
        description="Ce que vous devez savoir sur ce mini-site"
      />
      <CenteredBlock title="À propos" titleComponent="h1">
        <Content>
          <Subtitle>
            Règles de confidentialité et conditions générales d'utilisation
          </Subtitle>
          <p>
            Ce mini-site amateur a été créé pour Mario Universalis. Il n'a rien
            d'officiel avec Nintendo. <br />
            Les noms des jeux, des personnages et des marques cités sur ce site
            sont des propriétés de Nintendo.
          </p>
          <p>
            Ce mini-site récupère les données qu'il affiche via l'
            <a href="https://www.mariouniversalis.fr/graphql/">
              API GraphQL
            </a>{" "}
            de Mario Universalis.
          </p>
          <p>
            Ce mini-site n'utilise aucun cookies. Il utilise malgré tout le{" "}
            <em>localStorage</em> de votre navigateur pour se rappeler de la
            dernière page d'où vous venez (uniquement dans le cadre de ce
            mini-site, il n'a pas accès à votre historique de navigation
            complet) afin que la navigation soit 100% fonctionnelle.
          </p>
          <p>
            Ce mini-site utilise l'API de YouTube pour afficher les vidéos des
            jeux.
            <br />
            De fait, veuillez consulter{" "}
            <a href="https://www.youtube.com/t/terms">
              les conditions générales d'utilisation de YouTube
            </a>
            , ainsi que{" "}
            <a href="https://policies.google.com/privacy">
              les règles de confidentialité de Google
            </a>
            .
          </p>
        </Content>
      </CenteredBlock>
    </MainLayout>
  );
}
