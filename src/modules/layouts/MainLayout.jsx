import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

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
`;

const HeaderLink = styled(Link)`
  ${({ theme }) => theme.typography.variants.body1}
  color: inherit;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  padding: ${({ theme }) => theme.spacing(1, 0)};
  position: relative;

  margin-left: auto;
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

const TwitterLink = styled.a`
  color: inherit;
  transition: color 300ms;

  & svg {
    transition: transform 300ms;
    transform-origin: center;
  }

  &:hover,
  &:focus {
    color: #00acee;

    & svg {
      transform: scale(1.3);
    }
  }
`;

function MainLayout({ children }) {
  return (
    <main>
      <Header>
        <Link to="/" title="Retour à l'accueil" aria-label="Retour à l'accueil">
          <Logo src={logo} alt="Mario Universalis" />
        </Link>
        <HeaderLink to="/a-propos">À propos</HeaderLink>
        <TwitterLink
          href="https://twitter.com/MarioUnivRsalis"
          title="@MarioUnivRsalis"
          aria-label="Compte Twitter : @MarioUnivRsalis"
        >
          <svg width="32" height="32" fill="currentColor" viewBox="0 0 25 25">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
          </svg>
        </TwitterLink>
      </Header>

      <Content>{children}</Content>
    </main>
  );
}

export default MainLayout;
