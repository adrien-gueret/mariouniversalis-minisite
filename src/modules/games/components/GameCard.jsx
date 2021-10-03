import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import useBreakpoint from '../../ui/hooks/useBreakpoint';
import { Image } from '../../ui';

const Article = styled.article`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.palette.background.secondary};
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    text-align: left;

    ${({ theme }) => theme.breakpoints.only('sm')} {
        flex-direction: row;
    }
`;

const Content = styled.div`
    ${({ theme }) => theme.typography.variants.body1}
    padding: ${({ theme }) => theme.spacing(1, 3, 2, 3)};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap-reverse;
    text-align: left;
`;

const DeviceLogo = styled.img`
    max-width: 50px;
    margin-top: ${({ theme }) => theme.spacing(1)};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
    margin-left: auto;
    cursor: help;

    ${({ theme }) => theme.breakpoints.up('lg')} {
        max-width: 100px;
        margin-top: 0;
    }
`;

const Title = styled.h2`
    ${({ theme }) => theme.typography.variants.subtitle}
`;

const ReleaseDate = styled.p`
    ${({ theme }) => theme.typography.variants.caption}
    color: ${({ theme }) => theme.palette.text.light};
`;

const Root = styled(Link)`
    color: inherit;
    text-decoration: none;
    display: flex;

    &:visited {
        color: inherit;
    }

    &:hover {
        & ${Article} {
            box-shadow: 0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12);
        }
    }
`;

export default function GameCard({
    name,
    slug,
    image,
    imagePreview,
    deviceName,
    deviceLogo,
    releaseDate,
    isReleased,
    children,
    ...otherProps
}) {
    const isImageOnLeft = useBreakpoint('sm');

    const imageHeight = isImageOnLeft ? 200 : 400;
    const imageWidth = isImageOnLeft ? '50%' : '100%';

    return (
        <Root to={`/${slug}`} aria-label={`Plus d'informations sur "${name}"`}>
            <Article {...otherProps}>
                <Image
                    src={image}
                    previewSrc={imagePreview}
                    alt={name}
                    width={imageWidth}
                    height={imageHeight}
                />

                <Content>
                    <Header>
                        <Title>{ name }</Title>
                        <DeviceLogo src={deviceLogo} alt={deviceName} title={deviceName} />
                    </Header>
                    
                    { releaseDate && (
                        <ReleaseDate>
                            { !isReleased && 'Prévu le'} { releaseDate }
                        </ReleaseDate>
                    )}
                </Content>
            </Article>
        </Root>
    );
}
