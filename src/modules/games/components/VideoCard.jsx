import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.palette.background.secondary};
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    text-align: left;
    position: relative;
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

const Title = styled.h3`
    ${({ theme }) => theme.typography.variants.subtitle}
    margin-top: ${({ theme }) => theme.spacing(1)};
`;

const ChannelName = styled.p`
    ${({ theme }) => theme.typography.variants.caption}
    color: ${({ theme }) => theme.palette.text.light};
`;

const YouTubeIframe = styled.iframe`
    width: 100%;

    ${({ theme }) => theme.breakpoints.only('xs')} {
        height: auto;
    }
`;

export default function VideoCard({
    title,
    thumbnailWidth,
    thumbnailHeight,
    channel,
    videoId,
    children,
    ...otherProps
}) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0`;
    return (
        <Root {...otherProps}>
            <YouTubeIframe
                width={thumbnailWidth}
                height={thumbnailHeight}
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="fullscreen"
                allowFullScreen
            />      

            <Content>
                <Header>
                    <Title>{ title }</Title>
                </Header>
                <ChannelName>{ channel }</ChannelName>
                { children }
                <meta itemProp="embedUrl" content={embedUrl} />
            </Content>
        </Root>
    );
}
