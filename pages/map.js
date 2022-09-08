import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Header from "./components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "./components/Home/Footer/Footer";
import { margin } from "@mui/system";
import Counters from "./components/Home/counters";
import { CityPin } from "./utils/city-pin";

import CITIES from "./utils/cities.json";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";


const imageSrc = require("../pages/assets/images/species1.jpg");
const map = require("../pages/assets/images/map.png");
const fullscreenControlStyle = {
  position: "relative",
  top: 0,
  left: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};
const Map = () => {
  const [viewPort, setViewPort] = useState({
    width:"100%",
    height:"100%",
    latitude: 24.090,
    longitude: 91.613,
    zoom: 6.52,
    bearing: 0,
    pitch: 0
  })
  const [popupInfo, setPopUpInfo] = useState(null)
  const _updateViewport = viewport => {
    setViewPort({ viewport });
  };
  console.log(CITIES)
  const _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
      >
        <CityPin size={20} onClick={() => setPopUpInfo(city)} />
      </Marker>
    );
  };

  const _renderPopup = () => {

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => setPopUpInfo(null)}
        >
          {/* <CityInfo info={popupInfo} /> */}
        </Popup>
      )
    );
  }
  return (
    <MapGL
      {...viewPort}
      width="100vw"
      height="100vh"
      mapStyle="mapbox://styles/h-tech/cl7skv6tt001e14pn3keltoah"
      onViewportChange={_updateViewport}
      mapboxAccessToken ={process.env.mapbox_key}
    >
      {/* {CITIES.map(_renderCityMarker)} */}

      {/* {_renderPopup()} */}

      {/* <div className="fullscreen" style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div className="nav" style={navStyle}>
        <NavigationControl />
      </div> */}
    </MapGL>
    // <div className={styles.body}>
    //   <div className={styles.main}>
    //     <Box
    //       className={styles.main_box}
    //       component="main"
    //       sx={{
    //         flexGrow: 1,
    //         py: 8,
    //         mt: 10,
    //       }}
    //     >
    //       <Grid
    //         container
    //         spacing={3}
    //         xs={12}
    //         md={12}
    //         sx={{ m: 4 }}
    //         style={{ marginRight: "5px" }}
    //       >
    //         <Grid
    //           item
    //           md={10}
    //           xl={8}
    //           xs={12}
    //           style={{ borderRadius: "10px" }}
    //         // style={{  paddingRight: "20px" }}
    //         >

    //         </Grid>
    //         <Grid
    //           sx={{ boxShadow: "1px solid blac" }}
    //           style={{ borderRadius: "10px" }}
    //           item
    //           lg={4}
    //           md={2}
    //           xl={4}
    //           xs={12}
    //         >
    //           <Card sx={{ maxWidth: 345 }}>
    //             <Image src={imageSrc}></Image>
    //             <CardContent>
    //               <Typography gutterBottom variant="h5" component="div">
    //                 Species
    //               </Typography>
    //               <Typography variant="body2" color="text.secondary">
    //                 The full name of the genus or species can be inserted, or
    //                 you can type the first four letters of the generic name
    //                 and/or the first four letters of the species (or other)
    //                 epithet in upper or lower case (e.g. Mere micr or mere micr
    //                 for Meredithia microphylla). A full list of the species and
    //                 subspecific entities in each genus can be obtained in the
    //                 genus database.
    //               </Typography>
    //             </CardContent>
    //             <CardActions>
    //               <Button size="small">Share</Button>
    //               <Button size="small">Learn More</Button>
    //             </CardActions>
    //           </Card>
    //         </Grid>
    //       </Grid>

    //       {/*  */}
    //     </Box>
    //   </div>

    //   <Footer />
    // </div>
  );
};

export default Map;
