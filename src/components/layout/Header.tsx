import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onToggleDarkMode: () => void;
    isDarkMode: boolean;
    onToggleHighContrastMode: () => void;
    isHighContrastMode: boolean;
}

const Header: React.FC<HeaderProps> = ({
    onToggleDarkMode,
    onToggleHighContrastMode,
    isDarkMode,
    isHighContrastMode,
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

    return (
        <div className='flex-none py-10'>
            <div className='hidden flex-row space-x-12 md:flex'>
                <Link className='text-primary h-fit font-bold hover:underline hover:underline-offset-2' to='/'>
                    b-x-wu.github.io!
                </Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/blog'>/blog</Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/projects'>/projects</Link>
                <Link className='h-fit hover:underline hover:underline-offset-2' to='/resume'>/resume</Link>
                <div className='flex grow flex-row justify-end gap-x-2'>
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
                </div>
            </div>
            <div className="flex flex-row justify-between md:hidden">
                <button ref={ navbarRef } onClick={ () => setIsNavbarOpen(!isNavbarOpen) }>
                    { isNavbarOpen
                        ? (
                            <img
                                className='h-full w-5'
                                src='/static/icons/open-folder.svg'
                                alt='Open folder'
                                aria-describedby='Close navigation menu'
                            />
                        ) : (
                            <img
                                className='h-full w-5'
                                src='/static/icons/closed-folder.svg'
                                alt='Closed folder'
                                aria-describedby='Open navigation menu'
                            />
                        )
                    }
                </button>
                <Link className='text-primary h-fit font-bold' to='/'>b-x-wu.github.io!</Link>
                <div className='w-10 opacity-0'>TODO</div>
            </div>
            <div
                className={ isNavbarOpen
                    ? 'absolute z-50 my-2 flex w-2/5 flex-col space-y-0 border-2 border-dotted bg-white align-middle'
                    : 'hidden' }
            >
                <Link onClick={ handleNavbarLinkClick } to='/' className='border-b-2 border-dotted p-2'>$HOME</Link>
                <Link onClick={ handleNavbarLinkClick } to='/blog' className='border-b-2 border-dotted p-2'>/blog</Link>
                <Link onClick={ handleNavbarLinkClick } to='/projects' className='border-b-2 border-dotted p-2'>/projects</Link>
                <Link onClick={ handleNavbarLinkClick } to='/resume' className='p-2'>/resume</Link>
            </div>
        </div>
    );
};

export default Header;

