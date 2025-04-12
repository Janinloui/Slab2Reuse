import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Slab2ReuseRoutes } from '../enums/routes';

interface MPPButtonProps {
  element: { id: number }; // Adjust the type based on your `element` structure
}

const MPPButton: React.FC<MPPButtonProps> = ({ element }) => {
  const navigate = useNavigate();

  const handleViewMPP = () => {
    navigate(Slab2ReuseRoutes.MaterialPassport.replace(':id', element.id.toString())); // Navigate to the Material Passport page
  };

  return (
    <button
      onClick={handleViewMPP}
      style={{
        padding: '6px 12px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      View MPP
    </button>
  );
};

export default MPPButton;
