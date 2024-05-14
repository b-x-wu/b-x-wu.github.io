import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout: React.FC = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='relative flex min-h-svh w-160 max-w-4/5 flex-col'>
                <Header />
                <div className='mb-auto grow'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
