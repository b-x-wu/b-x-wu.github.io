import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../../components/common/Slider';

// TODO: make this pretty. this is a placeholder for now
const Projects: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-y-2'>
            <Link to='/projects/pixel-svg-maker'>Pixel SVG Maker</Link>
            <Slider min={ 0 } max={ 100 } step={ 2 } onChange={ console.log } />
        </div>
    );
};

export default Projects;

