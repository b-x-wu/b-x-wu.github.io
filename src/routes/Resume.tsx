import React from 'react';
import { useTitle } from '../hooks';
import ExperienceSection from '../components/resume/ExperienceSection';
import Experience from '../components/resume/Experience';
import ExperienceTitleLink from '../components/resume/ExperienceTitleLink';

const Resume: React.FC = () => {
    useTitle('b-x-wu | Resume');

    return (
        <div className='flex flex-col gap-y-6'>
            { /*Basic Info*/ }
            <div className='flex flex-col gap-y-2'>
                <div className='text-4xl font-bold'>Bridgette Wu</div>
                <div className='text-disabled'>she/her</div>
            </div>
            { /*Work Experience*/ }
            <div className='flex flex-col gap-y-6'>
                <div className='text-3xl font-bold'>Work Experience</div>
                <ExperienceSection
                    header='Amazon'
                    experiences={ [
                        {
                            title: 'Software Development Engineer II',
                            dates: 'March 2025 - Today',
                            subtitle: <div className='text-primary'>@ Amazon Private Brands</div>,
                            bulletPoints: [
                                'Coordinated system design proposals across three teams of engineers to build AI solutions for processing hundreds of pages of legal documentation',
                                'Developed automated product financial evaluation systems that drove supplier negotiations for hundreds of in-development products',
                            ],
                        },
                        {
                            title: 'Software Development Engineer',
                            dates: 'October 2023 - March 2025',
                            subtitle: <div className='text-primary'>@ Amazon Private Brands</div>,
                            bulletPoints: [
                                'Designed and implemented a ticket routing system using React Router that collectively saved two hundred days a year of ticket dwell time',
                                'Gathered stakeholder feedback to develop requirements and enhacements that eliminated user pain points responsible for 20 hours a week of churn',
                            ],
                        },
                        {
                            title: 'Software Development Intern',
                            dates: 'June 2022 - August 2022',
                            subtitle: <div className='text-primary'>@ Amazon Distribution and Fulfillment Services</div>,
                            bulletPoints: [
                                'Created a web app with a back end written in Java and a front-end written in React using Typescript all deployed with AWS Cloud Development Kit',
                                'Delivered a 30-minute demo presentation to 20 clients and composed a three-page wiki article detailing the service for future developers',
                            ],
                        },
                    ] }
                />
                <ExperienceSection
                    header='Bit Project'
                    experiences={ [
                        {
                            title: 'Program Director',
                            subtitle: <div className='text-primary'>@ Bit University</div>,
                            dates: 'February 2021 - July 2021',
                            bulletPoints: [
                                'Oversaw a 5-person team through the development of a 9 week-long undergraduate level data science curriculum about applying NumPy, Pandas, and Scikit-learn to digital humanities',
                                'Directed a 5 week-long, 6-person focus group on the curriculum and converted collected feedback into deliverables',
                            ],
                        },
                    ] }
                />
                <ExperienceSection
                    header='New York University'
                    experiences={ [
                        {
                            title: 'Learning Assistant',
                            subtitle: <div className='text-primary'>@ NYU University Learning Center</div>,
                            dates: 'January 2021 - December 2022',
                            bulletPoints: [
                                'Instructed 260 students per semester in one-on-one and group sessions in algorithms, data structures, discrete mathematical logic, and linear algebra',
                                'Developed internal tooling with a team of 4 in an Agile workflow and composed 12 pages of documentation on API usage and further development steps',
                            ],
                        },
                        {

                            title: 'Grader',
                            subtitle: <div className='text-primary'>@ Courant Institute of Mathematical Sciences</div>,
                            dates: 'August 2021 - December 2022',
                            bulletPoints: [
                                'Evaluated 110 assignments per week per semester with detailed feedback in calculus, mathematical logic, and statistical analysis',
                                'Compiled monthly reports on student performance based on aggregated grading data and presented trends in understanding to professors and peers',
                            ],
                        },
                    ] }
                />
            </div>
            { /*Education*/ }
            <div className='flex flex-col gap-y-6'>
                <div className='text-3xl font-bold'>Education</div>
                <ExperienceSection
                    header='New York University'
                    experiences={ [
                        {
                            title: 'BA in Math and Computer Science',
                            dates: 'August 2019 - December 2022',
                            bulletPoints: [],
                        },
                    ] }
                />
            </div>
            <div className='flex flex-col gap-y-6'>
                <div className='text-3xl font-bold'>Projects</div>
                <Experience
                    title={ (
                        <ExperienceTitleLink
                            linkTo='/'
                            title='b-x-wu.{github.io,online}'
                        />
                    ) }
                    subtitle='This website!'
                    bulletPoints={ [
                        'Technologies used: Node.js, Webpack, React, Typescript, Tailwind CSS',
                    ] }
                />
                <Experience
                    title={ (
                        <ExperienceTitleLink
                            linkTo='https://www.npmjs.com/package/create-react-sandbox'
                            title='Create React Sandbox'
                        />
                    ) }
                    subtitle='A command-line tool to create lightweight React environments'
                    bulletPoints={ [
                        'Technologies used: Node.js, Webpack, Babel, React, Typescript',
                    ] }
                />
                <Experience
                    title={ (
                        <ExperienceTitleLink
                            linkTo='https://b-x-wu.itch.io/visual-novel-terminal'
                            title='Visual Novel Terminal'
                        />
                    ) }
                    subtitle='A customizable visual novel reskin for the terminal'
                    bulletPoints={ [
                        'Technologies used: C#, Unity, .NET',
                    ] }
                />
            </div>
        </div>
    );
};

export default Resume;
