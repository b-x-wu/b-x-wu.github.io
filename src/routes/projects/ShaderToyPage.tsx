import React from 'react';
import ShaderToy from '../../components/projects/shader-toy/ShaderToy';

const ShaderToyPage: React.FC = () => {
    return (
        <div className='flex w-full flex-col gap-y-8'>
            <ShaderToy />
            <div className='w-full text-center'>~~~</div>
            <div className='flex w-full flex-col gap-y-8'>
                <h2 className='text-secondary text-2xl'>What is this?</h2>
                <p>Shader toy placeholder.</p>
            </div>
        </div>
    );
};

export default ShaderToyPage;

