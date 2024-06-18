import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Error404 from './routes/Error404';
import Home from './routes/Home';
import Resume from './routes/Resume';
import Projects from './routes/projects/Projects';
import PixelSvgMakerPage from './routes/projects/PixelSvgMakerPage';
import ShaderToyPage from './routes/projects/ShaderToyPage';

const Router = (
    <BrowserRouter>
        <Routes>
            <Route element={ <Layout /> }>
                <Route index element={ <Home /> } />
                <Route path='resume' element={ <Resume /> } />
                <Route path='projects'>
                    <Route index element={ <Projects /> } />
                    <Route path='pixel-svg-maker' element={ <PixelSvgMakerPage /> } />
                    <Route path='shader-toy' element={ <ShaderToyPage /> } />
                </Route>
                <Route path='*' element={ <Error404 /> } />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
