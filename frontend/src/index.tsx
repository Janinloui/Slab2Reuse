import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Slab2ReuseRoutes } from './enums/routes';
import { BoilerPlateData } from './element/BoilerPlateData';
import { GenericTableEntry } from './table/GenericTypeTable';
import { ComponentTypeTable } from './table/ComponentTypeTable';
import { ThreeScene } from './webgl/ThreeScene';
import { MaterialPassport } from './pages/MaterialPassport';
import { Landing } from './Landing';
import { Header } from './globalUI/Header';
import { Viewer } from './Viewer';
import { DataModelGraph } from './generic/DataModelGraph';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route element={<BoilerPlateData />} path={Slab2ReuseRoutes.BoilerPlate} />
        <Route element={<GenericTableEntry />} path={Slab2ReuseRoutes.RawTableView} />
        <Route element={<ComponentTypeTable />} path={Slab2ReuseRoutes.TableOnly} />
        <Route element={<Viewer />} path={Slab2ReuseRoutes.Viewer} />
        <Route
          element={
            <div style={{ height: '100svh' }}>
              <ThreeScene />
            </div>
          }
          path={Slab2ReuseRoutes.ThreeOnly}
        />
        <Route element={<MaterialPassport />} path={Slab2ReuseRoutes.MaterialPassport} />
        <Route element={<Landing />} path='/' />
        <Route element={<DataModelGraph />} path={Slab2ReuseRoutes.DataModelGraph} />
      </Routes>
    </Router>
  </React.StrictMode>
);

//Initializes the app with the landing page
