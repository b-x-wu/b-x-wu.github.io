import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClickOutsideRef } from '../hooks';


const Header: React.FC = () => {
    const [ isNavbarOpen, setIsNavbarOpen ] = useState<boolean>(false);
    const clickOutsideNavbarRef = useClickOutsideRef<HTMLButtonElement>(() => setIsNavbarOpen(false));

    return (
        <div className='flex-none py-10'>
            <div className='hidden flex-row space-x-12 md:flex'>
                <Link className='h-fit font-bold text-primary' to='/'>b-x-wu.github.io!</Link>
                <Link className='h-fit' to='/blog'>/blog</Link>
                <Link className='h-fit' to='/projects'>/projects</Link>
                <Link className='h-fit' to='/resume'>/resume</Link>
            </div>
            <div className="flex flex-row justify-between md:hidden">
                <button ref={clickOutsideNavbarRef} onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
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
                <Link className='h-fit font-bold text-primary' to='/'>b-x-wu.github.io!</Link>
                <div className='w-10 opacity-0'>TODO</div>
            </div>
            <div
                className={isNavbarOpen
                    ? 'absolute my-2 flex w-2/5 flex-col space-y-0 border-2 border-dotted bg-white align-middle'
                    : 'hidden'}
            >
                <Link onClick={() => setIsNavbarOpen(false)} to='/' className='border-b-2 border-dotted p-2'>$HOME</Link>
                <Link onClick={() => setIsNavbarOpen(false)} to='/blog' className='border-b-2 border-dotted p-2'>/blog</Link>
                <Link onClick={() => setIsNavbarOpen(false)} to='/projects' className='border-b-2 border-dotted p-2'>/projects</Link>
                <Link onClick={() => setIsNavbarOpen(false)} to='/resume' className='p-2'>/resume</Link>
            </div>
        </div>
    );
};

export default Header;

