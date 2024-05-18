import React from 'react';
import Experience, { ExperienceProps } from './Experience';

export interface ExperienceSectionProps {
    header?: string;
    experiences: ExperienceProps[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
    header,
    experiences,
}: ExperienceSectionProps) => {
    const experienceComponents = experiences.map((experienceProps) => (
        <Experience
            { ...experienceProps }
            key={ `[${header ?? 'experience_section'}][${experienceProps.title}]` }
        />
    ));

    return (
        <div className='flex flex-col gap-y-4'>
            { header !== undefined ? <div className='text-secondary text-xl'>{ header }</div> : <></> }
            <div className='flex flex-col gap-y-8'>
                { experienceComponents }
            </div>
        </div>
    );
};

export default ExperienceSection;
