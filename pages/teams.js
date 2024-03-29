import { Card, CardHeader, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box, padding, textAlign } from "@mui/system";
import React from "react";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
const member1 = require("../assets/images/member1.jpg");
const member2 = require("../assets/images/member2.jpg");
const member3 = require("../assets/images/member3.jpg");
let theme = createTheme();
theme = responsiveFontSizes(theme);
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
  },
};
const team = () => {
  return (
    <Box>
      <Header index={7} />
      <Grid sx={{ m: "auto", pt: 20, width: "90%"}}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              background: "White",
              // border:"1px solid ",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              // color: "white",
              p: 2,
            }}
          >
            <ThemeProvider theme={theme}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Airbnb Cereal App,sans-serif !important",
                  fontWeight: "600",
                  py: 3,
                  color: "black",
                  textAlign: "justify",
                }}
              >
                Under the current project title
                <span
                  style={{
                    color: "#c44d34",
                    fontFamily: "Airbnb Cereal App,sans-serif !important",
                  }}
                >
                  {" "}
                  ‘Mapping and Monitoring of Plant Biodiversity Resources of
                  Bangladesh’{" "}
                </span>
                recruited team members from the Department of Botany, University
                of Dhaka, Bangladesh are as follows
              </Typography>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} md={4} sx={{ pt: 3 }}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  objectFit="cover"
                  image={member1.default.src}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="h5"
                    variant="h5"
                    sx={{
                      background: "green",
                      borderRadius: "8px",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      width: "fit-content",
                      fontWeight: "bold",
                    }}
                  >
                    Principal Investigator
                  </Typography>
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

          <Grid item xs={12} md={4} sx={{ pt: 3 }}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  image={member3.default.src}
                  objectFit="cover"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="h5"
                    variant="h5"
                    sx={{
                      background: "green",
                      borderRadius: "8px",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      width: "fit-content",
                      fontWeight: "bold",
                    }}
                  >
                    Co-Investigator-1
                  </Typography>
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

          <Grid item xs={12} md={4} sx={{ pt: 3 }}>
            <Card {...cardProps}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="320"
                  objectFit="cover"
                  image={member2.default.src}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    component="h5"
                    variant="h5"
                    sx={{
                      background: "green",
                      borderRadius: "8px",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      width: "fit-content",
                      fontWeight: "bold",
                    }}
                  >
                    Co-Investigator-2
                  </Typography>
                  <Typography gutterBottom variant="h3" component="div">
                    Md Saeed Siddik, M. Sc. in Software Engineering
                  </Typography>
                  <Typography variant="body2" color="grey">
                    Assistant Professor, Institute of Information Technology
                    (IIT), University of Dhaka (now on study leave)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
     
  <Grid item xs={12} md={12} sx={{pt:10}}>
  <Footer />
  </Grid>
  
  
  

      {/* <Box sx={{pt:10}}>
        
      </Box> */}

      {/* <Footer  /> */}
      {/*  */}
    </Box>
  );
};

export default team;
