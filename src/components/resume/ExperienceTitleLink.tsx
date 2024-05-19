import { Link } from 'react-router-dom';
import React from 'react';

export interface ExperienceTitleLinkProps {
    title: string;
    linkTo: string;
}

const ExperienceTitleLink: React.FC<ExperienceTitleLinkProps> = ({
    title,
    linkTo,
}: ExperienceTitleLinkProps) => {
    return (
        <Link
            className='text-enabled relative flex flex-row items-center gap-x-2 underline-offset-2 has-[:hover]:underline'
            to={ linkTo }
        >
            <div className='text-enabled shrink-0 text-lg font-bold'>{ title }</div>
            <div className='peer bg-enabled min-h-4 min-w-4 bg-clip-[url(/static/icons/link.svg)]' />
        </Link>
    );
};

export default ExperienceTitleLink;
