import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='absolute bottom-0 flex w-full flex-col content-center gap-y-3 p-6 text-sm text-disabled'>
            <div className='mx-auto w-fit'>---</div>
            <div className='mx-auto w-fit'>
                <span>Made with </span>
                <span aria-labelledby='love'>♥</span>
                <span> with an oat milk latte</span>
            </div>
        </div>
    );
};

export default Footer;
