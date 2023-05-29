import styled, { keyframes } from "styled-components";

import GameCard from "./GameCard";

const GridGames = styled.div`
  width: 90%;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.breakpoints.up("lg")} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const shadeAnimation = keyframes`
  from {
    opacity: 0.1;
  }

  to {
    opacity 1;
  }
`;

export const GridGameItem = styled(GameCard)`
  opacity: 0.1;
  animation: 300ms ${shadeAnimation} ease-in 1 forwards;
`;

GridGames.Item = GridGameItem;

export default GridGames;
