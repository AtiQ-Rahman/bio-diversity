import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
const imageSrc = require('../../assets/images/species1.jpg')
export default function MediaCard() {
  return (
    <Card >
      <CardMedia
        
        height="140"
        
        alt="green iguana"
      />
      <Image src={imageSrc} width= {500} height={300} ></Image>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
        Chondrus crispus Stackhouse
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}