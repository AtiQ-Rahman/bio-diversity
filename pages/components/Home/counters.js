/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
  } from "@mui/material";

// Material Kit 2 React examples
import DefaultCounterCard from "./DefaultCounterCard";

function Counters() {
  return (
    <Box component="section" py={3} sx ={{    background: "#5e35b1",
      color: "white",
      borderRadius: "0px 20px"}}>
      
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={2000}
              suffix="+"
              title="Species"
              description="From teknaf to tetulia"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            {/* <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, mx: 0 }} /> */}
            <DefaultCounterCard
              count={1500}
              suffix="+"
              title="genus"
              description="We are still on it."
            />
            {/* <Divider orientation="vertical" sx={{ display: { xs: "none", md: "block" }, ml: 0 }} /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={3000}
              title="Images"
              description="Available for checking"
            />
          </Grid>
        </Grid>
    
    </Box>
  );
}

export default Counters;
