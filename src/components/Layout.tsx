import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='mx-12 h-screen w-160'>
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
