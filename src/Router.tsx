import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<div>Default route.</div>} />
    )
)

export default Router;
