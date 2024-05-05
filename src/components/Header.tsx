import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CLOSED_FOLDER_COMPONENT, OPEN_FOLDER_COMPONENT } from './constants';


const Header: React.FC = () => {
    const [ isNavbarOpen, setIsNavbarOpen ] = useState<boolean>(false);

    return (
        <div className='py-10'>
            <div className='hidden flex-row space-x-16 md:flex'>
                <Link className='h-fit font-bold' to='/'>$HOME</Link>
                <Link className='h-fit' to='/blog'>/blog</Link>
                <Link className='h-fit' to='/projects'>/projects</Link>
                <Link className='h-fit' to='/resume'>/resume</Link>
            </div>
            <div className="flex flex-row justify-between md:hidden">
                <div onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                    {isNavbarOpen ? OPEN_FOLDER_COMPONENT : CLOSED_FOLDER_COMPONENT}
                </div>
                <Link className='h-fit font-bold' to='/'>$HOME</Link>
                <div className='w-10 opacity-0'>TODO</div>
            </div>
            <div
                className={isNavbarOpen
                    ? 'absolute my-2 flex w-2/5 flex-col space-y-0 border-2 border-dotted bg-white align-middle'
                    : 'hidden'}
            >
                <Link onClick={() => setIsNavbarOpen(false)} to='/blog' className='border-b-2 border-dotted p-2'>/blog</Link>
                <Link onClick={() => setIsNavbarOpen(false)} to='/projects' className='border-b-2 border-dotted p-2'>/projects</Link>
                <Link onClick={() => setIsNavbarOpen(false)} to='/resume' className='p-2'>/resume</Link>
            </div>
        </div>
    );
};

export default Header;

