import React, { useContext } from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";

import Metas from "../modules/app/components/Metas";
import MainLayout from "../modules/layouts/MainLayout";
import RegionContext from "../modules/regions/context";
import SLUGS from "../modules/regions/regionSlugs";
import { Block, Button } from "../modules/ui";

const CenteredBlock = styled(Block)`
  margin: auto;
`;

const YearButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing(1)};
`;

export default function SelectYear({ data }) {
  const { region } = useContext(RegionContext);
  const { activeYears } = data.site.siteMetadata;

  return (
    <MainLayout>
      <Metas
        title="Sélectionnez une année"
        description="Découvrez les jeux Mario sortis année après année"
      />
      <CenteredBlock title="Sélectionnez une année" titleComponent="h1">
        {activeYears.map(year => (
          <YearButton
            key={year}
            as={Link}
            to={`/jeux-de-${year}${SLUGS[region]}`}
          >
            {year}
          </YearButton>
        ))}
      </CenteredBlock>
    </MainLayout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        activeYears
      }
    }
  }
`;
