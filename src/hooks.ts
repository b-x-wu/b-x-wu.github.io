import React, { useEffect, useRef } from 'react';

/**
 * React hook for setting page title.
 * @param title the title to set the page to
 */
export const useTitle = (title: string) => {
    useEffect(() => {
        const currentTitle = document.title;
        document.title = title;
        return () => {
            document.title = currentTitle;
        };
    }, [ title ]);
};

/**
 * React hook for adding a callback for clicking outside an element.
 * @param callback the callback that fires on click
 * @returns the ref to the element to click outside of
 */
export const useClickOutsideRef = <T extends HTMLElement>(callback: () => void): React.RefObject<T> => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (!ref.current?.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return ref;
};

