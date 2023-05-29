import React from "react";
import styled from "styled-components";

import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  useHits,
  usePoweredBy,
} from "react-instantsearch-hooks-web";

import Metas from "../modules/app/components/Metas";
import { GridGames } from "../modules/games";
import MainLayout from "../modules/layouts/MainLayout";

import { Block, NotFound } from "../modules/ui";

import algoliaLogo from "./images/algolia.svg";

const searchClient = algoliasearch(
  "HDIB9X50P6",
  "f0dcb191a846f3eaa6b94172b2ddf629"
);

const CenteredBlock = styled(Block)`
  margin: auto;
`;

const Describe = styled.p`
  width: 90%;
  text-align: left;
  margin: auto;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SearchForm = styled(SearchBox)`
  .input {
    padding: ${({ theme }) => theme.spacing(1, 1, 1.25, 1)};
    border-radius: 20px;
    border: 2px solid transparent;
    width: 90%;
    margin-bottom: ${({ theme }) => theme.spacing(6)};

    ${({ theme }) => theme.typography.variants.body2};

    &::placeholder {
      font-style: italic;
      opacity: 0.5;
      transition: opacity 333ms;
    }

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.palette.line};
      color: ${({ theme }) => theme.palette.text.default};
      background-color: ${({ theme }) => theme.palette.background.secondary};

      &::placeholder {
        opacity: 0.8;
      }
    }

    &:hover {
      outline: none;
    }
  }

  .submit,
  .reset {
    display: none;
  }
`;

const TotalResults = styled.p`
  width: 90%;
  text-align: right;
  margin: ${({ theme }) => `0 auto ${theme.spacing(3)} auto`};
  font-style: italic;
`;

function Hits() {
  const { hits, results } = useHits();

  if (results.nbHits === 0)
    return (
      <NotFound>
        Votre recherche ne donne aucun résultat !
        <br />
        Êtes-vous sûr de l'orthographe de ce que vous cherchez ?
      </NotFound>
    );

  return (
    <>
      {Boolean(results.query.trim()) && (
        <TotalResults>
          <strong>{results.nbHits}</strong> résultat
          {results.nbHits > 1 ? "s" : ""}
        </TotalResults>
      )}

      <GridGames>
        {hits.map(hit => (
          <GridGames.Item
            key={hit.id}
            name={hit.name}
            cardTitle={<Highlight attribute="name" hit={hit} />}
            slug={`${hit.id}-${hit.slug}`}
            image={hit.image.hq}
            imagePreview={hit.image.low}
            deviceName={hit.device.name}
            deviceLogo={hit.device.logo}
            style={{
              animationDelay: `${hit.__position * 50}ms`,
            }}
          />
        ))}
      </GridGames>
    </>
  );
}

const PoweredByContainer = styled.aside`
  font-style: italic;
  text-align: right;
  width: 90%;
  margin: auto;
  margin-top: ${({ theme }) => theme.spacing(6)};
  ${({ theme }) => theme.typography.variants.body1};
`;

const PoweredByLink = styled.a`
  text-decoration: none;
  color: inherit;

  img {
    height: 16px;
    vertical-align: middle;
    margin-left: ${({ theme }) => theme.spacing(1)};
  }
`;

function PoweredBy() {
  const { url } = usePoweredBy();

  return (
    <PoweredByContainer>
      Cette recherche a été réalisée avec
      <PoweredByLink href={url}>
        <img src={algoliaLogo} alt="Algolia" title="Algolia" />
      </PoweredByLink>
    </PoweredByContainer>
  );
}

export default function Search() {
  return (
    <MainLayout>
      <Metas
        title="Recherchez un jeu"
        description="Vous recherchez un jeu Mario ? Vous le trouverez sûrement ici !"
      />
      <CenteredBlock title="Recherchez un jeu" titleComponent="h1">
        <Describe>
          Recherchez un jeu Mario à partir de son nom ou de sa console.
        </Describe>
        <InstantSearch
          searchClient={searchClient}
          indexName="games"
          insights
          routing={{
            stateMapping: {
              stateToRoute({ games }) {
                const { query: q } = games;

                return { q };
              },
              routeToState({ q: query }) {
                return {
                  games: { query },
                };
              },
            },
          }}
        >
          <SearchForm
            placeholder="Super Mario Bros., Luigi's Mansion, Game Cube, Nintendo 64..."
            classNames={{
              input: "input",
              submit: "submit",
              reset: "reset",
            }}
          />
          <Hits />
          <PoweredBy />
        </InstantSearch>
      </CenteredBlock>
    </MainLayout>
  );
}
