import {
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
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createMapboxMarkerForDistribution,
  createMarkerElement,
  imageLoader,
  twoDecimal,
} from "../utils/utils";
const imageSrc = require("../assets/images/species1.jpg");
const map = require("../assets/images/map.png");
const fullscreenControlStyle = {
  position: "relative",
  top: 0,
  left: 0,
  padding: "10px",
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px",
};
const Distribution = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(90.399452);
  const [lat, setLat] = useState(23.777176);
  const [zoom, setZoom] = useState(6.52);
  const [elements, setElements] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [modifiedList, setModifiedList] = useState([]);
  async function fetchData(cbfn) {
    let response = await callApi("/get-species-list", {});
    setSpeciesList(response.data);
    let list = [];
    Promise.all(
      response.data.map(async (item) => {
        if (typeof item.districts == "string") {
          let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.districts}.json?access_token=${process.env.mapbox_key}&bbox=88.007207%2C20.4817039%2C92.679485%2C26.638142`;
          let response = await fetch(url); //api for the get request
          let data = await response.json();
          item.districts = data.features;
          list.push(item);
          return item;
        } else {
          list.push(item);
          return item;
        }
      })
    ).then(() => {
      console.log({ list });
      setModifiedList(list);
    });
    let speciesList = response.data;
    console.log({ speciesList });
    speciesList.length > 0 ? cbfn(speciesList) : cbfn([]);
  }
  useEffect(() => {
    fetchData((speciesList) => null);
  }, []);
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.mapStyle,
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    modifiedList.map(async (speciesData, index) => {
      if (
        speciesData.districts[0]?.center[0] &&
        speciesData.districts[0]?.center[1]
      ) {
        console.log({ index });
        const el = document.createElement("div");
        await createMarkerElement(
          el,
          styles,
          elements,
          speciesData.marker,
          map
        );
        await createMapboxMarkerForDistribution(
          el,
          mapboxgl,
          imageUrl,
          speciesData,
          map
        );
      }
    });
    map.current.on("zoom", () => {
      const zoom = map.current.getZoom();
      for (const el of elements) {
        const scalePercent = 1 + (zoom - 8) * 0.4;
        // const el = marker.getElement()
        let top = scalePercent * 40;
        let height = scalePercent * 70;
        let width = scalePercent * 70;
        el.style.height = `${height}px`;
        el.style.width = `${width}px`;
        el.style.top = `-${top}px`;
      }
    });
  }, [modifiedList]);
  return (
    <Grid
      container
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
        }}
        md={12}
        xl={12}
        xs={12}
      >
        <div className={styles.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <Box className={styles.details_bar}>
          <Card sx={{ maxWidth: 345, height: "100%" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Species {modifiedList.length}
              </Typography>

              <Grid item xs={12}>
                <TextField
                  id="Species"
                  name="name"
                  margin="normal"
                  size="small"
                  label="Search By English Name"
                  fullWidth
                  onChange={(e) => {
                    let modifiedList = speciesList.filter((species) => {
                      let value = e.target.value.toLocaleLowerCase();
                      // if(species?.name?.commonName.toLocaleLowerCase().includes(value)
                      // || species?.name?.bangla.toLocaleLowerCase().includes(value)
                      // || species?.name?.english.toLocaleLowerCase().includes(value)
                      // || species?.name?.synonym.toLocaleLowerCase().includes(value)) {
                      //     return species
                      // }
                      if (
                        species?.english.toLocaleLowerCase().includes(value)
                      ) {
                        return species;
                      }
                    });
                    setModifiedList(modifiedList);
                    console.log({ modifiedList });
                  }}
                  autoComplete="Search By Common Name"
                  variant="outlined"
                />
              </Grid>
              {modifiedList.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                  <Table sx={{ maxWidth: 340 }} aria-label="customized table">
                    <TableBody>
                      {modifiedList.map((species, index) => (
                        <>
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="td" scope="row" width={50}>
                              {species.marker !== "N/A" && species.marker !== 'null' ? (
                                <Image
                                  height={50}
                                  alt="Marker Icon"
                                  width={40}
                                  src={species.marker}
                                ></Image>
                              ) : null}
                            </TableCell>
                            <TableCell align="">
                              <Typography variant="body2" color="text.primary">
                                {species.english}
                              </Typography>
                            </TableCell>
                            {/* <TableCell>
                              <Typography variant="caption">
                                {twoDecimal(species?.districts?.[0]?.center[0])}{" "}
                                ,
                                {twoDecimal(species?.districts?.[0]?.center[1])}
                              </Typography>
                            </TableCell> */}
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : null}

              <Typography variant="body2" color="text.secondary">
                The full name of the genus or species can be inserted, or you
                can type the first four letters of the generic name and/or the
                first four letters of the species (or other) epithet in upper or
                lower case (e.g. Mere micr or mere micr for Meredithia
                microphylla). A full list of the species and subspecific
                entities in each genus can be obtained in the genus database.
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <div ref={mapContainer} className={styles.map_container}></div>
      </Grid>
    </Grid>
  );
};
Distribution.getInitialProps = ({ query }) => {
  return { query };
};
export default Distribution;
