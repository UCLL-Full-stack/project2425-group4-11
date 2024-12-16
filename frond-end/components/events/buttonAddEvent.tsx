import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';

interface AddEventButtonProps {
  label?: string;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({ label = "" }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/events/addEvents');
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#555',
        },
      }}
    >
      <AddIcon sx={{ marginRight: 1 }} />
      {label}
    </Button>
  );
};

export default AddEventButton;