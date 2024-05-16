import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import {
    DARK_MODE_CLASS_NAME,
    DARK_MODE_LOCAL_STORAGE_KEY,
    HIGH_CONTRAST_CLASS_NAME,
    HIGH_CONTRAST_MODE_LOCAL_STORAGE_KEY,
} from '../constants';

const Layout: React.FC = () => {

    const [ isDarkMode, setIsDarkMode ] = useState<boolean>(false);
    const [ isHighContrastMode, setIsHighContrastMode ] = useState<boolean>(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains(DARK_MODE_CLASS_NAME));
        setIsHighContrastMode(document.documentElement.classList.contains(HIGH_CONTRAST_CLASS_NAME));
    }, []);

    const handleToggleDarkMode = () => {
        if (isDarkMode) {
            setIsDarkMode(false);
            localStorage.setItem(DARK_MODE_LOCAL_STORAGE_KEY, 'false');
            document.documentElement.classList.remove(DARK_MODE_CLASS_NAME);
            return;
        }

        setIsDarkMode(true);
        localStorage.setItem(DARK_MODE_LOCAL_STORAGE_KEY, 'true');
        document.documentElement.classList.add(DARK_MODE_CLASS_NAME);
    };

    const handleToggleHighContrastMode = () => {
        if (isHighContrastMode) {
            setIsHighContrastMode(false);
            localStorage.setItem(HIGH_CONTRAST_MODE_LOCAL_STORAGE_KEY, 'false');
            document.documentElement.classList.remove(HIGH_CONTRAST_CLASS_NAME);
            return;
        }

        setIsHighContrastMode(true);
        localStorage.setItem(HIGH_CONTRAST_MODE_LOCAL_STORAGE_KEY, 'true');
        document.documentElement.classList.add(HIGH_CONTRAST_CLASS_NAME);
    };

    return (
        <div className='bg-background text-text'>
            <div className='flex items-center justify-center'>
                <div className='relative flex min-h-svh w-160 max-w-4/5 flex-col'>
                    <Header onToggleHighContrastMode={ handleToggleHighContrastMode } onToggleDarkMode={ handleToggleDarkMode } />
                    <div className='mb-auto grow'>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Layout;
