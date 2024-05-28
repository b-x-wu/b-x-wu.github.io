import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onToggleDarkMode: () => void;
    isDarkMode: boolean;
    onToggleHighContrastMode: () => void;
    isHighContrastMode: boolean;
    onToggleReducedMotionMode: () => void;
    isReducedMotionMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onToggleDarkMode,
    onToggleHighContrastMode,
    onToggleReducedMotionMode,
    isDarkMode,
    isHighContrastMode,
    isReducedMotionMode,
}) => {
    const [ isNavbarOpen, setIsNavbarOpen ] = useState<boolean>(false);
    const navbarRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (navbarRef.current === null) {
            return;
        }

        const handleClick = (event: Event) => {
            if (!navbarRef.current?.contains(event.target as Node)) {
                setIsNavbarOpen(false);
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleNavbarLinkClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsNavbarOpen(false);
    };

    const darkModeButtonComponent = (
        <button onClick={ onToggleDarkMode }>
            { isDarkMode
                ? (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/dark-mode.svg)]'
                        aria-describedby='Set light mode'
                    />
                ) : (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/light-mode.svg)]'
                        aria-describedby='Set dark mode'
                    />
                )
            }
        </button>
    );

    const highContrastButtonComponent = (
        <button onClick={ onToggleHighContrastMode }>
            { isHighContrastMode
                ? (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/high-contrast.svg)]'
                        aria-describedby='Set low contrast mode'
                    />
                ) : (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/low-contrast.svg)]'
                        aria-describedby='Set high contrast mode'
                    />
                )
            }
        </button>
    );

    const reducedMotionButtonComponent = (
        <button onClick={ onToggleReducedMotionMode }>
            { isReducedMotionMode
                ? (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/reduced-motion.svg)]'
                        aria-describedby='Turn off reduced motion mode'
                    />
                ) : (
                    <div
                        className='bg-text h-full w-5 bg-clip-[url(/static/icons/no-reduced-motion.svg)]'
                        aria-describedby='Set reduced motion mode'
                    />
                )
            }
        </button>
    );

    return (
        <div className='flex-none py-10'>
            <div className='hidden flex-row space-x-12 md:flex'>
                <Link className='text-primary h-fit font-bold hover:underline hover:underline-offset-2' to='/'>
                    b-x-wu.github.io!
                </Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/projects'>/projects</Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/resume'>/resume</Link>
                <div className='flex grow flex-row justify-end gap-x-2'>
                    { darkModeButtonComponent }
                    { highContrastButtonComponent }
                    { reducedMotionButtonComponent }
                </div>
            </div>
            <div className="flex flex-row justify-between md:hidden">
                <button className='basis-1/4' ref={ navbarRef } onClick={ () => setIsNavbarOpen(!isNavbarOpen) }>
                    { isNavbarOpen
                        ? (
                            <div
                                className='bg-text h-full w-5 bg-clip-[url(/static/icons/open-folder.svg)]'
                                aria-describedby='Close navigation menu'
                            />
                        ) : (
                            <div
                                className='bg-text h-full w-5 bg-clip-[url(/static/icons/closed-folder.svg)]'
                                aria-describedby='Open navigation menu'
                            />
                        )
                    }
                </button>
                <Link className='text-primary h-fit basis-1/2 font-bold' to='/'>b-x-wu.github.io!</Link>
                <div className='flex basis-1/4 flex-row justify-end gap-x-2'>
                    { darkModeButtonComponent }
                    { highContrastButtonComponent }
                    { reducedMotionButtonComponent }
                </div>
            </div>
            <div
                className={ isNavbarOpen
                    ? 'bg-background border-text absolute z-50 my-2 flex w-2/5 flex-col space-y-0 border-2 border-dotted align-middle'
                    : 'hidden' }
            >
                <Link onClick={ handleNavbarLinkClick } to='/' className='border-b-2 border-dotted p-2'>$HOME</Link>
                <Link onClick={ handleNavbarLinkClick } to='/projects' className='border-b-2 border-dotted p-2'>/projects</Link>
                <Link onClick={ handleNavbarLinkClick } to='/resume' className='p-2'>/resume</Link>
            </div>
        </div>
    );
};

export default Header;

