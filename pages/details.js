
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AllDetailsPage from "./AllDetailsPage";



const Details = () => {

  return (
    <>
      <Box className={styles.bgDetails}>
        <Header index={1} />
        <Box className={styles.bgBox} sx={{ mt: 7 }}>
          <AllDetailsPage></AllDetailsPage>
        </Box>
      </Box>
      <Footer/>
    </>
  );
};

Details.getInitialProps = ({ query }) => {
  return { query };
};
export default Details;
