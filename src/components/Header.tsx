import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <div className='flex flex-row space-x-16 py-10'>
            <Link className='h-fit font-bold' to='/'>$HOME</Link>
            <Link className='h-fit' to='/blog'>/blog</Link>
            <Link className='h-fit' to='/projects'>/projects</Link>
            <Link className='h-fit' to='/resume'>/resume</Link>
        </div>
    );
};

export default Header;

