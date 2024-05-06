import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout: React.FC = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='relative w-160 max-w-4/5'>
                <Header />
                <div className='mb-auto min-h-body'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
