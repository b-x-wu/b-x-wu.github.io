import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Error404 from './routes/Error404';
import Home from './routes/Home';
import Resume from './routes/Resume';
import Projects from './routes/projects/Projects';

const Router = (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='resume' element={<Resume />} />
                <Route path='projects'>
                    <Route index element={<Projects />} />
                </Route>
                <Route path='*' element={<Error404 />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
