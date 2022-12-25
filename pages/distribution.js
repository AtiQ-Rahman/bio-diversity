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
  Menu,
  MenuItem,
  Autocomplete,
  TablePagination,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Home.module.css";
import Image from "next/legacy/image";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { Icon } from '@iconify/react';
mapboxgl.accessToken = process.env.mapbox_key;
import callApi, { imageUrl } from "../utils/callApi";
import Slider from "react-slick";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import { SketchPicker } from 'react-color';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  createMapboxMarkerForDistribution,
  createMarkerElement,
  imageLoader,
  mapBounds,
  twoDecimal,
} from "../utils/utils";
import Loader2 from "../components/Loader2";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Distribution = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [force, setForce] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setChangeColorIndex(index)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [dialogopen, setDialogOpen] = React.useState(false);

  //dialog for change color
  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Dialog for removing all species 
  const [openRemoveDialog, setOpenRemoveDialog] = React.useState(false);

  const handleClickOpenRemoveDialog = () => {
    setOpenRemoveDialog(true);
  };

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };

  // Dialog for adding all species 
  const [openAvailableDialog, setOpenAvailableDialog] = React.useState(false);

  const handleClickOpenAvailableDialog = () => {
    setOpenAvailableDialog(true);
  };

  const handleCloseAvailableDialog = () => {
    setOpenAvailableDialog(false);
  };
  const [color, setColor] = useState(null);

  const changeColor = () => {

    modifiedList[changeColorIndex].markerColor = color
    setForce(!force)
    handleCloseDialog()
  }
  const initialLngLatZoom = {
    lng: 90.5011,
    lat: 23.8913,
    zoom: 6.80
  }
  const [lngLatZoomObject, setLngLatZoomObject] = useState(initialLngLatZoom)
  const [lng, setLng] = useState(initialLngLatZoom.lng);
  const [lat, setLat] = useState(initialLngLatZoom.lat);
  const [zoom, setZoom] = useState(initialLngLatZoom.zoom);
  const [changeColorIndex, setChangeColorIndex] = useState(null);
  const [elements, setElements] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [categoryList, setCatgoryList] = useState([{ name: "All", serial: 0 }]);
  const [category, setCategory] = useState("All");
  const [filterName, setFilterName] = useState(null);
  const [modifiedList, setModifiedList] = useState([]);
  const [availableList, setAvailableList] = useState([]);
  const [modifiedAvailableList, setModifiedAvailableList] = useState([]);
  const [showUndo, setShowUndo] = useState(null);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [timeOutId, setTimeOutId] = useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    console.log({event})
    console.log({newPage})
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  async function fetchData(cbfn) {
    let response = await callApi("/get-species-list", {});

    // let response = await callApi("/get-species-by-pagination", {
    //   limit : rowsPerPage,
    //   pageFrom : 0
    // });
    setSpeciesList(response.data);
    setModifiedList(response.data);
    let categoryResponse = await callApi("/get-categories-list", {});

    setCatgoryList([...categoryList, ...categoryResponse.data]);
    setLoading(false)

    // let list = [];
    // Promise.all(
    //   response.data.map(async (item) => {
    //     if (typeof item.districts == "string") {
    //       let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${item.districts}.json?access_token=${process.env.mapbox_key}&bbox=88.007207%2C20.4817039%2C92.679485%2C26.638142`;
    //       let response = await fetch(url); //api for the get request
    //       let data = await response.json();
    //       item.districts = data.features;
    //       list.push(item);
    //       return item;
    //     } else {
    //       list.push(item);
    //       return item;
    //     }
    //   })
    // ).then(() => {
    //   console.log({ list });
    //   setModifiedList(list);
    // });
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
      center: [lngLatZoomObject.lng, lngLatZoomObject.lat],
      // maxBounds: mapBounds,
      zoom: initialLngLatZoom.zoom,
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
    // map.current.on("move", () => {
    //   lngLatZoomObject.lng = map.current.getCenter().lng.toFixed(4)
    //   lngLatZoomObject.lat = map.current.getCenter().lat.toFixed(4)
    //   lngLatZoomObject.map = map.current.getZoom().toFixed(2)
    //   setLngLatZoomObject(lngLatZoomObject);
    //   // setLng(map.current.getCenter().lng.toFixed(4));
    //   // setLat(map.current.getCenter().lat.toFixed(4));
    //   // setZoom(map.current.getZoom().toFixed(2));
    // });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    modifiedList.map(async (speciesData, index) => {
      if (
        speciesData?.districts?.[0]?.center?.[0] &&
        speciesData?.districts?.[0]?.center?.[1]
      ) {
        for (let district of speciesData.districts) {
          const el = document.createElement("div");
          await createMarkerElement(
            el,
            styles,
            elements,
            speciesData.markerColor,
            map
          );
          await createMapboxMarkerForDistribution(
            el,
            mapboxgl,
            imageUrl,
            speciesData,
            map,
            district
          );
        }
      }
    });
    // map.current.on("zoom", () => {
    //   const zoom = map.current.getZoom();
    //   for (const el of elements) {
    //     const scalePercent = 1 + (zoom - 7) * 0.4;
    //     let top = scalePercent * 10
    //     let height = scalePercent * 20
    //     let width = scalePercent * 20
    //     el.style.height = `${height}px`;
    //     el.style.width = `${width}px`;
    //     el.style.top = `-${top}px`;
    //   }
    // });
  }, [modifiedList, force]);
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
        xs={10}
      >
        {/* <div className={styles.sidebar}>
          Longitude: {lngLatZoomObject.lng} | Latitude: {lngLatZoomObject.lat} | Zoom: {lngLatZoomObject.zoom}
        </div> */}

        <div ref={mapContainer} className={styles.map_container}></div>
      </Grid>
      <Grid item xs={2}>
        <Box className={styles.details_bar}>
          <Card sx={{ height: "100%", overflowY: "scroll" }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    id="species"
                    value={category ?? ''}
                    options={categoryList}
                    key="categorySpecies"
                    getOptionLabel={(option) =>
                      option.name || option
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.serial === value.serial
                    }
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                      console.log({ value })
                      setCategory(value?.name || value);
                      if (!value || value?.name == 'All' || value == 'All') {
                        setModifiedList(speciesList)
                        setForce(!force)
                      }
                      else {
                        let list = speciesList.filter((item) => {
                          if (filterName && filterName != "") {
                            if (item.category == (value?.name || value) && item?.english.toLocaleLowerCase().includes(filterName)) {
                              return item
                            }
                          }
                          else {
                            if (item.category == (value?.name || value)) {
                              return item
                            }
                          }

                        })
                        setModifiedList(list)
                        setForce(!force)
                      }

                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ padding: "2px" }}
                        label="Filter By Group"
                        variant="outlined"
                        placeholder="Select"
                        value={category ?? ''}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="Species"
                    name="name"
                    margin="normal"
                    size="small"
                    label="Search By English Name"
                    fullWidth
                    value={filterName ?? ""}
                    onChange={(e) => {
                      setFilterName(e.target.value.toLocaleLowerCase())
                      let modifiedList = speciesList.filter((species) => {
                        let value = e.target.value.toLocaleLowerCase();
                        // if(species?.name?.commonName.toLocaleLowerCase().includes(value)
                        // || species?.name?.bangla.toLocaleLowerCase().includes(value)
                        // || species?.name?.english.toLocaleLowerCase().includes(value)
                        // || species?.name?.synonym.toLocaleLowerCase().includes(value)) {
                        //     return species
                        // }
                        if (category && category !== 'All') {
                          if (species?.english.toLocaleLowerCase().includes(value) && species.category == category) {
                            return species;
                          }
                        }
                        else {
                          if (species?.english.toLocaleLowerCase().includes(value)) {
                            return species;
                          }
                        }
                      });
                      setModifiedList(modifiedList);
                      console.log({ modifiedList });
                    }}
                    autoComplete="Search By Common Name"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography gutterBottom variant="h5" component="div">
                    Total: {modifiedList.length}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="outlined" size="small" startIcon={<Icon icon="material-symbols:add-circle-rounded" />}
                    onClick={handleClickOpenAvailableDialog}
                  >
                    Add to list
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button variant="outlined" size="small" startIcon={<Icon icon="ic:round-delete" />}
                    onClick={handleClickOpenRemoveDialog}
                  >
                    Remove All
                  </Button>
                </Grid>


                {modifiedList.length > 0 ? (
                  <Box>
                    <TableContainer component={Paper} sx={{
                      height: 700, my: 2, border: "1px solid #dfdfdf",
                      padding: "10px"
                    }}>
                      <Table aria-label="customized table">
                        <TableBody>
                          {modifiedList?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ).map((species, index) => (
                            <>
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}
                              >
                                <TableCell component="td" scope="row" width={50}>
                                  {/* {species.marker !== "N/A" && species.marker !== 'null' ? (
                                <Image
                                  height={50}
                                  alt="Marker Icon"
                                  width={40}
                                  src={species.marker}
                                ></Image>
                              ) : null} */}
                                  {species.markerColor ? (
                                    <Box>
                                      <Box className={styles.marker}
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(e) => {
                                          setColor(species.markerColor)
                                          handleClick(e, index)
                                        }}
                                        style={{
                                          backgroundColor: species.markerColor,
                                          borderRadius: "100px",
                                          height: 30,
                                          width: 30,
                                          border: "5px solid #e7e7e7"
                                        }}></Box>

                                    </Box>

                                  ) : null}
                                </TableCell>
                                <TableCell align="center">
                                  <Typography variant="body2" color="text.primary">
                                    <b>{species.english}</b>
                                  </Typography>
                                </TableCell>
                                <TableCell align="center">
                                  {showUndo && updateIndex == index ? (
                                    <Button icon="ic:baseline-remove" width="24" height="24" onClick={async (e) => {
                                      setShowUndo(false)
                                      clearTimeout(timeOutId)
                                    }} >Undo</Button>
                                  ) : (
                                    <Icon icon="ic:baseline-remove" width="24" height="24" style={{
                                      cursor: "pointer",
                                      border: "1px solid grey",
                                      borderRadius: "30px"

                                    }} onClick={(e) => {
                                      setUpdateIndex(index)
                                      setShowUndo(true)
                                      let timeOutId = setTimeout(() => {
                                        setShowUndo(null)
                                        setTimeOutId(null)
                                        setUpdateIndex(null)
                                        availableList.push(species)
                                        modifiedList.splice(index, 1)
                                        setModifiedAvailableList(availableList)
                                        setForce(!force)
                                      }, 3000)
                                      setTimeOutId(timeOutId)
                                    }} />
                                  )}

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
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={(e) => {
                            handleClickOpenDialog()
                            handleClose()
                          }}>Change Color</MenuItem>
                        </Menu>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[100, 50]}
                      component="div"
                      count={modifiedList?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Box>

                ) : null}

                <Typography variant="body2" color="text.secondary">
                  The full name of the genus or species can be inserted, or you
                  can type the first four letters of the generic name and/or the
                  first four letters of the species (or other) epithet in upper or
                  lower case (e.g. Mere micr or mere micr for Meredithia
                  microphylla). A full list of the species and subspecific
                  entities in each genus can be obtained in the genus database.
                </Typography>
              </Grid>

            </CardContent>
          </Card>

        </Box>
      </Grid>
      {loading ? (
        <div style={{
          position: "absolute",
          height: "100vh",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          top: "50%",
          left: '20%'
        }}>
          <Loader2 style={{
            backgroundColor: "white",
            height: "fit-content",
            padding: "20px",
            borderRadius: 2
          }}></Loader2>
        </div>) :
        null}

      {/******** Dialog component change color ********/}
      <Dialog
        open={dialogopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >

        <SketchPicker
          color={color ?? "#fffff"}
          onChangeComplete={e => {
            setColor(e.hex);
          }
          }>

        </SketchPicker >

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button style={{
            backgroundColor: "green",
            color: "white"
          }} onClick={changeColor}>Change</Button>
        </DialogActions>
      </Dialog>

      {/*********Dialog component Remove Species ********/}

      <Dialog
        open={openRemoveDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseRemoveDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseRemoveDialog}>No</Button>
          <Button onClick={(e) => {
            setModifiedList([])
            setAvailableList(speciesList)
            setModifiedAvailableList(speciesList)
            setForce(!force)
            handleCloseRemoveDialog()
          }}>Yes</Button>
        </DialogActions>
      </Dialog>


      <Dialog
        open={openAvailableDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAvailableDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography variant="h3" component="h3">
            Available For Add: {availableList.length}
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Grid container>
            <Grid item xs={12} md={12}>
              <TextField
                id="Species"
                name="name"
                margin="normal"
                size="small"
                label="Search"
                fullWidth
                onChange={(e) => {
                  let modifiedList = availableList.filter((species) => {
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
                  setModifiedAvailableList(modifiedList);
                  console.log({ modifiedList });
                }}
                autoComplete="Search By Common Name"
                variant="outlined"
              />
            </Grid>
            {modifiedAvailableList.length > 0 ? (
              <TableContainer component={Paper} sx={{
                my: 2, border: "1px solid #dfdfdf",
                padding: "10px"
              }}>
                <Table aria-label="customized table">
                  <TableBody>
                    {modifiedAvailableList.map((species, index) => (
                      <>
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="td" scope="row" width={50}>
                            {/* {species.marker !== "N/A" && species.marker !== 'null' ? (
                                <Image
                                  height={50}
                                  alt="Marker Icon"
                                  width={40}
                                  src={species.marker}
                                ></Image>
                              ) : null} */}
                            {species.markerColor ? (
                              <Box>
                                <Box className={styles.marker}
                                  aria-controls={open ? 'basic-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  style={{
                                    backgroundColor: species.markerColor,
                                    borderRadius: "100px",
                                    height: 30,
                                    width: 30,
                                    border: "5px solid #e7e7e7"
                                  }}></Box>

                              </Box>

                            ) : null}
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" color="text.primary">
                              <b>{species.english}</b>
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {showUndo && updateIndex == index ? (
                              <Button icon="ic:baseline-remove" width="24" height="24" onClick={async (e) => {
                                setShowUndo(false)
                                clearTimeout(timeOutId)
                              }} >Undo</Button>
                            ) : (<Icon icon="material-symbols:add-circle-rounded" width="24" height="24" style={{
                              cursor: "pointer",
                              border: "1px solid grey",
                              borderRadius: "30px"

                            }} onClick={(e) => {
                              setUpdateIndex(index)
                              setShowUndo(true)
                              let timeOutId = setTimeout(() => {
                                setShowUndo(null)
                                setTimeOutId(null)
                                setUpdateIndex(null)
                                modifiedList.push(species)
                                modifiedAvailableList.splice(index, 1)
                                setAvailableList(modifiedAvailableList)
                                setForce(!force)
                              }, 3000)
                              setTimeOutId(timeOutId)



                            }} />)}

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
          </Grid>

        </DialogActions>

      </Dialog>
    </Grid>
  );
};
Distribution.getInitialProps = ({ query }) => {
  return { query };
};
export default Distribution;
