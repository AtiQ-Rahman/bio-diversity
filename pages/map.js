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
import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "./components/Home/Footer/Footer";
import { margin } from "@mui/system";
import Counters from "./components/Home/counters";
import { CityPin } from "./utils/city-pin";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = process.env.mapbox_key;
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
        width: "100vw",
        height: "100vh",
        latitude: 24.090,
        longitude: 91.613,
        zoom: 10,

    })
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(90.399452);
    const [lat, setLat] = useState(23.777176);
    const [zoom, setZoom] = useState(6.52);
    const [popupInfo, setPopUpInfo] = useState(null)
    const _updateViewport = viewport => {
        setViewPort({ viewport });
    };
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/h-tech/cl7skv6tt001e14pn3keltoah',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        CITIES.map((city) => {
            new mapboxgl.Marker(
                <CityPin size={20} onClick={() => setPopUpInfo(city)} />

            )
                .setLngLat(city)
                .addTo(map.current);
        })
        // new mapboxgl.Marker()
        //     .setLngLat([91.613, 24.090])
        //     .addTo(map.current);

    });
    console.log(CITIES)
    const _renderCityMarker = (city, index) => {
        return (
            <Marker
                key={`marker-${index}`}
                longitude={city.lng}
                latitude={city.lat}
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


        <Box
            component="main"
            sx={{
                flexGrow: 1,

            }}
        >
            <Grid
                container
                spacing={3}
                xs={12}
                md={12}

            >
                <Grid
                    item
                    md={12}
                    xl={12}
                    xs={12}
                    style={{ borderRadius: "10px" }}
                // style={{  paddingRight: "20px" }}
                >
                    <div className={styles.sidebar}>
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                    <div className={styles.details_bar}>

                        <Card sx={{ maxWidth: 345, height: 1080 }}>
                            <Image src={imageSrc}></Image>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Species
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    The full name of the genus or species can be inserted, or
                                    you can type the first four letters of the generic name
                                    and/or the first four letters of the species (or other)
                                    epithet in upper or lower case (e.g. Mere micr or mere micr
                                    for Meredithia microphylla). A full list of the species and
                                    subspecific entities in each genus can be obtained in the
                                    genus database.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                            </CardActions>
                        </Card>

                    </div>
                    <div ref={mapContainer} className={styles.map_container}></div>
                    {/* <MapGL
            {...viewPort}
            mapStyle="mapbox://styles/h-tech/cl7skv6tt001e14pn3keltoah"
            onViewportChange={_updateViewport}
            mapboxAccessToken={process.env.mapbox_key}
          > </MapGL> */}
                    {/* {CITIES.map(_renderCityMarker)}

                    {_renderPopup()}

                    <div className="fullscreen" style={fullscreenControlStyle}>
                        <FullscreenControl />
                    </div>
                    <div className="nav" style={navStyle}>
                        <NavigationControl />
                    </div> */}

                </Grid>

            </Grid>

            {/*  */}
        </Box>






    );
};

export default Map;
