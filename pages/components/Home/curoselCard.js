import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import styles from "../../../styles/Home.module.css";
import { Paper, Button, Box, Grid } from "@mui/material";
const imageSrc = require("../../assets/images/species1.jpg");

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
      "Lizards are a widespread group of squamate reptiles, with over 6,000species, ranging across all continents except Antarctica",
    imageSrc,
  },
];
export default function MediaCard() {
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
          <Grid item xs={12} md={11}>
            <Image
              component="img"
              sx={{ width: 151 }}
              src={imageSrc}
              alt="Live from space album cover"
            />
          </Grid>
          <Grid item xs={12} md={12}>

          </Grid>
        </Grid>


      </Box>
    );
  }

  return (
    <Box
      width={800}
    >
      <Carousel
        height={500}
        autoPlay={false}
        indicators={false}
        next={(e) => {
          setTitle(items[e].title);
          setDescription(items[e].description);
          /* Do stuff */
        }}
        prev={(e) => {
          setTitle(items[e].title);
          setDescription(items[e].description);
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
      <Box>
        <CardContent sx={{}}>
          <Typography component="div" variant="h3" sx={{ color: '#5e35b1', fontFamily: 'Old Standard TT', fontStyle: 'italic' }} >
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" color="text.secondary" component="div">
            {description}
          </Typography>
          <Button className={styles.bg_primary} sx={{ color: 'white' }}> Go to Details</Button>
        </CardContent>
      </Box>
    </Box>

  );
}
