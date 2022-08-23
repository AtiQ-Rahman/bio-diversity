import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
const imageSrc = require("../pages/assets/images/species1.jpg");

import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Container,
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  Button,
  Modal,
  Divider,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import Header from "./components/Home/Header";
import CollapseCard from "./components/Home/collapseCard";
import SearchSection from "./components/Home/Header/SearchSection";
import Paper from "@mui/material/Paper";
import { Link, Router } from "react-router-dom";
import Image from "next/image";
import Footer from "./components/Home/Footer/Footer";
function createData(
  number,
  Species,
  Family,
  Locality,
  Habitat,
  Size,
  GIS,
  Additional
) {
  return { number, Species, Family, Locality, Habitat, Size, GIS, Additional };
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const rows = [
  createData(
    1,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),
  createData(
    2,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    3,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    4,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    5,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),
];
const Species = () => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Header index={1} />

      <div className={styles.main} sx={{ height: '100%' }}>
        <Box component="section" className={styles.main_box}  sx={{ mt: 10,}}  >
          {/* Species Search */}
          <Grid container item xs={10.5}  sx={{ mx: "auto" }}>
            <Grid item xs={15} md={8}>
              <Card sx={{marginBottom:"10px"}}>
                <Typography gutterBottom component="h2" variant="h2">
                  Species Search
                </Typography>
                <Typography gutterBottom component="description" variant="div">
                  The full name of the genus or species can be inserted, or you
                  can type the first four letters of the generic name and/or the
                  first four letters of the species (or other) epithet in upper
                  or lower case (e.g. Mere micr or mere micr for Meredithia
                  microphylla). A full list of the species and subspecific
                  entities in each genus can be obtained in the genus database.
                </Typography>
              </Card>

              <Divider></Divider>
              <Grid item xs={11}      style={{ borderRadius: "5px", }}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                  
                  
                >
                  <TextField label="Search By Name" color="secondary" />
                  <TextField label="Search By  Family" color="secondary" />
                  <TextField label="Select Country" color="secondary" />
                  <TextField label="Select Area" color="secondary" />
                  <Button
                    type="button"
                    // onClick={}
                    style={{color: "white" , background:"purple" ,          maxWidth: "80px",
                    maxHeight: "80px",
                    minWidth: "40px",
                    minHeight: "40px"
           }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>

              {/* TABLE */}
              <Divider></Divider>

              <h1>Table</h1>
              <Grid item xs={12}  sx={{boxShadow: 4,p:4}}    style={{ borderRadius: "10px", }} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>SI</TableCell>
                        <TableCell align="right">Species</TableCell>
                        <TableCell align="right">Family</TableCell>
                        <TableCell align="right">Locality</TableCell>
                        <TableCell align="right">Habitat</TableCell>
                        <TableCell align="right">Size &nbsp;(cm)</TableCell>
                        <TableCell align="right">GIS</TableCell>
                        <TableCell align="right">Additional button</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.number}
                          </TableCell>
                          <TableCell align="right">{row.Species}</TableCell>
                          <TableCell align="right">{row.Family}</TableCell>
                          <TableCell align="right">{row.Locality}</TableCell>
                          <TableCell align="right">{row.Habitat}</TableCell>
                          <TableCell align="right">{row.Size}</TableCell>
                          <TableCell align="right">{row.GIS}</TableCell>
                          <TableCell align="right">
                            <Button onClick={handleOpen} sx={{ m: 1 }} variant="outlined">
                              Details
                            </Button>

                            {/* =======MODAL===== */}

                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style} className="modal-size">
                            
                              <Grid sx={{ maxWidth: 345 }}    >    <Image src={imageSrc} 
                                    // width={500}
                                    // height={300}
                                  
                                  ></Image></Grid>
                              
                                <CardContent>
        <Typography gutterBottom variant = "h5" component = "div">
          Lizard
        </Typography>
        <Typography variant   = "body2" color  = "text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
                                {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                               </CardActions> */}
                              </Box>
                            </Modal>
                            <br />
                            <Button
                              type="button"
                              onClick={() => router.push("/map")}
                              variant="outlined"
                            >
                              View&nbsp;map
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              className={styles.side_bar}
              m={2}
              sx={{boxShadow: 4,p:4}} 
              
            >
              <Typography gutterBottom variant="h2" component="div">
                Latest Additions
              </Typography>
              <CollapseCard />
            </Grid>
          </Grid>
        </Box>
      </div>

      <footer className={styles.footer}>
     <Footer/>
      </footer>
    </div>
  );
};

export default Species;
