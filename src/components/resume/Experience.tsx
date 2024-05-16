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
                    { typeof title === 'string' ? <div className='text-lg'>{ title }</div> : title }
                    { dates !== undefined ? <div className='text-sm md:text-lg'>{ dates }</div> : <></> }
                </div>
                { subtitle === undefined ? <></> : <div>{ subtitle }</div> }
            </div>
            <ul className='flex list-inside list-image-bullet-disabled flex-col gap-y-2 text-disabled'>
                { bulletPoints.map((bulletPoint, bulletPointIndex) => (
                    <li key={ `${bulletPoint.slice(5)}-${bulletPointIndex}` }>{ bulletPoint }</li>
                )) }
            </ul>
        </div>
    );
};

export default Experience;
