import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";
import Header from "./components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
const imageSrc = require("../pages/assets/images/species1.jpg");
const map = require("../pages/assets/images/map.png");
const Map = () => {
  return (
    <div className={styles.body}>
      <Header />

      <div className={styles.main}>
        <Box
          component="section"
          style={{
            border: "1px solid #e7e7e7",
            borderRadius: 20,
            padding: 30,
            width: "70%",
          }}
        >
          <Grid container item xs={12} sx={{ mx: "auto" }}>
            <Grid item xs={8}>
              <Image src={map} width={650} height={400}></Image>

              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
            <Grid     item
              xs={3}
              md={3}
              // lg={12}
              style={{ paddingLeft: "20px" }}
              >
              <Typography gutterBottom variant="h2" component="div">
                <Image src={imageSrc} width={300} height={200}></Image>
              </Typography>
              <Typography >
                <p>
                  
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula. Duis mollis, est non commodo luctus, nisi
                  erat porttitor ligula. Duis mollis, est non commodo luctus,
                  nisi erat porttitor ligula. Duis mollis, est non commodo
                  luctus, nisi erat porttitor ligula. Duis mollis, est non
                  commodo luctus, nisi erat porttitor ligula. Duis mollis, est
                  non commodo luctus, nisi erat porttitor ligul a. Duis mollis,
                  est non c ommodo luctus, nisi era t porttitor ligula. Duis
                  mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
              </Typography>

              {/* <h1 className={styles.title}>Getting started BIO-DIVERSITY!</h1> */}
            </Grid>
          </Grid>
        </Box>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>H-Tech</span>
        </a>
      </footer>
    </div>
  );
};

export default Map;
