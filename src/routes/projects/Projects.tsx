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
        <div className='flex w-full flex-col gap-y-6'>
            <div className='flex h-9 w-full items-center justify-center text-center'>
                <div className='text-disabled'>{ dateString }</div>
            </div>
            <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
            <Chatbox content={ 'here’s some stuff i\'ve worked on in my free time' } />
            <Chatbox content='check it out !!' />
            <div className='flex flex-col gap-4 md:grid md:grid-cols-2'>
                <Window
                    title='Pixel SVG Maker'
                    optionsBar='A web app for exporting pixel art to SVG'
                    controlButtons={ [
                        <Link to='/projects/pixel-svg-maker' key='pixel-svg-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='/projects/pixel-svg-maker' className='h-64'>
                        <ImageSuspense
                            src={
                                isDarkMode
                                    ? '/static/images/project-previews/pixel-svg-maker-preview-dark.png'
                                    : '/static/images/project-previews/pixel-svg-maker-preview.png'
                            }
                            alt='Pixel SVG Maker preview'
                            className='h-full object-cover object-top'
                        />
                    </Link>
                </Window>
                <Window
                    title='Create React Sandbox'
                    optionsBar='A CLI for lightweight React environments'
                    controlButtons={ [
                        <Link to='https://www.npmjs.com/package/create-react-sandbox' key='create-react-sandbox-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='https://www.npmjs.com/package/create-react-sandbox' target='_blank' rel="noopener noreferrer" className='relative block h-64'>
                        <img
                            aria-hidden="true"
                            src='/static/images/project-previews/create-react-sandbox-preview.gif'
                            alt='Create React Sandbox preview background'
                            className='absolute h-full object-cover'
                        />
                        <div className='absolute size-full backdrop-blur-sm' />
                        <ImageSuspense
                            src='/static/images/project-previews/create-react-sandbox-preview.gif'
                            alt='Create React Sandbox preview'
                            className='absolute top-1/2 -translate-y-1/2'
                        />
                    </Link>
                </Window>
                <Window
                    title='Visual Novel Terminal'
                    optionsBar='A customizable terminal reskin'
                    controlButtons={ [
                        <Link to='https://bruce-x-wu.itch.io/visual-novel-terminal' key='visual-novel-terminal-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='https://bruce-x-wu.itch.io/visual-novel-terminal' target='_blank' rel="noopener noreferrer" className='relative block h-64'>
                        <img
                            aria-hidden="true"
                            src='/static/images/project-previews/visual-novel-terminal-preview.gif'
                            alt='Visual Novel Terminal preview background'
                            className='absolute h-full object-cover'
                        />
                        <div className='absolute size-full backdrop-blur-sm' />
                        <ImageSuspense
                            src='/static/images/project-previews/visual-novel-terminal-preview.gif'
                            alt='Visual Novel Terminal preview'
                            className='absolute top-1/2 -translate-y-1/2'
                        />
                    </Link>
                </Window>
            </div>
        </div>
    );
};

export default Projects;

