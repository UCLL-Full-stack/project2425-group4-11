import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FilterButtonProps {
  onClick: () => void;
  label?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick, label }) => {
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
