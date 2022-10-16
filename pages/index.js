import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { speciesList } from "../utils/speciesList";
import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
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
const imageSrc = require("../assets/images/species4.jpg");
const imageSrc2 = require("../assets/images/species5.jpg");
const imageSrc3 = require("../assets/images/species6.jpg");
const species7 = require("../assets/images/species7.jpg");
const species8 = require("../assets/images/species8.jpg");
const species9 = require("../assets/images/species9.jpg");
const species10 = require("../assets/images/species10.jpg");
const species12 = require("../assets/images/species12.jpg");
import blurImage from "../assets/images/blur.jpg";
const species3 = require("../assets/images/species3.jpg");
import { Icon } from "@iconify/react";
import { height, width } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import callApi, { imageUrl } from "../utils/callApi";
import { imageLoader } from "../utils/utils";

export default function Home() {
  const [spacing, setSpacing] = React.useState(2);
  const itemData = [
    {
      img: species8,
      title: "Butterfly",
      author: "@bkristastucchio",
      featured: true,
    },
    {
      img: species10,
      title: "Turtle",
      author: "@rollelflex_graphy726",
    },
    {
      img: species7,
      title: "Deer",
      author: "@helloimnik",
    },
  ];
  const [slides, setSlides] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState({});
  const [selectedRecentSightings, setSelectedRecentSightings] = React.useState([]);
  async function fetchData() {
    let response = await callApi("/get-selected-template", {});
    if (response.data.length > 0) {
      let sliderImages = response.data[0].sliderImages.split(',')
      sliderImages.map((item) => {
        slides.push({
          url: imageUrl + '/' + item,
          title: item
        })
      })
      let allSpecies = await callApi("/get-species-list", {});
      if (allSpecies.data.length > 0) {
        console.log(allSpecies.data)
        let speciesList = allSpecies.data
        speciesList = speciesList.sort((a, b) => {
          if (a.createdDatetimeStamp > b.createdDatetimeStamp) return -1;
          if (a.createdDatetimeStamp < b.createdDatetimeStamp) return 1;
          return 0;
        });
        console.log(speciesList.slice(0, parseInt(response.data[0]?.recentSighting)))
        if (speciesList.length < parseInt(response.data[0]?.recentSighting)) {
          setSelectedRecentSightings(speciesList)
        }
        else {
          setSelectedRecentSightings(speciesList.slice(0, parseInt(response.data[0]?.recentSighting)))
        }
      }
    }

  }
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLoad = (event) => {
    event.persist();
    if (event.target.srcset) {
      setReady(true);
    }
  };

  return (
    <div className={styles.body}>
      <Grid container xs={12} md={12}>
        <Grid item xs={12} md={12}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
            // style={{ borderRadius: "20px", paddingRight: "10px" }}
            >
              <Grid className={styles.featuredContainer}>
                <Header index={0} />
                {slides.length > 0 ? (
                  <CuroselCard slides={slides} />
                ) : null}

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
                    sx={{ width: 1100 }}
                    cols={3}
                    rowHeight={250}
                    className={styles.imageList}
                  >
                    {selectedRecentSightings.map((item) => (
                      <ImageListItem
                        className={styles.overlay}
                        key={item.img}
                        style={{
                          opacity: ready ? 1 : 0,
                          transition: "all .3s ease-in",
                        }}
                      >
                        <Image
                          src={imageUrl + '/' + item.profile_image}
                          layout="fill"
                          
                          loader={imageLoader}
                          onLoad={handleLoad}
                          // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.common}
                        // loading="lazy"
                        />
                        <ImageListItemBar
                          title={item.english}
                          subtitle={item.category}
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
              <Grid item xs={12} md={12}>
                {/* <Footer /> */}
              </Grid>
              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
