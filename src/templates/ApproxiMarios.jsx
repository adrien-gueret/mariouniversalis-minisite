import React from "react";
import styled from "styled-components";

import Metas from "../modules/app/components/Metas";
import { ApproxiMario } from "../modules/games";
import MainLayout from "../modules/layouts/MainLayout";

import { Block } from "../modules/ui";

const CenteredBlock = styled(Block)`
  margin: auto;
`;

export default function GamesByYear({ pageContext }) {
  return (
    <MainLayout>
      <Metas
        title="ApproxiMarios"
        description="Devinez quels jeux Mario sont décris à travers des descriptions très approximatives !"
      />
      <CenteredBlock title="ApproxiMarios" titleComponent="h1">
        <p>
          Devinez quels jeux Mario sont décris à travers des descriptions très
          approximatives !
        </p>

        {pageContext.approximarios.map(approximario => (
          <ApproxiMario
            key={approximario.id}
            id={approximario.id}
            content={approximario.content}
            game={approximario.game}
          />
        ))}
      </CenteredBlock>
    </MainLayout>
  );
}
