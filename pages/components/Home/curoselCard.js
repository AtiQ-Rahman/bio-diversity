import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Box , Grid } from "@mui/material";
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
      
            <Card style={{ display: "flex", justifyContent: "center" ,border: "1px  solid #d9d7d7" , borderRadius:"20px"}}>
              <CardContent style={{marginTop:"10%"}}>
                <Typography gutterBottom variant="h3" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
              <Card  style={{boxShadow: "-10px 0px #a97cc5"}}>
              <Image src={props.item.imageSrc} ></Image>
              </Card>
            </Card>

    );
  }

  return (
    <Card>
      <Carousel
        autoPlay={false}
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
    </Card>
  );
}
