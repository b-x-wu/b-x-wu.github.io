import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='text-disabled mt-4 flex w-full flex-none flex-col content-center gap-y-3 p-6 text-sm'>
            <div className='mx-auto w-fit'>---</div>
            <div className='mx-auto flex w-fit flex-row gap-x-3 align-middle'>
                <div>made with</div>
                <img className='size-5' src='/static/icons/heart.svg' alt='Love' />
                <div className='hidden sm:block'>and a 16oz oat milk latte</div>
                <div className='block sm:hidden'>and some coffee</div>
            </div>
        </div>
    );
};

export default Footer;
