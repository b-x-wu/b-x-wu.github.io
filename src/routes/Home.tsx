import React, { useMemo } from 'react';
import { useTitle } from '../hooks';
import Chatbox from '../components/home/Chatbox';
import { BUNNY_SIGN_ELEMENT } from '../components/constants';

const Home: React.FC = () => {
    useTitle('b-x-wu');

    const dateString = useMemo(() => {
        return (new Date()).toUTCString();
    }, []);

    return (
        <div className='flex flex-col space-y-4'>
            <div className='flex h-9 w-full items-center justify-center text-center'>
                <div className='text-disabled'>{ dateString }</div>
            </div>
            <Chatbox content={ <span className='text-secondary'>joined the room</span> } />
            <Chatbox content={ 'hi i\'m b :]' } />
            <Chatbox content={ 'i\'m a software developer at amazon' } />
            <Chatbox content='and sometimes i work on small stuff outside of that. like this website!' />
            <Chatbox content='if you want, feel free to say hi!' />
            <Chatbox content='but otherwise...' />
            <Chatbox content={ BUNNY_SIGN_ELEMENT } />
        </div>
    );
};

export default Home;
