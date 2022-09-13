import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import styles from "../../styles/Home.module.css";
import { Paper, Button, Box, Grid } from "@mui/material";
import Slider from "react-slick";
import { fontSize } from "@mui/system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageSlider from "./imageSlider";
const imageSrc = require("../../assets/images/species4.jpg");
const imageSrc2 = require("../../assets/images/species5.jpg");
const imageSrc3 = require("../../assets/images/species6.jpg");
const species7 = require("../../assets/images/species7.jpg");
const species8 = require("../../assets/images/species8.jpg");
const species9 = require("../../assets/images/species9.jpg");
const species10 = require("../../assets/images/species10.jpg");
const species12 = require("../../assets/images/species12.jpg");
const species3 = require("../../assets/images/species3.jpg");
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  height: 600,

  cssEase: "linear"
};
var items = [
  {
    title: "Chondrus crispus Stackhouse",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica",
    imageSrc: imageSrc,
  },
  {
    title: "aaaa crispus Stackhouse",
    description:
      "Lectotype locality: Weissenfels, Germany; (Silva & al. 1996: 46) Notes: This type locality was first cited by Drouet (1968: 17, 20) (Silva et al., 1996)",
    imageSrc: imageSrc2,
  },
  {
    title: "Spirulina major Kützing ex Gomont",
    description:
      "Lectotype locality: Weissenfels, Germany; (Silva & al. 1996: 46) Notes: This type locality was first cited by Drouet (1968: 17, 20) (Silva et al., 1996)",
    imageSrc: imageSrc3,
  },
];
export default function MediaCard({ slides }) {
  const [title, setTitle] = React.useState(items[0].title);
  const [description, setDescription] = React.useState(items[0].description);
  function Item(props) {
    return (
      <Box
        style={{
          justifyContent: "center",

          // border: "1px  solid #d9d7d7",
          // boxShadow:"1px 1px 1px 1px",
          // borderRadius: "20px",
        }}>
        <Grid container xs={12} md={12}>
          <Image
            layout="fill"
            src={props.item.imageSrc}
            alt="Live from space album cover"
          />

        </Grid>
      </Box>
    );
  }

  return (
    <Box
      height={500}
    >
      <ImageSlider slides={slides}></ImageSlider>
    </Box>

  );
}
