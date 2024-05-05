import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Error404 from './routes/Error404';
import Home from './routes/Home';

const Router = (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='*' element={<Error404 />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
