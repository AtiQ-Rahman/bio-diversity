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
import styles from "../../../styles/Home.module.css";

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

      
        <Grid container item xs={12} lg={12} md={12} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4} >
            <DefaultCounterCard
              count={2000}
              suffix="+"
              title="Species"
              description="From teknaf to tetulia"
              backgroundColor="#0f4c39"

            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={3000}
              suffix="+"
              backgroundColor="#2c8f7c"

              title="Images"
              description="Available for checking"
            />
          </Grid>
          <Grid item xs={12} md={4} >
            <DefaultCounterCard
              count={1000}
              suffix="+"
              title="Request"
              description="For adding on our server"
              backgroundColor="#0f4c39"

            />
          </Grid>
        </Grid>
    
  
  );
}

export default Counters;
