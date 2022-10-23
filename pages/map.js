import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import { styled } from "@mui/material/styles";
console.log(process.env.mapbox_key);
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createMapboxMarker, createMarkerElement } from "../utils/utils";
let imageProps = {
  height: "300px",
  width: "400px",
};
const StyledSlider = styled((props) => <Slider {...props} />)({
  "& .slick-dots li": {
    width: "100px",
    height: "70px",
    margin: "0px 4px",
  },
  "& .slick-dots": {
    display: "block",
    position: "relative",
  },
});
const myLoader = ({ src }) => `${src}`;
const Map = () => {
  const router = useRouter()
  const [query, setQuery] = useState(router.query)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(90.399452);
  const [lat, setLat] = useState(23.777176);
  const [zoom, setZoom] = useState(6.52);
  const [speciesData, setSpeciesData] = useState({})
  const [elements, setElements] = useState([])
  const fetchData = async (query, cbfn) => {
    let searchParameters = query
    if (!query.initial) {
      localStorage.setItem(`allowed${query.category}`, true)
    }
    delete searchParameters.initial
    let response = await callApi("/get-species-by-serial", { searchParameters })
    if (response?.data?.length > 0) {
      setSpeciesData(response.data[0])
      cbfn(response.data[0])
    }
    else {
      cbfn({})
    }
  }
  const settings = {
    customPaging: function (i) {
      return (
        <Box height={400}>
          <Image layout="fill" objectFit="cover"
            alt="Additional Image"
            loader={myLoader} src={`${imageUrl + '/' + speciesData?.additionalFiles[i]}`} />
        </Box>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    if (!query) return; // initialize map only once
    fetchData(query, (speciesData) => {
      setLng(speciesData?.lng)
      setLat(speciesData?.lat)
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: process.env.mapStyle,
        center: [lng, lat],
        zoom: zoom
      });
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
      if (typeof speciesData.districts == 'string') {
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${speciesData.districts}.json?access_token=${process.env.mapbox_key}&bbox=88.007207%2C20.4817039%2C92.679485%2C26.638142`
        fetch(url)           //api for the get request
          .then(response => response.json())
          .then(async data => {
            console.log(data)
            let district = data.features[0]
            const el = document.createElement('div');
            await createMarkerElement(el, styles, elements, speciesData.marker, map)
            await createMapboxMarker(el, mapboxgl, speciesData.marker, district, map)
            // const width = "auto";
            // map.current.on('zoom', () => {
            //     const zoom = map.current.getZoom();
            //     const scalePercent = 1 + (zoom - 8) * 0.4;
            //     let height = scalePercent * 70
            //     let width = scalePercent * 70
            //     const el = marker.getElement().children[0]
            //     el.style.height = `${height}px`
            //     el.style.width = `${width}px`
            // });
          });
      }
      else {
        speciesData.districts.map(async (district, index) => {
          const el = document.createElement('div');
          await createMarkerElement(el, styles, elements, speciesData.marker, map)
          await createMapboxMarker(el, mapboxgl, speciesData.marker, district, map)
        })
      }
      map.current.on('zoom', () => {
        const zoom = map.current.getZoom();
        for (const el of elements) {
          const scalePercent = 1 + (zoom - 8) * 0.4;
          // const el = marker.getElement()
          let top = scalePercent * 40
          let height = scalePercent * 70
          let width = scalePercent * 70
          el.style.height = `${height}px`
          el.style.width = `${width}px`
          el.style.top = `-${top}px`;
        }
      });

    })


  }, [query, lng, lat, zoom, elements]);

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
      // style={{ borderRadius: "10px" }}
      // style={{  paddingRight: "20px" }}
      >
        <div className={styles.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div className={styles.details_bar}>
          <Card sx={{ maxWidth: 345, height: "100%" }}>
            {speciesData?.additionalFiles?.length > 0 ? (
              <div>
                <StyledSlider {...settings}>
                  {speciesData.additionalFiles.map((speciesImage, index) => {
                    return (
                      <Image
                        key={`speciesAdditional${index}`}
                        {...imageProps}
                        loader={myLoader}
                        alt="Additional Image"
                        src={imageUrl + "/" + speciesImage}
                      />
                    );
                  })}
                </StyledSlider>
              </div>
            ) : (
              <Image
                loader={myLoader}
                src={imageUrl + "/" + speciesData?.profile_image}
                alt="species-image"
                width="345"
                height={200}
              ></Image>
            )}
            <br />
            <Divider />
            <CardContent>
              <Typography gutterBottom variant="h1" component="div">
                {speciesData?.name?.commonName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {speciesData?.description}
              </Typography>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Kindom</b>:{speciesData.kindom}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Phylum</b>:{speciesData.phylum}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>class</b>:{speciesData.class}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>order</b>:{speciesData.order}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>family</b>:{speciesData.family}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Genus</b>:{speciesData.genus}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Specis</b>:{speciesData.specis}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Variety</b>:{speciesData.variety}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>Sub Variety</b>:{speciesData.subVariety}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>clone</b>:{speciesData.clone}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom component="description" variant="div">
                  <b>forma</b>:{speciesData.forma}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
        <div
          ref={mapContainer}
          // style={{position: "absolute",top: 0, bottom: 0, width: "100%"}}
          className={styles.map_container}
        ></div>
      </Grid>
    </Grid>
  );
};
Map.getInitialProps = ({ query }) => {
  return { query };
};
export default Map;
