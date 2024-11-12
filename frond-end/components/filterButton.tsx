import React from 'react';
import { Button } from '@mui/material';

interface FilterButtonProps {
  onClick: () => void;
  label?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick, label = "Filter" }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
