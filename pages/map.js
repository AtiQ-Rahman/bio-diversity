import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Header from "./components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "./components/Home/Footer/Footer";
import { margin } from "@mui/system";
import Counters from "./components/Home/counters";
const imageSrc = require("../pages/assets/images/species1.jpg");
const map = require("../pages/assets/images/map.png");
const Map = () => {
  return (
    <div className={styles.body}>
      <Header index={2} />
      <div className={styles.main}>
      <Box
        className={styles.main_box}
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          mt: 10,
        }}
      >
        <Grid
          container
          spacing={3}
          xs={12}
          md={12}
          sx={{ m: 4 }}
          style={{ marginRight: "5px"}}
        >
          <Grid
            item
            md={10}
            xl={8}
            xs={12}
           
            style={{ borderRadius: "10px" }}
            // style={{  paddingRight: "20px" }}
          >
            <Image width={1000}height={500} src={map}></Image>
          </Grid>
          <Grid
            sx={{boxShadow: "1px solid blac"}}
            style={{ borderRadius: "10px"}}
            item
            lg={4}
            md={2}
            xl={4}
            xs={12}
          >
            <Card sx={{ maxWidth: 345 }}>
              <Image src={imageSrc}></Image>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Species
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The full name of the genus or species can be inserted, or you
                  can type the first four letters of the generic name and/or the
                  first four letters of the species (or other) epithet in upper
                  or lower case (e.g. Mere micr or mere micr for Meredithia
                  microphylla). A full list of the species and subspecific
                  entities in each genus can be obtained in the genus database.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/*  */}
      </Box>
      </div>


      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
};

export default Map;
