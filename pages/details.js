import { Button, Card, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
// import { Paper, Button } from '@material-ui/core';
const species8 = require("../assets/images/species8.jpg");
const species9 = require("../assets/images/species9.jpg");
const species10 = require("../assets/images/species10.jpg");
function Details(props) {
  const items = [
    {
      img: species8,
    },
    {
      img: species9,
    },
    {
      img: species10,
    },
  ];
  const speciesDetails = {
    name: "Bryopsis indica Gepp & Gepp",
    description:
      " The full name of the genus or species can be inserted, or you can type the first four letters of the generic name and/or thefirst four letters of the species (or other) epithet in upperor lower case (e.g. Mere micr or mere micr for Meredithiamicrophylla). A full list of the species and subspecificentities in each genus can be obtained in the genus database.database ",
    plants: "Algae",
    kindom: " Animalia",
    phylum: "Bacteria",
    class: "Chormista",
    order: "Archea",
    family: "Protoza",
    genus: "fungi",
    specis: "bacteria",
    variety: "platihelmithesis",
    subVariety: "fungi",
    clone: "Arechea",
    forma: "plantae",

    additionalFiles: [
      {
        img: species9,
      },
      {
        img: species10,
      },
    ],
  };

  return (
    <Box>
        <Header index={1} />
      <Box className={styles.detailsSection}>
        <Carousel className={styles.detailsCarousel}>
          {speciesDetails.additionalFiles.map((item, i) => (
            <Item key={i} {...item} />
          ))}
        </Carousel>
        <br/>
        <Grid>
          <Card sx={{ padding: "40px" }} className={styles.detailsCard}>
            <Typography
              gutterBottom
              component="h2"
              variant="h2"
              className={styles.title1}
            >
              {speciesDetails.plants}
            </Typography>
            <br />

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Kindom</b>: {speciesDetails.kindom}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Phylum</b>: {speciesDetails.phylum}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>class</b>: {speciesDetails.class}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>order</b>: {speciesDetails.order}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>family</b>: {speciesDetails.family}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Genus</b>: {speciesDetails.genus}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Specis</b>: {speciesDetails.specis}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Variety</b>: {speciesDetails.variety}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Sub Variety</b>: {speciesDetails.subVariety}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>clone</b>: {speciesDetails.clone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>forma</b>: {speciesDetails.forma}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}

const Item = ({ img, name, description }) => {
  return (
    <Box>
    
      <Box>
        <Paper className={styles.details}>
          <Image
            className={styles.detailsImg}
            src={img}
            // layout="fill"
            width={900}
            height={400}
          />
          {/* <h2>{name}</h2>
          <p>{description}</p> */}
          {/* <Button>more info...</Button> */}
        </Paper>
      </Box>
    </Box>
  );
};
export default Details;
