import React from 'react';
import styles from "../styles/Home.module.css";

import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    useMediaQuery,
  } from "@mui/material";
import Header from './components/Home/Header';

const images = () => {
    return (
        <div>
        <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
      <Toolbar>
        <Header  />
      </Toolbar>
    </AppBar>
    <div className={styles.main}>
      <h1 className={styles.title}>Images!</h1>

    </div>
    </div>
    );
};

export default images;