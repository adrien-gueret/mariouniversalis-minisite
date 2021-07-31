import React from 'react';
import styled from 'styled-components';

/* import logo from './images/logo.png';

const Logo = styled.img`
    padding: ${({ theme }) => theme.spacing(2) };
    height: 50px;
`; */

const Content = styled.section`
   padding: ${({ theme }) => theme.spacing(5) };
`;

function MainLayout({ children }) {
    return (
        <main>
            <header />

            <Content>{ children }</Content>
        </main>
    );
}

export default MainLayout;
