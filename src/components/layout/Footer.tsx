import React, { useContext, useMemo } from 'react';
import { DarkModeContext, HighContrastModeContext } from '../contexts';

const Footer: React.FC = () => {
    const isDarkMode = useContext<boolean>(DarkModeContext);
    const isHighContrastMode = useContext<boolean>(HighContrastModeContext);
    
    const heartIconUrl = useMemo(() => {
        // return dark mode heart, even if high contrast is set
        // there is no difference between dark-high contrast mode and dark mode
        // this will have to change if that's ever introduced
        if (isDarkMode) {
            return '/static/icons/heart-dark-mode.svg';
        }

        if (isHighContrastMode) {
            return '/static/icons/heart-high-contrast-mode.svg';
        }

        return '/static/icons/heart.svg';
    }, [ isDarkMode, isHighContrastMode ]);

    return (
        <div className='text-disabled mt-4 flex w-full flex-none flex-col content-center gap-y-3 p-6 text-sm'>
            <div className='mx-auto w-fit'>---</div>
            <div className='mx-auto flex w-fit flex-row gap-x-2 align-middle'>
                <div>made with</div>
                <img className='size-5' src={ heartIconUrl } alt='Love' />
                <div className='hidden sm:block'>and a 16oz oat milk latte</div>
                <div className='block sm:hidden'>and some coffee</div>
            </div>
        </div>
    );
};

export default Footer;
