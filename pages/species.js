import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
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
  tableCellClasses,
  TablePagination,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog,
} from "@mui/material";
import Header from "./components/Home/Header";
import CollapseCard from "./components/Home/collapseCard";
import SearchSection from "./components/Home/Header/SearchSection";
import Paper from "@mui/material/Paper";
import { Link, Router } from "react-router-dom";
import Image from "next/image";
import Footer from "./components/Home/Footer/Footer";
import Counters from "./components/Home/counters";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function createData(
  number,
  imageSrc,
  Species,
  Family,
  Locality,
  Habitat,
  Size,
  GIS,
  Additional
) {
  return { number,imageSrc, Species, Family, Locality, Habitat, Size, GIS, Additional };
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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const rows = [
  createData(
    1,
    imageSrc,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),
  createData(
    2,
    imageSrc,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    3,
    imageSrc,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    4,
    imageSrc,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    5,
    imageSrc,
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
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.body}>
      <Header index={1} />

      <div className={styles.main} sx={{ height: "100%" }}>
        <Box component="section" className={styles.main_box} sx={{ mt: 10 }}>
          {/* Species Search */}
          <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ marginBottom: "10px" }}>
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
              <Grid item xs={11} style={{ borderRadius: "5px" }}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField label="Search By Name" color="secondary" className={styles.custom_input}/>
                  <TextField label="Search By  Family" color="secondary" />
                  <TextField label="Select Country" color="secondary" />
                  <TextField label="Select Area" color="secondary" />
                  <Button
                    type="button"
                    // onClick={}
                    style={{
                      color: "white",
                      background: "#5e35b1",
                      maxWidth: "80px",
                      maxHeight: "80px",
                      minWidth: "40px",
                      minHeight: "40px",
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>

              {/* TABLE */}
              <Divider></Divider>

              <h1>Total Species Found (5)</h1>
              <br />
              <Grid
                item
                xs={12}
                sx={{ b: 1, mb: 3 }}
                style={{ borderRadius: "10px" }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    {/* <TableHead>
                      <TableRow>
                        <StyledTableCell>SI</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>

                        <StyledTableCell align="center">
                          Species
                        </StyledTableCell>
                        <StyledTableCell align="center">Family</StyledTableCell>
                        <StyledTableCell align="center">
                          Locality
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Habitat
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Size &nbsp;(cm)
                        </StyledTableCell>
                        <StyledTableCell align="center">GIS</StyledTableCell>
                        <StyledTableCell align="center">
                          Additional button
                        </StyledTableCell>
                      </TableRow>
                    </TableHead> */}
                    <TableBody>
                      {rows.map((row) => (
                        <StyledTableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.number}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <Image src = {row.imageSrc} height={100} width={150} sx={{borderRadius : 10}}></Image>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography component="h3" variant="h3">{row.Species}</Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.Family}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.Locality}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.Habitat}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.Size}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.GIS}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Box sx={{flexGrow : 1 , flexDirection:'row'}}>
                            <Button
                              style={{
                                width: "80px",
                                maxHeight: "80px",
                                minWidth: "40px",
                                minHeight: "40px",
                                background: '#5e35b1',
                                color: 'white',
                                boxShadow:'1px 1px 4px grey'
                              }}
                              onClick={handleClickOpen}
                              sx={{ mb: 1, mr: 0.5 }}
                            // variant="outlined"
                            >
                              Details
                            </Button>

                            {/* =======MODAL===== */}

                            <br />
                            <Button
                              style={{
                                boxShadow:'1px 1px 4px grey',
                                maxHeight: "80px",
                                width: "80px",
                                background: 'white',
                                minHeight: "40px",
                                color:'#5e35b1'
                              }}
                              type="button"
                              onClick={() => router.push("/map")}

                            >
                              View&nbsp;map
                            </Button>
                            </Box>

                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
              </Grid>

            </Grid>

          </Grid>
        </Box>
      </div>


      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{ fontWeight: 600, fontSize: 20,  fontFamily: 'Raleway', color:'#5e35b1' }}>
          Details
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <Image
              src={imageSrc}
            // width={500}
            height={500}
            ></Image>
          <Typography gutterBottom style={{ fontWeight: 600, fontSize: 30,  fontFamily: 'Raleway',paddingBottom:20,paddingTop:20, color:'#5e35b1' }}>
            Praesent commodo cursus magna
          </Typography>
          <Typography gutterBottom  style={{ fontWeight: 600,  fontFamily: 'Roboto', }}>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom style={{ fontWeight: 300,  fontFamily: 'Roboto', }}>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
        </DialogContent>
        <DialogActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        </DialogActions>
        </BootstrapDialog>
      <Footer />

    </div>
  );
};

export default Species;
