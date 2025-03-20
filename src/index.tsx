import React, { ReactNode } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Viewer } from './Viewer';
import { ThreeScene } from './webgl/ThreeScene';
import { Slab2ReuseRoutes } from './enums/routes';
import { SlabTable } from './table/SlabTable';
import { ExampleData } from './tests/ExampleData';
import { Landing } from './Landing';
import { NavigationHeader } from './NavigationHeader';

const wrapper = (node: ReactNode) => (
  <>
    <NavigationHeader />
    {node}
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<Landing />} path='/' />
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
        <Route element={wrapper(<SlabTable />)} path={Slab2ReuseRoutes.TableOnly} />
      </Routes>
    </Router>
  </React.StrictMode>
);


//Initializes the app with the landing page