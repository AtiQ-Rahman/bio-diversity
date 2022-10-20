import { Card, Grid } from '@mui/material';
import { Box, padding, textAlign } from '@mui/system';
import React from 'react';
import Footer from '../components/Home/Footer/Footer';
import Header from "../components/Home/Header";
const faq = () => {
    return (
        <Box>
              <Header index={0} />
            <Grid sx={{ m: 15 }}>
            <Card style={{
               padding:"155px",
                margin: "0 auto",
                fontSize:"50px",
                paddingRight:"30px",
                textAlign:"center"
                // backgroundColor: "rgb(225, 253, 249)",
              }}><h5>FAQ</h5>
                <h3>Under Development</h3></Card>
            </Grid>
            <Footer />
        </Box>
    );
};

export default faq;