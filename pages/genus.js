import React from "react";
import styles from "../styles/Home.module.css";

import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import Header from "./components/Home/Header";

const genus = () => {
    return (
        <div>
        <Header />
  
        <div className={styles.main}>
          <h1 className={styles.title}>genus!</h1>
        </div>
      </div>
    );
};

export default genus;