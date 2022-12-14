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
import Image from "next/legacy/image";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/router";
mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import { styled } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createMapboxMarker, createMarkerElement, imageLoader, initialLngLatZoom, isValidImage, mapBounds } from "../utils/utils";
import _ from "lodash";
const member1 = require('../assets/images/no-image.png')
let imageProps = {
  height: "300px",
  width: "400px",
};
let imageProps2 = {
  height: "200px",
  width: "300px",

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
  '& ul .slick-active': {
    border: "3px solid #d76d2e !important",
    filter: " drop-shadow(2px 4px 6px grey) !important"
  },
});
const myLoader = ({ src }) => `${src}`;
const Map = () => {
  const router = useRouter()
  const [query, setQuery] = useState(router.query)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(initialLngLatZoom.lng);
  const [lat, setLat] = useState(initialLngLatZoom.lat);
  const [zoom, setZoom] = useState(initialLngLatZoom.zoom);
  const [speciesData, setSpeciesData] = useState({})
  const [elements, setElements] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slider, setSlider] = useState(null)
  const fetchData = async (query, cbfn) => {
    localStorage.setItem('mapQuery', JSON.stringify(query))
    let searchParameters = query
    if (!query?.initial) {
      localStorage.setItem(`allowed${query.category.replaceAll(" ", '')}`, true)
    }
    delete searchParameters?.initial
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
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsForAddition = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      }
    ]
  };
  useEffect(() => {
    let mapQuery
    if (!query) {
      console.log("no query")
      return
    }; // initialize map only once
    mapQuery = query
    if (_.isEmpty(query)) {
      console.log("empty")
      mapQuery = JSON.parse(localStorage.getItem('mapQuery'))
    }
    fetchData(mapQuery, (speciesData) => {
      setLng(speciesData?.lng)
      setLat(speciesData?.lat)
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: process.env.mapStyle,
        center: [lng, lat],
        zoom: zoom
      });
      map.current.fitBounds(mapBounds, {
        linear: true,
        duration: 0
      });
      map.current.setZoom(initialLngLatZoom.zoom)
      map.current.setMinZoom(initialLngLatZoom.zoom)
      map.current.setZoom(initialLngLatZoom.zoom)
      console.log('mapbounds', map.current.getBounds())
      console.log('mapbounds', mapBounds)
      const getBoundsFromViewport = mapBounds;
      map.current.setMaxBounds(getBoundsFromViewport);
      // map.current.setCenter([speciesData?.districts?.[0]?.center?.[0] || lng, speciesData?.districts?.[0]?.center?.[1] || lat])

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      map.current.flyTo({
        center: [speciesData?.districts?.[0]?.center?.[0] || lng, speciesData?.districts?.[0]?.center?.[1] || lat],
        zoom: 8,
        bearing: 0,
        pitch: 10, // Fly to the selected target
        duration: 5000, // Animate over 12 seconds
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
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
            if (district) {
              await createMarkerElement(el,
                styles,
                elements,
                speciesData.markerColor,
                map)
              await createMapboxMarker(el, mapboxgl, speciesData.marker, district, map)
            }
          });
      }
      else {
        speciesData.districts.map(async (district, index) => {
          const el = document.createElement('div');
          if (district?.center[0]) {
            await createMarkerElement(el,
              styles,
              elements,
              speciesData.markerColor,
              map)
            await createMapboxMarker(el, mapboxgl, speciesData.marker, district, map)
          }

        })
      }
      // map.current.on('zoom', () => {
      //   const zoom = map.current.getZoom();
      //   for (const el of elements) {
      //     const scalePercent = 1 + (zoom - 7) * 0.4;
      //     let top = scalePercent * 10
      //     let height = scalePercent * 20
      //     let width = scalePercent * 20
      //     el.style.height = `${height}px`
      //     el.style.width = `${width}px`
      //     el.style.top = `-${top}px`;
      //   }
      // });

    })


  }, [query]);

  return (

    <Grid
      container
      style={{
        width: "100%",
        // height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid
        item
        style={{
          width: "100%",
          height: "100%",
        }}
        md={10}
        xl={10}
        xs={11}
      >
        <div className={styles.sidebar}>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>

        <div ref={mapContainer} className={styles.map_container}></div>
      </Grid>
      <Grid item xs={12} md={2}>
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
                    <Slider ref={slider => setSlider(slider)} {...settings} >
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
                    </Slider>
                  </div>
                ) : isValidImage(speciesData?.profile_image) ? (
                  <Image
                    {...imageProps}
                    objectFit="cover"
                    loader={imageLoader}
                    src={imageUrl + "/" + speciesData.profile_image}
                    alt="No_image"
                  ></Image>
                ) : (<Image
                  height="170px"
                  objectFit="cover"
                  loader={imageLoader}
                  src={member1}
                  alt="No_image"
                ></Image>)
                }
                {speciesData?.additionalFiles?.length > 0 ? (
                  <div>
                    <Slider {...settingsForAddition}>
                      {speciesData.additionalFiles.map((speciesImage, index) => (
                        <Image key={`slideImage2${index}`} alt="No Slider Image" {...imageProps2} loader={imageLoader} src={imageUrl + "/" + speciesImage} onClick={(e) => {
                          slider?.slickGoTo(index)
                          setCurrentIndex(index)
                        }} />
                      ))}
                    </Slider>
                  </div>
                ) : null}
                <br />
                <Divider />
                <CardContent>
                  <Typography gutterBottom variant="h1" component="div" fontFamily='Times New Roman' fontSize={30}>
                    {speciesData?.name?.commonName}
                  </Typography>
                  <br></br>
                  <Typography variant="body2" color="text.secondary" fontFamily='Times New Roman' fontSize={30}>
                    {speciesData?.description}
                  </Typography>
                  <Grid item xs={12} >
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Kindom</b>:{speciesData.kingdom}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12} >
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Phylum</b>:{speciesData.phylum}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>class</b>:{speciesData.class_name}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>order</b>:{speciesData.order_name}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>family</b>:{speciesData.family}
                    </Typography>
                  </Grid>
                  <br></br>
                  
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Genus</b>:{speciesData.genus}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Species</b>:{speciesData.species}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Variety</b>:{speciesData.variety}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Sub Variety</b>:{speciesData.subVariety}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>clone</b>:{speciesData.clone}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>forma</b>:{speciesData.forma}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>English</b>:{speciesData.english}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Bangla</b>:{speciesData.bangla}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Synonym</b>:{speciesData.synonym}
                    </Typography>
                  </Grid>
                  <br></br>
                  <Grid item xs={12}>
                    <Typography gutterBottom component="description" variant="div" fontFamily='Times New Roman' fontSize={20}>
                      <b>Common</b>:{speciesData.common}
                    </Typography>
                  </Grid>
                  <br></br>


                </CardContent>

              </Card>

            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
};
Map.getInitialProps = ({ query }) => {
  return { query };
};
export default Map;
