import React from 'react';
import { useTitle } from '../hooks';
import WorkExperience from '../components/resume/WorkExperience';

const Resume: React.FC = () => {
    useTitle('b-x-wu | Resume');

    return (
        <div className='flex flex-col gap-y-8'>
            <div className='flex flex-col gap-y-2'>
                <div className='text-3xl font-bold'>Bridgette X. Wu</div>
                <div className='text-disabled'>they/she</div>
            </div>
            <div className='flex flex-col gap-y-6'>
                <div className='text-2xl font-bold'>Work Experience</div>
                <div className='flex flex-col gap-y-4'>
                    <div className='text-xl text-secondary'>Amazon</div>
                    <div className='flex flex-col gap-y-4'>
                        <WorkExperience
                            position='Software Development Engineer'
                            dates='October 2023 - Today'
                            bulletPoints={[ 'WIP' ]}
                        />
                        <WorkExperience
                            position='Software Development Intern'
                            dates='June 2022 - August 2022'
                            bulletPoints={[
                                'Created a web app with a back end written in Java and a front-end written in React using Typescript all served with AWS CloudWatch',
                                'Delivered a 30-minute demo presentation to 20 clients and composed a three-page wiki article detailing the service for future developers',
                            ]}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='text-xl text-secondary'>Bit Project</div>
                    <div className='flex flex-col gap-y-4'>
                        <WorkExperience
                            position='Program Director'
                            dates='February 2021 - July 2021'
                            bulletPoints={[
                                'Oversaw a 5-person team through the development of a 9 week-long undergraduate level data science curriculum about applying NumPy, Pandas, and Scikit-learn to digital humanities',
                                'Directed a 5 week-long, 6-person focus group on the curriculum and converted collected feedback into deliverables',
                            ]}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <div className='text-xl text-secondary'>New York University</div>
                    <div className='flex flex-col gap-y-4'>
                        <WorkExperience
                            position='Learning Assistant'
                            dates='January 2021 - December 2022'
                            bulletPoints={[
                                'Instructed 260 students per semester in one-on-one and group sessions in algorithms, data structures, discrete mathematical logic, and linear algebra',
                                'Developed internal tooling with a team of 4 in an Agile workflow and composed 12 pages of documentation on API usage and further development steps',
                            ]}
                        />
                        <WorkExperience
                            position='Grader'
                            dates='August 2021 - December 2022'
                            bulletPoints={[
                                'Evaluated 110 assignments per week per semester with detailed feedback in the subjects of calculus, mathematical logic, and statistical analysis',
                                'Compiled monthly reports on student performance based on aggregated grading data and presented trends in understanding to professors and peers',
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
