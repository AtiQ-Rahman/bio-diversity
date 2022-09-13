import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { speciesList } from "../utils/speciesList";
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Container,
  useMediaQuery,
  Grid,
  Typography,
  Divider,
  TextField,
  Button,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Input,
  OutlinedInput,
  CardContent,
  Card,
  ImageList,
  ImageListItem,
  ListSubheader,
  ImageListItemBar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import styles from "../styles/Home.module.css";
import Header from "../components/Home/Header";
import Counters from "../components/Home/counters";
import CuroselCard from "../components/Home/curoselCard";
import CollapseCard from "../components/Home/collapseCard";
import Footer from "../components/Home/Footer/Footer";
const img = require("../assets/images/species3.jpg");
const species2 = require("../assets/images/species2.jpg");
import { Icon } from "@iconify/react";
import { height, width } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";

export default function Home() {
  const [spacing, setSpacing] = React.useState(2);
  const itemData = [
    {
      img: img,
      title: "Breakfast",
      author: "@bkristastucchio",
      featured: true,

    },
    {
      img: species2,
      title: "Burger",
      author: "@rollelflex_graphy726",
    },
    {
      img: species2,
      title: "Camera",
      author: "@helloimnik",
    },
  ];
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `<Grid container spacing={${spacing}}>`;
  const slides = [
    { url: img, title: "beach" },
    { url: species2, title: "boat" },
    { url: img, title: "forest" },
    { url: species2, title: "city" },
    { url: img, title: "italy" },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <Box component="section" className={styles.main_page}>
          <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
            <Grid
              item
              xs={12}
              md={12}
            // style={{ borderRadius: "20px", paddingRight: "10px" }}
            >
              <Grid className={styles.featuredContainer}>
                <Header index={0} />
                <CuroselCard slides={slides}/>
                <Grid
                  className={styles.image_container}
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"

                // style={{ minHeight: "50vh" }}
                >
                  <Grid>
                    <Typography className={styles.font}>
                      Listing The World’s BIO Diversity
                    </Typography>{" "}
                    <Counters />
                  </Grid>
                  <Grid
                    className={styles.searchField}
                    component="form"
                    sx={{
                      // p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      // width: 400,
                      height: 55,
                      // pr: "25px",
                    }}
                  >
                    <FormControl
                      sx={{ width: "25ch" }}
                      className={styles.search}
                    >
                      <OutlinedInput placeholder="Please enter text" />
                    </FormControl>
                    <Button
                      type="button"
                      sx={{ p: "14.2px" }}
                      aria-label="search"
                      style={{
                        color: "white",
                        borderRadius: 0,
                        fontWeight: 600,
                        backgroundColor: "#c44d34",
                        width: "140px",
                      }}
                    >
                      <SearchIcon /> Search
                    </Button>

                    {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
                  </Grid>
                </Grid>
              </Grid>

              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
          </Grid>
          <Grid className={styles.secondContainer}>
            <Grid
              className={styles.feature}
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"

            // style={{ minHeight: "100vh" }}
            >
              <Typography
                paddingRight={107}
                paddingBottom={3}
                fontSize={30}
                fontWeight={700}
              >
                Recent sightings
              </Typography>

              <ImageList
                gap={40}
                sx={{ width: 1100,}}
                cols={3}
                rowHeight={250}
                className={styles.imageList}
              >
                {itemData.map((item) => (
                  <ImageListItem className={styles.overlay} key={item.img} >
                    <Image
                      src={item.img}
                      layout="fill"

                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                    // loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.title}
                      subtitle={item.author}
                      position="bottom"
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Grid>
        </Box>
      </div>

      <Footer />
    </div>
  );
}

