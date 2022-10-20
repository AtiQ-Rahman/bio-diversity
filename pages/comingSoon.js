import { Card, Grid } from '@mui/material';
import { Box, padding } from '@mui/system';
import React from 'react';
import Footer from '../components/Home/Footer/Footer';
import Header from "../components/Home/Header";
const comingSoon = () => {
    return (
        <Box>
              <Header index={0} />
            <Grid sx={{ m: 15 }}>
            <Card style={{
               padding:"155px",
                margin: "0 auto",
                fontSize:"80px",
                paddingRight:"30px"
                // backgroundColor: "rgb(225, 253, 249)",
              }}><h1>Under Development</h1></Card>
            </Grid>
            <Footer />
        </Box>
    );
};

export default comingSoon;