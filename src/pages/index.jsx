import React from "react";
import { Link } from "gatsby";
import styled, { keyframes } from "styled-components";

import Metas from "../modules/app/components/Metas";
import HomenLayout from "../modules/layouts/HomeLayout";
import { Block, Button } from "../modules/ui";

import superMarioLogo from "./images/super_mario.svg";

const wiggleAnimation = keyframes`
  0% { transform: rotate(0deg); }
  40% { transform: rotate(0deg); }
  55% { transform: rotate(5deg); }
  85% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const SuperMario = styled.img`
  height: 75px;
  vertical-align: middle;

  margin-top: ${({ theme }) => theme.spacing(1)};

  &:hover {
    animation: 1s ${wiggleAnimation} ease-out infinite;
  }
`;

const Hidden = styled.div`
  display: none;
`;
const CenteredBlock = styled(Block)`
  max-width: 768px;
  margin: auto;
`;

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <HomenLayout>
      <Metas />
      <CenteredBlock
        title={
          <>
            Liste des jeux <Hidden>Super Mario</Hidden>
            <SuperMario src={superMarioLogo} alt="" />
          </>
        }
        titleComponent="h1"
        actions={
          <>
            <Button $primary as={Link} to={`/jeux-de-${currentYear}`}>
              Voir les jeux de cette année
            </Button>
            <Button as={Link} to="/selectionner-annee">
              Sélectionner une autre année
            </Button>
          </>
        }
      >
        <p>
          Depuis le milieu des années 1980 à aujourd'hui, Mario a vécu des tas
          d'aventures : plus de <strong>200</strong> ! Connaissez-vous tous les
          jeux où lui et ses amis apparaissent ?
        </p>
        <p>
          Ce site présente une liste <em>presque</em> complète de ces jeux.
          Quelle que soit votre expertise sur l'univers du plombier, vous
          découvrirez ou re-découvrirez sans doute un titre parmi tous ceux de
          notre base de données.
        </p>
      </CenteredBlock>
    </HomenLayout>
  );
}
