import React from 'react';
import PaletePosterization from '../../components/projects/palette-posterization/PalettePosterization';

const PalettePosterizationPage: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-y-8'>
            <PaletePosterization />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
            </div>
        </div>
    );
};

export default PalettePosterizationPage;

