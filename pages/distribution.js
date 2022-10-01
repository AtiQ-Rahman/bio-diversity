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
import ReactDOM from "react-dom"
import styles from "../styles/Home.module.css";
import Image from "next/image";
import CityPin from "../utils/city-pin";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = process.env.mapbox_key;
import CITIES from "../utils/cities.json";
import MapGL, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
} from "react-map-gl";
import callApi, { imageUrl } from "../utils/callApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const imageSrc = require("../assets/images/species1.jpg");
const map = require("../assets/images/map.png");
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
    const [speciesList, setSpeciesList] = useState([])
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
    const _updateViewport = viewport => {
        setViewPort({ viewport });
    };
    async function fetchData() {
        let response = await callApi('/get-species-list', {})
        setSpeciesList(response.data)
        let speciesList = response.data
        console.log({ speciesList })
        // if (map.current) return; // initialize map only once
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
        const Popup = ({ routeName, routeNumber, city, type }) => (
            <div className="popup">
                <h3 className="route-name">{routeName}</h3>
                <div className="route-metric-row">
                    <h4 className="row-title">Route #</h4>
                    <div className="row-value">{routeNumber}</div>
                </div>
                <div className="route-metric-row">
                    <h4 className="row-title">Route Type</h4>
                    <div className="row-value">{type}</div>
                </div>
                <p className="route-city">Serves {city}</p>
            </div>
        )
        const popupNode = document.createElement("div")

        speciesList.map((city) => {
            if (city.marker && city.lng && city.lat) {
                console.log({ city })
                const el = document.createElement('div');
                const width = 50;
                const height = 50;
                el.className = styles.marker;
                el.style.backgroundImage = `url('${city.marker}')`;
                el.style.width = `50px`;
                el.style.backgroundStyle= 'cover'
                el.style.backgroundRepeat= 'no-repeat'
                el.style.backgroundPosition= 'center top'
                el.style.height = `50px`;
                // el.style.display = `block`;
                el.style.top = `-20px`;
                el.style.backgroundSize = 'contain';
                // <CityPin size={20} onClick={() => setPopUpInfo(city)} />
                new mapboxgl.Marker(el)
                    .setLngLat(city)
                    .setPopup(new mapboxgl.Popup({ offset: 21 }).setHTML(`
                    <div>
                    <div className="popup">
                        <h3 className="route-name">${city.name.bangla}</h3>
                        <div className="route-metric-row">
                            <h4 className="row-title">Route #</h4>
                            <div className="row-value">${city.name.bangla}</div>
                        </div>
                        <div className="route-metric-row">
                            <h4 className="row-title">Route Type</h4>
                            <div className="row-value">${city.name.bangla}</div>
                        </div>
                        <p className="route-city">Serves ${city.name.bangla}</p>
                    </div>
                </div>`


                    ))
                    .addTo(map.current);
            }

        })
        // new mapboxgl.Marker()
        //     .setLngLat([91.613, 24.090])
        //     .addTo(map.current);

    }
    useEffect(() => {
        fetchData()
    }, []);
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
