import React, { useMemo } from 'react';
import { useTitle } from '../hooks';
import Chatbox from '../components/home/Chatbox';

/* eslint-disable no-irregular-whitespace -- eslint does not like the bunny */
const BUNNY_SIGN_ELEMENT: React.JSX.Element = (
    <pre>
┌────────────────┐<br />
│                │<br />
│   THANKS FOR   │<br />
│  HANGING OUT!  │<br />
│                │<br />
└────────────────┘<br />
(\__/)  ││<br />
( •o•)  ││<br />
/ 　 づ<br />
    </pre>
);
/* eslint-enable no-irregular-whitespace */

const Home: React.FC = () => {
    useTitle('b-x-wu');

    const dateString = useMemo(() => {
        return (new Date()).toUTCString();
    }, []);

    return (
        <div className='flex flex-col space-y-4'>
            <div className='flex h-9 w-full items-center justify-center'>
                <div className='text-disabled'>{dateString}</div>
            </div>
            <Chatbox content={<span className='text-secondary'>joined the room</span>} />
            <Chatbox content={'hi i\'m b :]'} />
            <Chatbox content={'i\'m a software developer at amazon'} />
            <Chatbox content='and sometimes i work on small stuff outside of that. like this website!' />
            <Chatbox content='if you want, feel free to say hi!' />
            <Chatbox content='but otherwise...' />
            <Chatbox content={BUNNY_SIGN_ELEMENT} />
        </div>
    );
};

export default Home;
