import * as React from "react";
import Image from "next/legacy/image";
import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

import styles from "../styles/Home.module.css";
import Header from "../components/Home/Header";
import CuroselCard from "../components/Home/curoselCard";
import Footer from "../components/Home/Footer/Footer";
import callApi, { imageUrl } from "../utils/callApi";
import { imageLoader } from "../utils/utils";
import Link from "next/link";

export default function Home() {
  const [slides, setSlides] = React.useState([]);
  const [ready, setReady] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState({});
  const [selectedRecentSightings, setSelectedRecentSightings] = React.useState([]);
  async function fetchData() {
    let response = await callApi("/get-selected-template", {});
    if (response.data.length > 0) {
      let sliderImages = response.data[0].sliderImages.split(',')
      setSelectedRecentSightings(response.data[0].recentSightings)
      if (slides.length == 0) {
        sliderImages.map((item) => {
          slides.push({
            url: imageUrl + '/' + item,
            title: item
          })
        })
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
      <Grid container>
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
                    {selectedRecentSightings.map((item, index) => (
                      <Link
                        key={`recent${index}`}
                        href={{
                          pathname: '/details',
                          query: {
                            serial: item.serial,
                            category: item.category
                          }
                        }}>
                        <ImageListItem
                          className={styles.overlay}
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
                      </Link>

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
