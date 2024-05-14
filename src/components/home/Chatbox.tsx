import React from 'react';

export interface ChatboxProps {
    username?: string;
    content: string | React.JSX.Element | React.JSX.Element[];
}

const Chatbox: React.FC<ChatboxProps> = ({
    username = 'b-x-wu',
    content,
}: ChatboxProps) => {
    return (
        <div className='flex min-h-9 w-full flex-row flex-nowrap items-end space-x-4'>
            <div className='shrink-0 text-primary'>{ `${username}:` }</div>
            <div>{ content }</div>
        </div>
    );
};

export default Chatbox;
