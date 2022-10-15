import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader } from "../utils/utils";
import callApi, { imageUrl } from "../utils/callApi";
import AllDetailsPage from "./AllDetailsPage";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let imageProps = {
  height: "300px",
  width: "800px",
};
const StyledSlider = styled((props) => <Slider {...props} />)({
  "& .slick-dots li": {
    width: "100px",
    height: "70px",
    margin: "0px 4px",
  },
  "& .slick-dots": {
    // display: "block",
    position: "relative",
  },
});
// import { Paper, Button } from '@material-ui/core';
// const species8 = require("../assets/images/species8.jpg");
// const species9 = require("../assets/images/species9.jpg");
// const species10 = require("../assets/images/species10.jpg");
const Details = () => {
  const [speciesDetails, setSpeciesData] = useState({});
  const [popupInfo, setPopUpInfo] = useState(null);
  const router = useRouter();
  return (
    <>
      <Box className={styles.bgDetails}>
        <Header index={1} />
        <Box className={styles.bgBox}>
        <AllDetailsPage></AllDetailsPage>
        </Box>
      </Box>
      <Footer style={{}} />
    </>
  );
};

Details.getInitialProps = ({ query }) => {
  return { query };
};
export default Details;
