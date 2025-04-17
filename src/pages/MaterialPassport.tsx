import React from 'react';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './MaterialPassport.css';
import { useCollectionStore } from '../state/collectionStore';
import { CollectionName } from '../enums/collectionName';
import { getEntry } from '../table/lib/componentDataMethod';
import { GeometryType } from '../types/geometryType';
import { ComponentKeyType } from '../enums/componentKeyType';
import { GeometryKeyType } from '../enums/geometryKeyType';
import { BuildingKeyType } from '../enums/buildingKeyType';
import { BuildingType } from '../types/buildingType';
import { UserType } from '../types/userType';
import { UserKeyType } from '../enums/userKeyType';

export const MaterialPassport: React.FC = () => {
  const navigate = useNavigate();
  const collections = useCollectionStore((s) => s.collections);
  const { componentId } = useParams();
  if (componentId === undefined) return <div>No component given</div>;
  const component = collections[CollectionName.Components].find((c) => c.id === componentId);

  if (!component) return <div>Component not found</div>;

  const geometry = getEntry<GeometryType>(CollectionName.Geometries, component[ComponentKeyType.GeometryTypeId]);
  if (!geometry) return <div>Geometry not found</div>;

  const building = getEntry<BuildingType>(CollectionName.Buildings, component[ComponentKeyType.BuildingId]);
  const owner = building ? getEntry<UserType>(CollectionName.Users, building[BuildingKeyType.OwnerId]) : undefined;



const svgContent = `
  <svg width="1000" height="580" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Helvetica Neue', Helvetica, sans-serif;">
  <!-- Background -->
  <rect x="0.5" y="0.5" width="999" height="529" fill="white" stroke="#ddd" stroke-width="1" vector-effect="non-scaling-stroke"/>

  <!-- Header -->
  <rect x="0" y="0" width="1000" height="60" fill="#e8efce"/>
  <text x="40" y="40" font-size="32" fill="black" font-weight="bold">SLAB</text>
  <text x="960" y="40" font-size="16" fill="#d63e6e" font-weight="bold" text-anchor="end">circrete</text>


  <!-- Image centered and safely sized for 4:3 aspect -->
<image x="350" y="125" width="300" height="225" 
  href="https://1.bp.blogspot.com/-yJbJ_0ShYYM/XYNZLhU_eXI/AAAAAAAADbQ/MDLU_gBOVQgPsasrk9H3bVW1XQbyJLpxgCEwYBhgL/s1600/IMG_1782.JPG" 
  style="border-radius: 8px;" />


  <!-- Left Section: History + Geometry -->
  <text x="40" y="140" font-size="20" fill="#333" font-weight="bold">History</text>
  <text x="40" y="170" font-size="16" fill="#333"><tspan font-weight="normal">Manufacturer:</tspan> CRH</text>
  <text x="40" y="195" font-size="16" fill="#333"><tspan font-weight="normal">Project ID:</tspan> 2</text>
  <text x="40" y="220" font-size="16" fill="#333"><tspan font-weight="normal">Construction Date:</tspan> 1960</text>

  <text x="40" y="270" font-size="20" fill="#333" font-weight="bold">Geometry</text>
  <text x="40" y="300" font-size="16" fill="#333"><tspan font-weight="normal">Dimension:</tspan> 150x1300x2000</text>
  <text x="40" y="325" font-size="16" fill="#333"><tspan font-weight="normal">Cross Section:</tspan> HC</text>

  <!-- Right Section: Use Classes (constrained width) -->
<text x="710" y="140" font-size="20" fill="#333" font-weight="bold">Use Classes (RG1)</text>

<text font-size="16" fill="#333">
  <tspan x="710" y="170">I. No stability criteria,</tspan>
  <tspan x="730" y="190">Light to highly exposed</tspan>

  <tspan x="710" y="225">II. Self-stable,</tspan>
  <tspan x="730" y="245">Light to moderate exposure</tspan>

  <tspan x="710" y="280">III. Stable under external loads,</tspan>
  <tspan x="730" y="300">Light exposure</tspan>
</text>



  <!-- Footer Grey Band -->
  <rect x="1" y="400" width="998" height="60" fill="#f7f7f7"/>
  <text x="500" y="440" font-size="28" fill="#e3566a" font-weight="bold" text-anchor="middle">
    DA 150 C30/37 (M=60kN/m, V=95kN)
  </text>

  <!-- Bottom Info Row -->
  <rect x="1" y="460" width="998" height="50" fill="white"/>
  <text x="60" y="495" font-size="14" fill="#333">ElementID: 1  Type: S1  Count: 35</text>
</svg>
 `;


  /*const svgContent = `
  <svg width="770" height="370" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Helvetica', sans-serif;">
    <defs>
      <clipPath id="clip">
        <rect x="380" y="40" width="200" height="200" rx="30" ry="30" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="760" height="360" fill="transparent" stroke="black" stroke-width="1" rx="40" ry="40" stroke-linejoin="round" />
    <rect x="40" y="40" width="300" height="200" fill="rgb(234, 241, 207)" stroke="black" stroke-width="0" rx="40" ry="40" stroke-linejoin="round"/>

    <text x="60" y="90" font-size="28" text-anchor="start" fill="black" font-weight="bold">${
      geometry[GeometryKeyType.ComponentCategory]
    }</text>
    <text x="60" y="130" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">ID:</tspan>
      <tspan font-weight="normal"> ${component[ComponentKeyType.Id]}</tspan>
    </text>
    <text x="60" y="170" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">Available from:</tspan>
      <tspan font-weight="normal"> ${component.availableFrom || 'N/A'}</tspan>
    </text>
    <text x="60" y="210" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">Owner:</tspan>
      <tspan font-weight="normal"> ${owner ? owner[UserKeyType.Name] : 'Unknown'}</tspan>
    </text>
    
    <text x="60" y="306" font-size="24" text-anchor="start" fill="black">
      <tspan font-weight="bold" fill="rgb(34, 139, 34)">RA</tspan>
      <tspan font-weight="bold" fill="rgb(237, 171, 81)" dx="6">150</tspan>
      <tspan font-weight="bold" fill="rgb(12, 123, 152)" dx="6">C30/37</tspan>
      <tspan font-weight="bold" fill="rgb(224, 123, 213)" dx="6">(M = 60kN/m,</tspan>
      <tspan font-weight="bold" fill="rgb(224, 123, 213)" dx="6">V = 95kN)</tspan>
      <tspan font-weight="bold" fill="black" dx="12" font-size="16">Exposure Class:</tspan>
      <tspan font-weight="bold" fill="rgb(237, 171, 81)" dx="6">X0</tspan>
    </text>

    <image x="300" y="40" width="400" height="200" href="https://1.bp.blogspot.com/-yJbJ_0ShYYM/XYNZLhU_eXI/AAAAAAAADbQ/MDLU_gBOVQgPsasrk9H3bVW1XQbyJLpxgCEwYBhgL/s1600/IMG_1782.JPG" clip-path="url(#clip)"/>
  </svg>
  `;
  */

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `MaterialPassport_${component.id || 'default'}.svg`;
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className='material-passport-container'>
      <div className='material-passport'>
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
      <div className='button-container'>
        <Button type='default' onClick={handleDownload}>
          Download Material Passport
        </Button>
        <Button type='default' onClick={() => navigate('/viewer')}>
          Back to Table View
        </Button>
      </div>
    </div>
  );
};

export default MaterialPassport;
