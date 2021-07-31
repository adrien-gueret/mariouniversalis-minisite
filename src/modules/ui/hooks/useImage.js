import { useState, useEffect, useMemo } from 'react';

export default function useImage(src) {
    const [isComplete, setIsComplete] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    const isSSR = typeof Image === 'undefined';

    const image = useMemo(() => {
        if (isSSR) {
            return null;
        }

        const image = new Image();
        image.src = src;

        return image;
    }, [src, isSSR]);

    useEffect(() => {
        if (!image) {
            return;
        }
        
        const complete = () => setIsComplete(true);

        if (image.complete) {
            complete();
            return;
        }

        image.onload = complete;
        image.onerror = () => setHasFailed(true);
    }, [image]);

    return {
        src,
        isComplete,
        hasFailed,
        isLoading: !isComplete && !hasFailed,
        nativeImage: image,
    };
}
