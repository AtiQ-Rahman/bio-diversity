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
    border: "1px solid #eee", filter: "drop-shadow(2px 2px 10px #eee)",
    transition: "all .2s ease-in-out",
    "&:hover": {
      filter: "drop-shadow(10px 2px 20px gray)",
      cursor: "pointer",
      transform: "scale(1.1)",
      zIndex: 2000
    },
    margin: "0 auto",
    maxWidth: 345
  }
}
const team = () => {
  return (
    <Box>
      <Header index={7} />
      <Grid style={{ margin: "0 auto", marginTop: "5%", width: "80%" }}>
        <Typography component="h2" variant="h2" sx={{
          fontFamily: "Airbnb Cereal App,sans-serif !important",
          fontWeight: "800",
          fontSize: "3rem",
          py: 3
        }}>
          "<span style={{ color: "grey" }}>Under the current project title </span>
          ‘Mapping and Monitoring of Plant Biodiversity Resources of Bangladesh’
          <span style={{ color: "grey" }}>recruited team members from the Department of Botany, University of Dhaka, Bangladesh are as follows</span>
          "
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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
      <Footer />
    </Box>
  );
};

export default team;