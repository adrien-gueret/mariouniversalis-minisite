import React, { useLayoutEffect, useRef, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import styled, { ThemeContext } from 'styled-components';

import useImage from '../hooks/useImage';

const ImageContainer = styled.div`
    display: inline-block;
    position: relative;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    line-height: 0;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
`;

const ImageSrc = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: opacity 100ms;
`;

export default function Image({
    src,
    previewSrc = '',
    width = 200,
    height = 200,
}) {
    const previewImage = useImage(previewSrc);
    const mainImage = useImage(src);
    const containerRef = useRef(null);
    const [isOnViewPort, setIsOnViewPort] = useState(false);
    const { images } = useContext(ThemeContext);

    const isLoading = (previewImage.isLoading && mainImage.isLoading) || (previewImage.hasFailed && mainImage.isLoading);

    useLayoutEffect(() => {
        if (!containerRef.current || !('IntersectionObserver' in window)) {
            return;
        }

        const domNode = containerRef.current;

        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsOnViewPort(true);
                    lazyImageObserver.unobserve(entry.target);
                }
            });
        });

        lazyImageObserver.observe(domNode);

        return () => lazyImageObserver.unobserve(domNode);
    }, []);

    return (
        <ImageContainer
            ref={containerRef}
            style={{
                width,
                height,
                backgroundImage: isLoading
                ? 'url(data:image/gif;base64,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)'
                : `url(${images.gamesBackground})`,
                backgroundRepeat: isLoading ? 'no-repeat' : 'repeat',
            }}
        >
            <Helmet>
                <link
                    rel="preload"
                    as="image"
                    href={src}
                />  
            </Helmet>
            
            { (isOnViewPort && previewSrc) && (
                <ImageSrc
                    style={{
                        backgroundImage: `url(${previewSrc})`,
                        opacity: (isLoading || mainImage.isComplete) ? 0 : 1,
                    }}
                />
            )}

            { isOnViewPort && (
                <ImageSrc
                    style={{
                        backgroundImage: `url(${src})`,
                        opacity: mainImage.isComplete ? 1 : 0,
                    }}
                />
            )}
        </ImageContainer>
    );
}
