import React, { useEffect, useState } from 'react';

interface ImageSuspenseProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    errorFallback?: React.ReactNode;
}

const DEFAULT_IMAGE_FALLBACK = (<div className='bg-disabled size-full' />);

const ImageSuspense: React.FC<ImageSuspenseProps> = ({
    src: srcUrl,
    fallback = DEFAULT_IMAGE_FALLBACK,
    errorFallback = DEFAULT_IMAGE_FALLBACK,
    ...imgProps
}) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ isLoadingError, setIsLoadingError ] = useState<boolean>(false);

    useEffect(() => {
        if (srcUrl === undefined) {
            setIsLoadingError(true);
            return;
        }

        const loadImagePromise = new Promise<void>((resolve, reject) => {
            const image = new Image();
            image.src = srcUrl;
            image.onload = () => resolve();
            image.onerror = () => reject();
        });
        
        loadImagePromise.then(() => {
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
            setIsLoadingError(true);
        });
    }, [ srcUrl ]);

    if (isLoading) {
        return fallback;
    }

    if (isLoadingError) {
        return errorFallback;
    }

    return (<img { ...{ ...imgProps, src: srcUrl } } />);
};

export default ImageSuspense;

