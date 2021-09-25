import React from 'react';
import styled from 'styled-components';

const Content = styled.section`
   padding: ${({ theme }) => theme.spacing(5) };
`;

function HomeLayout({ children }) {
    return (
        <main>
            <Content>{ children }</Content>
        </main>
    );
}

export default HomeLayout;
