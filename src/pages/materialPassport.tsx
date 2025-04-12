import React from 'react';
import { Button } from 'antd'; // Import the Button component from antd
import { useNavigate, useParams } from 'react-router-dom';
import './MaterialPassport.css';

const MaterialPassport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const svgContent = `
  <svg width="770" height="370" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Helvetica', sans-serif;">
    <defs>
      <clipPath id="clip">
        <rect x="380" y="40" width="200" height="200" rx="30" ry="30" />
      </clipPath>
    </defs>

    <rect x="4" y="4" width="760" height="360" fill="transparent" stroke="black" stroke-width="1" rx="40" ry="40" stroke-linejoin="round" />
    <rect x="40" y="40" width="300" height="200" fill="rgb(234, 241, 207)" stroke="black" stroke-width="0" rx="40" ry="40" stroke-linejoin="round"/>

    <text x="60" y="90" font-size="28" text-anchor="start" fill="black" font-weight="bold">SLAB</text>
    <text x="60" y="130" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">X</tspan>
      <tspan font-weight="normal"> Pieces (x,x,x)</tspan>
    </text>
    <text x="60" y="170" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">Available from:</tspan>
      <tspan font-weight="normal"> 20.07.2025</tspan>
    </text>
    <text x="60" y="210" font-size="18" text-anchor="start" fill="grey">
      <tspan font-weight="bold">Owner:</tspan>
      <tspan font-weight="normal"> Jørgen Jørgensen</tspan>
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

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `MaterialPassport_${id || 'default'}.svg`;
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="material-passport-container">
      <div className="material-passport">
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
      <div className="button-container">
        <Button type="default" onClick={handleDownload}>
          Download Material Passport
        </Button>
        <Button type="default" onClick={() => navigate('/viewer')}>
          Back to Table View
        </Button>
      </div>
    </div>
  );
};

export default MaterialPassport;
