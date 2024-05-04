import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

const Router = (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<div>INDEX ELEMENT FOR LAYOUT</div>} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default Router;
