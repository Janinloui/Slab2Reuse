import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Viewer } from './Viewer';
import { ThreeScene } from './webgl/ThreeScene';
import { Slab2ReuseRoutes } from './enums/routes';
import { SlabTable } from './table/SlabTable';
import { ExampleData } from './tests/ExampleData';
import { Landing } from './Landing';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<Landing />} path='/' />
        <Route element={<ExampleData />} path={Slab2ReuseRoutes.ExampleData} />
        <Route element={<Viewer />} path={Slab2ReuseRoutes.Viewer} />
        <Route element={<ThreeScene />} path={Slab2ReuseRoutes.ThreeOnly} />
        <Route element={<SlabTable />} path={Slab2ReuseRoutes.TableOnly} />
      </Routes>
    </Router>
  </React.StrictMode>
);
