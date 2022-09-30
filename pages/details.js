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
      name: "Bryopsis indica Gepp & Gepp",
      description: " The full name of the genus or species can be inserted, or you can type the first four letters of the generic name and/or thefirst four letters of the species (or other) epithet in upperor lower case (e.g. Mere micr or mere micr for Meredithiamicrophylla). A full list of the species and subspecificentities in each genus can be obtained in the genus database.database ",
      img: species8,
    },
    {
      name: "Bryopsis indica Gepp & Gepp",
      description: " The full name of the genus or species can be inserted, or you can type the first four letters of the generic name and/or thefirst four letters of the species (or other) epithet in upperor lower case (e.g. Mere micr or mere micr for Meredithiamicrophylla). A full list of the species and subspecificentities in each genus can be obtained in the genus database.database ",
      img: species9,
    },
    {
      name: "Bryopsis indica Gepp & Gepp",
      description: " The full name of the genus or species can be inserted, or you can type the first four letters of the generic name and/or thefirst four letters of the species (or other) epithet in upperor lower case (e.g. Mere micr or mere micr for Meredithiamicrophylla). A full list of the species and subspecificentities in each genus can be obtained in the genus database.database ",
      img: species10,
    },
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} {...item} />
      ))}
    </Carousel>
  );
}

const Item = ({ img, name, description }) => {
  return (
    <Box >
         <Header index={1} />
      <Box>
       
        <Paper className={styles.details}>
          <Image 
          className={styles.detailsImg}
            src={img}
            // layout="fill"
            width={2000}
            height={800}
           
          />
          {/* <h2>{name}</h2>
          <p>{description}</p> */}
          {/* <Button>more info...</Button> */}
          <Grid>
        <Card sx={{padding:"100px"}}>
                <Typography gutterBottom component="h2" variant="h2">
                 {name}
                </Typography>
                <Typography gutterBottom component="description" variant="div">
                {description}
                </Typography>
              </Card>
        </Grid>
        </Paper>
     
      </Box>
      {/* <Footer  style={{ padding: "100px" }} /> */}
    </Box>
  );
};
export default Details;
