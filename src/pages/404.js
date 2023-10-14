import React from "react";
import styled from "styled-components";

import Metas from "../modules/app/components/Metas";
import MainLayout from "../modules/layouts/MainLayout";
import { Block } from "../modules/ui";

import marioImage from "./images/mario-finding-nothing.png";

const CenteredBlock = styled(Block)`
  margin: auto;
`;

const SuperMario = styled.img`
  height: 200px;
  vertical-align: middle;

  margin: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 400px;
  }
`;

export default function About() {
  return (
    <MainLayout>
      <Metas title="Page non trouvée" />
      <CenteredBlock title="Page non trouvée" titleComponent="h1">
        <SuperMario src={marioImage} alt="" />
        <p>La page que vous recherchez n'existe pas ou plus.</p>
      </CenteredBlock>
    </MainLayout>
  );
}
