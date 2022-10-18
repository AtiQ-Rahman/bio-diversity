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
import ReactDOM from "react-dom"
import styles from "../styles/Home.module.css";
import Image from "next/image";

import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader, twoDecimal } from "../utils/utils";
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
const Distribution = () => {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(90.399452);
    const [lat, setLat] = useState(23.777176);
    const [zoom, setZoom] = useState(6.52);
    const [popupInfo, setPopUpInfo] = useState(null)
    const [speciesList, setSpeciesList] = useState([])
    const [modifiedList, setModifiedList] = useState([])
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
    async function fetchData(cbfn) {
        let response = await callApi('/get-species-list', {})
        setSpeciesList(response.data)
        setModifiedList(response.data)
        let speciesList = response.data
        console.log({ speciesList })
        speciesList.length > 0 ? cbfn(speciesList) : cbfn([])
    }
    useEffect(() => {
        fetchData((speciesList) => null)
    }, []);
    useEffect(() => {
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
        modifiedList.map((city) => {
            if (city.marker && city.districts[0].center[0] && city.districts[0].center[1]) {
                console.log({ city })
                const el = document.createElement('div');
                const width = 50;
                const height = 50;
                el.className = styles.marker;
                el.style.backgroundImage = `url('${city.marker}')`;
                el.style.width = `50px`;
                el.style.backgroundStyle = 'cover'
                el.style.backgroundRepeat = 'no-repeat'
                el.style.backgroundPosition = 'center top'
                el.style.height = `50px`;
                // el.style.display = `block`;
                el.style.top = `-20px`;
                el.style.backgroundSize = 'contain';
                let marker = new mapboxgl.Marker(el)
                    .setLngLat([city.districts[0].center[0] , city.districts[0].center[1]])
                    .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(`
                        <div >
                        <div style="height: 150px; width:150px; background-image: url('${imageUrl + '/' + city.profile_image}'); background-size : cover ; background-repeat : no-repeat"></div>
                        <div className="popup">
                            <h3 className="route-name">${city.name.bangla}</h3>
                            <div className="route-metric-row">
                                <h4 className="row-title">Kingdom #</h4>
                                <div className="row-value">${city.kingdom}</div>
                            </div>
                            <div className="route-metric-row">
                                <h4 className="row-title">species</h4>
                                <div className="row-value">${city.species}</div>
                            </div>
                            <p className="route-city">Lng/Lat ${city.districts[0].center[0] },${city.districts[0].center[1]}</p>
                        </div>
                    </div>`


                    ))
                    .addTo(map.current);
                map.current.on('zoom', () => {
                    const scalePercent = 1 + (map.current.getZoom() - 8) * 0.4;
                    const svgElement = marker.getElement().children[0];
                    // svgElement.style.transform = `scale(${scalePercent})`;
                    // svgElement.style.transformOrigin = 'bottom';
                });
            }

        })

    }, [modifiedList]);
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
                    <Box className={styles.details_bar}>

                        <Card sx={{ maxWidth: 345, height: 1080 }}>
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
                                                let value = e.target.value.toLocaleLowerCase()
                                                // if(species?.name?.commonName.toLocaleLowerCase().includes(value) 
                                                // || species?.name?.bangla.toLocaleLowerCase().includes(value)
                                                // || species?.name?.english.toLocaleLowerCase().includes(value)
                                                // || species?.name?.synonym.toLocaleLowerCase().includes(value)) {
                                                //     return species
                                                // }
                                                if (species?.english.toLocaleLowerCase().includes(value)) {
                                                    return species
                                                }
                                            })
                                            setModifiedList(modifiedList)
                                            console.log({ modifiedList })

                                        }}
                                        autoComplete="Search By Common Name"
                                        variant="outlined"
                                    />
                                </Grid>
                                {modifiedList.length > 0 ? (
                                    <TableContainer component={Paper} sx={{ maxHeight: 440 }}  >
                                        <Table sx={{ maxWidth: 340 }} aria-label="customized table" >
                                            <TableBody   >
                                                {modifiedList.map((species, index) => (
                                                    <>
                                                        <TableRow
                                                            key={index}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell component="td" scope="row" width={50}>
                                                                <Image height={50} width={40} src={species.marker}></Image>
                                                            </TableCell>
                                                            <TableCell align="">
                                                                <Typography variant="body2" color="text.primary">
                                                                    {species.english}
                                                                </Typography>

                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography variant="caption">
                                                                    {twoDecimal(species.districts[0].center[0])} ,{twoDecimal(species.districts[0].center[1])}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>

                                                    </>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : null}

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

                    </Box>
                    <div ref={mapContainer} className={styles.map_container}></div>

                </Grid>

            </Grid>

            {/*  */}
        </Box>






    );
};
Distribution.getInitialProps = ({ query }) => {
    return { query }
}
export default Distribution;
