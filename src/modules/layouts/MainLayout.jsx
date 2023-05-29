import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import SearchIcon from "../icons/Search";
import TwitterIcon from "../icons/Twitter";

import logo from "./images/logo.png";

const Logo = styled.img`
  padding: ${({ theme }) => theme.spacing(2)};
  height: 50px;
`;

const Content = styled.section`
  ${({ theme }) => theme.typography.variants.body1}
  padding: ${({ theme }) => theme.spacing(0, 5, 5, 5)};
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing(2, 5, 2, 5)};
  color: ${({ theme }) => theme.palette.text.contrasted};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderLink = styled(Link)`
  ${({ theme }) => theme.typography.variants.body1}
  color: inherit;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  padding: ${({ theme }) => theme.spacing(1, 0)};
  position: relative;

  margin-right: ${({ theme }) => theme.spacing(4)};
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2px;
    background-color: currentColor;
    transition: transform 300ms;
    transform-origin: right center;
    transform: scale(0);
  }

  &:hover,
  &:focus {
    &::after {
      transform-origin: left center;
      transform: scale(1);
    }
  }
`;

const SearchLink = styled(HeaderLink)`
  color: inherit;
  transition: color 300ms;

  & svg {
    transition: transform 300ms;
    transform-origin: center;
    transform: scale(1.3);
  }

  &:hover,
  &:focus {
    & svg {
      transform: scale(1.6);
    }
  }
`;

const TwitterLink = styled.a`
  color: inherit;
  transition: color 300ms;

  & svg {
    transition: transform 300ms;
    transform-origin: center;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.palette.twitter};

    & svg {
      transform: scale(1.3);
    }
  }
`;

const LinkContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

function MainLayout({ children }) {
  return (
    <main>
      <Header>
        <Link to="/" title="Retour à l'accueil" aria-label="Retour à l'accueil">
          <Logo src={logo} alt="Mario Universalis" />
        </Link>

        <LinkContainer>
          <HeaderLink className="first" to="/approximarios">
            ApproxiMarios
          </HeaderLink>
          <HeaderLink to="/a-propos">À propos</HeaderLink>
          <SearchLink
            to="/rechercher"
            title="Rechercher un jeu Mario"
            aria-label="Rechercher un jeu Mario"
          >
            <SearchIcon />
          </SearchLink>
          <TwitterLink
            href="https://twitter.com/MarioUnivRsalis"
            title="@MarioUnivRsalis"
            aria-label="Compte Twitter : @MarioUnivRsalis"
          >
            <TwitterIcon />
          </TwitterLink>
        </LinkContainer>
      </Header>

      <Content>{children}</Content>
    </main>
  );
}

export default MainLayout;
