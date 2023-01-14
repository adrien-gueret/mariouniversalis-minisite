import React, { useState } from "react";
import styled from "styled-components";

import { TextButton, IconButton } from "../../ui";
import CopyIcon from "../../icons/Copy";
import ShowIcon from "../../icons/Show";
import HideIcon from "../../icons/Hide";

import GameCard from "./GameCard";

const Root = styled.div`
  background-color: ${({ theme }) => theme.palette.background.secondary};
  margin: ${({ theme }) => theme.spacing(3, 0)};
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  text-align: left;
`;

const Title = styled.h2`
  ${({ theme }) => theme.typography.variants.subtitle}
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Container = styled.div`
  ${({ theme }) => theme.typography.variants.body1}
  padding: ${({ theme }) => theme.spacing(2, 3, 2, 3)};
`;

const Content = styled.div`
  ${({ theme }) => theme.typography.variants.body1}
  color: ${({ theme }) => theme.palette.text.light};
  margin-top: auto;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Game = styled(GameCard)`
  max-width: 300px;
  margin: ${({ theme }) => theme.spacing(1) + " auto"};
`;

export default function ApproxiMario({ id, content, game }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Root id={`approximario-{id}`}>
      <Container>
        <Title>ApproxiMario #{id}</Title>
        <Content>{content}</Content>
        <TextButton onClick={() => setShowAnswer(v => !v)}>
          {showAnswer ? <HideIcon /> : <ShowIcon />}
          {showAnswer ? "Cacher " : "Voir "} le jeu
        </TextButton>

        {showAnswer && <Game withSmallImage {...game} />}
      </Container>
    </Root>
  );
}
