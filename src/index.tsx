import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Slab2ReuseRoutes } from './enums/routes';
import { BoilerPlateData } from './state/boilerPlateData';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<BoilerPlateData />} path={Slab2ReuseRoutes.NewDataModelBoilerPlate} />
        {/* <Route element={<Landing />} path='/' />
        <Route element={wrapper(<ExampleData />)} path={Slab2ReuseRoutes.ExampleData} />
        <Route element={wrapper(<Viewer />)} path={Slab2ReuseRoutes.Viewer} />
        <Route
          element={wrapper(
            <div style={{ height: '100svh' }}>
              <ThreeScene />
            </div>
          )}
          path={Slab2ReuseRoutes.ThreeOnly}
        />
        <Route element={wrapper(<SlabTable />)} path={Slab2ReuseRoutes.TableOnly} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);

//Initializes the app with the landing page
