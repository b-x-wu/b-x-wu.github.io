import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='h-screen w-192 border-2 border-solid border-black'>
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;

