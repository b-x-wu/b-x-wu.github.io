import React, { useMemo, useContext } from 'react';
import { Link } from 'react-router-dom';
import Chatbox from '../../components/home/Chatbox';
import Window from '../../components/common/Window';
import ImageSuspense from '../../components/common/ImageSuspense';
import { DarkModeContext, ReducedMotionModeContext } from '../../components/contexts';
import { useTitle } from '../../hooks';

const Projects: React.FC = () => {

    const isDarkMode = useContext(DarkModeContext);
    const isReducedMotion = useContext(ReducedMotionModeContext);
    const dateString = useMemo(() => (new Date()).toUTCString(), []);

    useTitle('b-x-wu | Projects');

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
                            className='size-full object-cover object-top'
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
                            src={
                                isReducedMotion 
                                    ? 'static/images/project-previews/create-react-sandbox-preview-reduced-motion.png' 
                                    : '/static/images/project-previews/create-react-sandbox-preview.gif'
                            }
                            alt='Create React Sandbox preview background'
                            className='absolute size-full object-fill'
                        />
                        <div className='absolute size-full backdrop-blur-sm' />
                        <ImageSuspense
                            src={
                                isReducedMotion 
                                    ? 'static/images/project-previews/create-react-sandbox-preview-reduced-motion.png' 
                                    : '/static/images/project-previews/create-react-sandbox-preview.gif'
                            }
                            alt='Create React Sandbox preview'
                            className='absolute left-1/2 top-1/2 max-h-full max-w-full -translate-x-1/2 -translate-y-1/2'
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
                        <ImageSuspense
                            src={
                                isReducedMotion
                                    ? '/static/images/project-previews/visual-novel-terminal-preview-reduced-motion.png'
                                    : '/static/images/project-previews/visual-novel-terminal-preview.gif'
                            }
                            alt='Visual Novel Terminal preview'
                            className='size-full object-cover object-bottom'
                        />
                    </Link>
                </Window>
                <Window
                    title='Palette Posterizer'
                    optionsBar='A web app for customizable posterization'
                    controlButtons={ [
                        <Link to='/projects/palette-posterizer' key='palette-posterizer-link'>
                            <div className="bg-text size-4 bg-clip-[url('/static/icons/link.svg')]" />
                        </Link>,
                    ] }
                >
                    <Link to='/projects/palette-posterizer' className='h-64'>
                        <ImageSuspense
                            src={
                                isDarkMode
                                    ? '/static/images/project-previews/palette-posterization-preview-dark.png'
                                    : '/static/images/project-previews/palette-posterization-preview.png'
                            }
                            alt='Palette Posterizer preview'
                            className='size-full object-cover object-center'
                        />
                    </Link>
                </Window>
            </div>
        </div>
    );
};

export default Projects;

