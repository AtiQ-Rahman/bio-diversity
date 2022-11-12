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
import styles from "../../styles/Home.module.css";
import BiotechIcon from '@mui/icons-material/Biotech';
import ImageIcon from '@mui/icons-material/Image';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { Icon } from "@iconify/react";
// Material Kit 2 React examples
import DefaultCounterCard from "./DefaultCounterCard";
import { width } from "@mui/system";
import { useEffect, useState } from "react";
import callApi from "../../utils/callApi";

function Counters() {
  const [totalSpecies, setTotalSpecies] = useState([])
  const [totalAvailable, setTotalAvailable] = useState([])
  const [totalRequested, setTotalRequested] = useState([])

  useEffect(() => {
    async function fetchData() {
      let response = await callApi("/count-all-species", {});
      if (response.data) {
        setTotalSpecies(response.data.total)
        setTotalAvailable(response.data.totalAvailable)
        setTotalRequested(response.data.totalRequestedSpecies)
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (


    <Grid container item xs={12} lg={12} md={12} >
      <Grid item xs={12} md={4} >
        {/* <Icon icon="material-symbols:biotech-outline" /> */}
        <DefaultCounterCard

          count={totalSpecies}
          suffix="+"
          // title="Species"
          description="From teknaf to tetulia"
          actionIcon={
            <IconButton
              sx={{ color: "white" }}
            >
              < BiotechIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          }
        // backgroundColor="#0f4c39"

        />
      </Grid>
      <Grid item xs={12} md={4}>
        <DefaultCounterCard
          count={totalAvailable}
          suffix="+"
          // backgroundColor="#2c8f7c"

          // title="Images"
          description="Available for checking"
          actionIcon={
            <IconButton
              sx={{ color: "white" }}

            >
              < ImageIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          }
        />
      </Grid>
      <Grid item xs={12} md={4} >
        <DefaultCounterCard
          count={totalRequested}
          suffix="+"
          // title="Request"
          description="For adding on our server"
          // backgroundColor="#0f4c39"
          actionIcon={
            <IconButton
              sx={{ color: "white" }}
            >
              < ContentPasteSearchIcon sx={{ fontSize: "40px" }} />
            </IconButton>
          }
        />
      </Grid>
    </Grid>


  );
}

export default Counters;
