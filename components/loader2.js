import CircularProgress from '@mui/material/CircularProgress';

import { Box } from '@mui/system';
import React from 'react';

const Loader2 = (props) => {
  return (


    <Box sx={{ display: 'flex', paddingLeft: "50%", paddingTop: "10%" }}>
      <CircularProgress />
    </Box>

  );
};

export default Loader2;