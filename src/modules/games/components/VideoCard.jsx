import React, { useState } from 'react';
import styled from 'styled-components';

import { Image } from '../../ui';
import Play from '../../icons/Play';

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

const PlayButton = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    top: 0;
    left: 0;
    align-self: center;
    position: absolute;
    z-index: 1;
    cursor: pointer;
    color: rgba(0,0,0,.7);
    transition: all 300ms;

    &:hover,&:focus {
        color: red;
        background-color: rgba(0,0,0,.5);
    }
`;

export default function VideoCard({
    title,
    thumbnail,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailPreview,
    channel,
    videoId,
    ...otherProps
}) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    return (
        <Root {...otherProps}>
            { !isVideoPlaying ? (
                <>
                    <PlayButton
                        onClick={() => setIsVideoPlaying(true)}
                        style={{ width: thumbnailWidth, height: thumbnailHeight }}
                        aria-label={`Lancer la vidéo "${title}", de la chaine YouTube "${channel}"`}
                    >
                        <Play />
                    </PlayButton>
                    <Image
                        src={thumbnail}
                        previewSrc={thumbnailPreview}
                        alt={title}
                        width={thumbnailWidth}
                        height={thumbnailHeight}
                    />
                </>    
            ) : (
                <iframe
                    width={thumbnailWidth}
                    height={thumbnailHeight}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    frameBorder="0"
                    allow="fullscreen"
                    allowFullScreen
                />
            )}            

            <Content>
                <Header>
                    <Title>{ title }</Title>
                </Header>
                <ChannelName>{ channel }</ChannelName>
            </Content>
        </Root>
    );
}
