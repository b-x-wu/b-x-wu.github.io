import React from 'react';

export interface ExperienceProps {
    title: string | React.JSX.Element;
    subtitle?: string | React.JSX.Element;
    dates?: string;
    bulletPoints: string[];
}

const Experience: React.FC<ExperienceProps> = ({
    title,
    subtitle,
    dates,
    bulletPoints,
}) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col'>
                <div className='flex flex-col md:flex-row md:place-content-between md:align-baseline'>
                    { typeof title === 'string' ? <div className='text-lg font-bold'>{ title }</div> : title }
                    { dates !== undefined ? <div className='text-sm md:text-lg'>{ dates }</div> : <></> }
                </div>
                { subtitle === undefined ? <></> : <div>{ subtitle }</div> }
            </div>
            <ul className='text-disabled flex list-inside flex-col gap-y-2'>
                { bulletPoints.map((bulletPoint, bulletPointIndex) => (
                    <li
                        key={ `${bulletPoint.slice(5)}-${bulletPointIndex}` }
                        className='list-image-clip-[url(/static/icons/bullet.svg)] list-image-clip-size-2.5 list-image-clip-color-disabled'
                    >
                        { bulletPoint }
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default Experience;
