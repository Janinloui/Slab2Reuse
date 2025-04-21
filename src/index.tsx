import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Slab2ReuseRoutes } from './enums/routes';
import { BoilerPlateData } from './element/BoilerPlateData';
import { GenericTableEntry } from './table/GenericTypeTable';
import { ComponentTypeTable } from './table/ComponentTypeTable';
import { ComponentDerivedAttributes } from './enums/componentDerivedAttributes';
import { ComponentKeyType } from './enums/componentKeyType';
import { ThreeScene } from './webgl/ThreeScene';
import { MaterialPassport } from './pages/MaterialPassport';
import { Landing } from './Landing';
import { MultiTestKeys, SelectedPreStressStrandKeys } from './types/dataOfTestsForGeometryType';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<BoilerPlateData />} path={Slab2ReuseRoutes.BoilerPlate} />
        <Route element={<GenericTableEntry />} path={Slab2ReuseRoutes.RawTableView} />
        <Route element={<ComponentTypeTable canChange />} path={Slab2ReuseRoutes.TableOnly} />
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
      </Routes>
    </Router>
  </React.StrictMode>
);

//Initializes the app with the landing page
