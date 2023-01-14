import React, { useState } from "react";
import styled from "styled-components";

import { TextButton } from "../../ui";
import TwitterIcon from "../../icons/Twitter";
import ShowIcon from "../../icons/Show";
import HideIcon from "../../icons/Hide";

import GameCard from "./GameCard";

const Root = styled.div`
  position: relative;
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

const TwitterButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing(1)};
  right: ${({ theme }) => theme.spacing(1)};

  background: transparent;
  border: 0;
  cursor: pointer;

  & svg {
    color: ${({ theme }) => theme.palette.twitter};
    transition: transform 300ms;
    transform-origin: center;
    transform: scale(0.8);
  }

  &:hover,
  &:focus {
    & svg {
      transform: scale(1.2);
    }
  }
`;

export default function ApproxiMario({ id, content, game }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const initTweet = () => {
    const tweetContent = `#ApproxiMario n°${id}
    
${content}`;

    const twitterURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetContent
    )}`;

    window.open(twitterURL);
  };

  return (
    <Root id={`approximario-{id}`}>
      <Container>
        <header>
          <Title>ApproxiMario #{id}</Title>
          <TwitterButton
            aria-label="Partager cet ApproxiMario sur Twitter"
            title="Partager cet ApproxiMario sur Twitter"
            onClick={initTweet}
          >
            <TwitterIcon />
          </TwitterButton>
        </header>
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
