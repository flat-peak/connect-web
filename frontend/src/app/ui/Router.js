import {createMemoryRouter,  createHashRouter, Route,} from 'react-router-dom';
import React from 'react';
import {
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Providers from '../../pages/Providers';

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/" element={<Providers/>}/>
  </Route>
)

// const router = createMemoryRouter(routes);
const router = createHashRouter(routes);

function Router() {
  return (
    <RouterProvider router={router} />
  );
}

export default Router;
