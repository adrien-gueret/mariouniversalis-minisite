import React from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.background.secondary};
  width: 100%;
  overflow: hidden;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
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
  background: black;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const PlayButton = styled.button`
  width: 100%;
  position: relative;
  cursor: pointer;
  background: black;
  border: 0;
  padding: 0;
  margin: 0;
  line-height: 0;

  &:hover,
  &:focus {
    img {
      opacity: 0.7;
    }
  }

  &:active {
    img {
      opacity: 0.5;
    }
  }
`;

const Thumbnail = styled.img`
  width: 100%;

  ${({ theme }) => theme.breakpoints.only("xs")} {
    height: auto;
  }
`;

const SvgContainer = styled.div`
  position: absolute;
  width: 20%;
  left: calc(50% - 10%);
  top: calc(50% - 10%);
  color: rgba(0, 0, 0, 0.7);
  transition: color 200ms;

  ${PlayButton}:hover &, ${PlayButton}:focus & {
    color: red;
  }
`;

export default function VideoCard({
  title,
  thumbnailUrl,
  thumbnailWidth,
  thumbnailHeight,
  channel,
  videoId,
  isPlaying,
  onPlay,
  ...otherProps
}) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0&autoplay=1`;

  return (
    <Root {...otherProps}>
      {isPlaying ? (
        <YouTubeIframe
          width={thumbnailWidth}
          height={thumbnailHeight}
          src={embedUrl}
          title={title}
          frameBorder="0"
          autoplay="1"
          allow="autoplay; fullscreen"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
      ) : (
        <PlayButton onClick={onPlay}>
          <Thumbnail
            width={thumbnailWidth}
            height={thumbnailHeight}
            src={thumbnailUrl}
            title={title}
          />
          <SvgContainer>
            <svg version="1.1" viewBox="0 0 68 48">
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="currentColor"
              />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </SvgContainer>
        </PlayButton>
      )}

      <Content>
        <Header>
          <Title>{title}</Title>
        </Header>
        <ChannelName>{channel}</ChannelName>
      </Content>
    </Root>
  );
}
