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
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Footer from "../components/Home/Footer/Footer";
import { margin } from "@mui/system";
import Counters from "../components/Home/counters";
import { CityPin } from "../utils/city-pin";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/router'
mapboxgl.accessToken = process.env.mapbox_key;
import CITIES from "../utils/cities.json";
import MapGL, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl
} from "react-map-gl";


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
    const router = useRouter()
    console.log(router.query)
    const [query, setQuery] = useState(router.query)
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(10);
    const [lng, setLng] = useState(query.lng)
    const [lat, setLat] = useState(query.lat)
    const [popupInfo, setPopUpInfo] = useState(null)
    const _updateViewport = viewport => {
        setViewPort({ viewport });
    };
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/h-tech/cl7skv6tt001e14pn3keltoah',
            center: [query.lng, query.lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        new mapboxgl.Marker()
            .setLngLat([query.lng, query.lat])
            .addTo(map.current);

    });
    console.log(CITIES)

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
                            <Image src={imageSrc} alt="species-image" width="345" height={200}></Image>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {query?.Species}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {query?.description}
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
Map.getInitialProps = ({ query }) => {
    return { query }
}
export default Map;
