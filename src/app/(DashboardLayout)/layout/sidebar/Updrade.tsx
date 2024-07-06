import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const Upgrade = () => {
  return (
    <Box
      display='flex'
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}
    >
      <>
        <Box>
          <Typography variant="h5" sx={{ width: "200px" }} fontSize='16px' mb={1}>
            Gérez vos ouvrages efficacement
          </Typography>
          <Button
            color="primary"
            
            disableElevation
           
            variant="contained"
            aria-label="manage-ouvrages"
            size="small"
          >
            Gérer les ouvrages
          </Button>
          <Image alt="Books" src="/images/backgrounds/Books.png" width={200} height={200} />

        </Box>
        
      </>
    </Box>
  );
};
