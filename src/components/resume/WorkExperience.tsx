import React from 'react';

export interface WorkExperienceProps {
    position: string;
    dates: string;
    bulletPoints: string[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
    position,
    dates,
    bulletPoints,
}) => {
    return (
        <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col md:flex-row md:place-content-between md:align-baseline'>
                <div className='text-lg'>{position}</div>
                <div className='text-sm md:text-lg'>{dates}</div>
            </div>
            <ul className='flex list-inside list-image-bullet-disabled flex-col gap-y-2 text-disabled'>
                {bulletPoints.map((bulletPoint, bulletPointIndex) => (
                    <li key={`${bulletPoint.slice(5)}-${bulletPointIndex}`}>{bulletPoint}</li>
                ))}
            </ul>
        </div>
    );
};

export default WorkExperience;
