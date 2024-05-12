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
            className='relative flex flex-row items-center gap-x-2 text-enabled underline-offset-2 has-[:hover]:underline'
            to={ linkTo }
        >
            <div className='shrink-0 text-lg text-enabled'>{ title }</div>
            <div className='peer min-h-4 min-w-4 bg-enabled bg-clip-[url(/static/icons/link.svg)]' />
        </Link>
    );
};

export default ExperienceTitleLink;
