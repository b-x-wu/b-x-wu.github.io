import React, { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import Chatbox from '../../components/home/Chatbox';
import Window from '../../components/common/Window';
import ImageSuspense from '../../components/common/ImageSuspense';
import { DarkModeContext } from '../../components/contexts';

const Projects: React.FC = () => {

    const isDarkMode = useContext(DarkModeContext);
    const dateString = useMemo(() => (new Date()).toUTCString(), []);

    return (
        <div className='flex w-full flex-col space-y-4'>
            <div className='flex h-9 w-full items-center justify-center text-center'>
                <div className='text-disabled'>{ dateString }</div>
            </div>
            <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
            <Chatbox content={ 'here’s some stuff i\'ve worked on, check it out !!' } />
            <Window
                title='Pixel SVG Maker'
                optionsBar='A web app for exporting pixel art to SVG'
                controlButtons={ [
                    <Link to='/projects/pixel-svg-maker' key='pixel-svg-link'>
                        <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                    </Link>,
                ] }
                containerStyle={ { width: 'fit-content' } }
            >
                <Link to='/projects/pixel-svg-maker' className='block size-64'>
                    <ImageSuspense
                        src={
                            isDarkMode
                                ? '/static/images/project-previews/pixel-svg-maker-preview-dark.png'
                                : '/static/images/project-previews/pixel-svg-maker-preview.png'
                        }
                        alt='Pixel SVG Maker preview'
                    />
                </Link>
            </Window>
        </div>
    );
};

export default Projects;

