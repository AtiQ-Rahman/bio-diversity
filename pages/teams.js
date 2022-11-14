import { Card, CardHeader, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box, padding, textAlign } from '@mui/system';
import React from 'react';
import Footer from '../components/Home/Footer/Footer';
import Header from "../components/Home/Header";
const member1 = require('../assets/images/member1.jpg')
const member2 = require('../assets/images/member2.jpg')
const member3 = require('../assets/images/member3.jpg')
let cardProps = {
  sx: {
    border: "1px solid #eee",
    transition: "all .2s ease-in-out",
    // "&:hover": {
    //   cursor: "pointer",
    //   transform: "scale(1.1)",
    //   zIndex: 2000
    // },
    maxWidth: 345,
    maxHeight: 500,
    minHeight: 500,
  }
}
const team = () => {
  return (
    <Box>
      <Header index={7} />
      <Grid style={{ margin: " auto", marginTop: "5%", width: "90%", height: "800px" }}>

        <Grid container>
          <Grid item xs={12} md={12} sx={{
            background: "#21ad53",
            color: "white",
            p: 2,
          }}>
            <Typography component="h1" variant="h2" sx={{
              fontFamily: "Airbnb Cereal App,sans-serif !important",
              fontWeight: "600",
              py: 3,
              color: "white",
              textAlign: "justify"
              
            }}>
              Under the current project title
              <span style={{ color: "black" }}> ‘Mapping and Monitoring of Plant Biodiversity Resources of Bangladesh’ </span>
              recruited team members from the Department of Botany, University of Dhaka, Bangladesh are as follows

            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{pt:5,m:8}}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={member1.default.src}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom component="h5" variant="h5" sx={{
                    background: "green",
                    borderRadius: "8px",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    width: "fit-content",
                    fontWeight: "bold"
                  }}>Principal Investigator</Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    Dr. Mohammad Azmal Hossain Bhuiyan, Ph.D. (Japan)
                  </Typography>
                  <Typography variant="body2" color="grey">
                    Professor, Department of Botany, University of Dhaka, Dhaka
                    1000.

                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={3} sx={{pt:5,m:8}}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={member3.default.src}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom component="h5" variant="h5" sx={{
                    background: "green",
                    borderRadius: "8px",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    width: "fit-content",
                    fontWeight: "bold"
                  }}>Co-Investigator-1</Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    Dr. MoniruzzamanKhondker, Ph.D. (Austria)
                  </Typography>
                  <Typography variant="body2" color="grey">
                    Supernumerary Professor, Department of Botany, University of
                    Dhaka, Dhaka -1000.

                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} md={3} sx={{pt:5,m:8}}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={member2.default.src}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom component="h5" variant="h5" sx={{
                    background: "green",
                    borderRadius: "8px",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    width: "fit-content",
                    fontWeight: "bold"
                  }}>Co-Investigator-2</Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    Md Saeed Siddik, M. Sc. in Software Engineering
                  </Typography>
                  <Typography variant="body2" color="grey">
                    Assistant
                    Professor, Institute of Information Technology (IIT), University of
                    Dhaka (now on study leave)

                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

      </Grid>
      <Footer  />
    </Box>
  );
};

export default team;