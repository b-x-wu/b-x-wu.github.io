import React from 'react';
import PaletePosterization from '../../components/projects/palette-posterization/PalettePosterization';
import { Link } from 'react-router-dom';

const PalettePosterizationPage: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-y-8'>
            <PaletePosterization />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
                <p>THIS IS A WIP. DON&apos;T WORRY ABOUT IT TOO MUCH.</p>
                <p>Caveats:</p>
                <ul className='flex list-inside flex-col gap-y-2 '>
                    <li className='list-image-clip-[url(/static/icons/bullet.svg)] list-image-clip-size-3 list-image-clip-color-text'>
                        Next to no optimizations (other than pushing the image processing work onto a webworker)
                    </li>
                    <li className='list-image-clip-[url(/static/icons/bullet.svg)] list-image-clip-size-3 list-image-clip-color-text'>
                        I&apos;m working on getting more metrics and reducer functions in
                    </li>
                </ul>
                <p>Source code on <Link className='text-enabled hover:underline hover:underline-offset-2' to='https://github.com/b-x-wu/b-x-wu.github.io/blob/main/src/routes/projects/PalettePosterizationPage.tsx'>GitHub</Link>. Let me know if you run into any issues.</p>
            </div>
        </div>
    );
};

export default PalettePosterizationPage;

