import CircularProgress from '@mui/material/CircularProgress';

import { Box } from '@mui/system';
import React from 'react';
let commonStyle= {
    display: 'flex', paddingLeft: "50%", paddingTop: "10%" 
}
const Loader2 = (props) => {
  return (
    <Box sx={{ ...props.style ?? commonStyle }}>
      <CircularProgress />
    </Box>

  );
};

export default Loader2;