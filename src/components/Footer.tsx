import React from 'react';
import { HEART_SVG_ELEMENT } from './constants';

const Footer: React.FC = () => {
    return (
        <div className='mt-4 flex w-full flex-none flex-col content-center gap-y-3 p-6 text-sm text-disabled'>
            <div className='mx-auto w-fit'>---</div>
            <div className='mx-auto flex w-fit flex-row gap-x-3 align-middle'>
                <div>made with</div>
                {HEART_SVG_ELEMENT}
                <div className='hidden sm:block'>and a 16oz oat milk latte</div>
                <div className='block sm:hidden'>and some coffee</div>
            </div>
        </div>
    );
};

export default Footer;
