import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
const imageSrc = require("../assets/images/species1.jpg");

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
  Autocomplete,
  Dialog,
} from "@mui/material";
import Header from "../components/Home/Header";
import CollapseCard from "../components/Home/collapseCard";
import SearchSection from "../components/Home/Header/SearchSection";
import Paper from "@mui/material/Paper";
import { Link, Router } from "react-router-dom";
import Image from "next/image";
import Footer from "../components/Home/Footer/Footer";
import Counters from "../components/Home/counters";
import { fontSize, fontWeight, height } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import listOfSpecies from "../utils/speciesList";
import callApi from "../utils/callApi";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");

const initialValues = {
  kingdom: "",
  phylum: "",
  class: "",
  order: "",
  family: "",
  genus: "",
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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
  description,
  Family,
  Locality,
  Habitat,
  Size,
  lat,
  lng
) {
  return {
    number,
    imageSrc,
    Species,
    description,
    Family,
    Locality,
    Habitat,
    Size,
    lat,
    lng,
  };
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
    fontSize: 20,
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

const Species = () => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getAllSpeciesList();
  }, []);
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAllSpeciesList = async () => {
    let searchParameters = {
      name: "test",
    };
    // const speciesList = await callApi("/get-species-list", searchParameters);
    const speciesList = listOfSpecies;
    let list = [];
    console.log(speciesList);
    speciesList?.map((species, index) => {
      list.push(
        createData(
          index,
          species.imageSrc,
          species.title,
          species.description,
          "Bryopsidaceae",
          "St Martin’s Island (SMI)",
          "rocks, corals",
          "2-3",
          20.62299,
          92.320325
        )
      );
      if (index == speciesList.length - 1) {
        console.log("working");
        setRows(list);
      }
    });
  };
  return (
    <div className={styles.body}>
      <Header index={1} />

      <div className={styles.main}>
        <Box component="section" className={styles.main_box}>
          {/* Species Search */}
          <Grid container item xs={12} md={12} sx={{ mx: "auto", mt: 10 }}>
            <Grid item xs={12} md={12}>
              <Card sx={{ marginBottom: "10px" }}>
                <Typography
                  gutterBottom
                  component="h2"
                  variant="h2"
                  style={{ color: "#c44d34", fontSize: 30 }}
                >
                  Species Search
                </Typography>
                <Typography
                  gutterBottom
                  component="description"
                  variant="div"
                  style={{ fontSize: 20, color: "black" }}
                >
                  The full name of the genus or species can be inserted, or you
                  can type the first four letters of the generic name and/or the
                  first four letters <br /> of the species (or other) epithet in
                  upper or lower case (e.g. Mere micr or mere micr for
                  Meredithia microphylla). A full list of the species <br /> and
                  subspecific entities in each genus can be obtained in the
                  genus database.
                </Typography>
              </Card>

              <Grid item xs={12} style={{ borderRadius: "5px", marginTop: 15 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    species: Yup.object().shape({
                      english: Yup.string().required(
                        "Patient english name is required"
                      ),
                      bangla: Yup.string().required(
                        "patient bangla is required"
                      ),

                      // gender: Yup.string().required("patient gender is required"),
                      // address: Yup.string().required("patient adressis required"),
                    }),

                    kingdom: Yup.string("Add Remarks").required("Add Remark"),
                    phylum: Yup.string("Add filmType").required("Add filmType"),
                    class: Yup.string("Add priority").required("Add priority"),
                    order: Yup.string("Add priority").required("Add priority"),
                    genus: Yup.string("Add priority").required("Add priority"),
                  })}
                  onSubmit={async (
                    values,
                    {
                      resetForm,
                      setErrors,
                      setStatus,
                      setSubmitting,
                      setFieldValue,
                    }
                  ) => {
                    try {
                      // console.log({ values });
                      // // console.log(values.reportfile.name);
                      // let xrayData = values;
                      // xrayData.createdBy = {
                      //   name: loggedUser.name,
                      //   userId: loggedUser.userId,
                      // };
                      // xrayData.createdAt = new Date().getTime();
                      // console.log({ loggedUser: loggedUser.userId });
                      // const data = new FormData();
                      // data.append("data", JSON.stringify(xrayData));
                      // let files = values.reportfile;
                      // if (files.length != 0) {
                      //   for (const single_file of files) {
                      //     data.append('reportfile', single_file)
                      //   }
                      // }
                      // // data.append("reportfile", values.reportfile);
                      // callApi.post("/xray/new", data, {
                      //   headers: {
                      //     "Content-Type": "multipart/form-data"
                      //   }
                      // }).then((res) => {\
                      //   console.log("response", res);
                      //   enqueueSnackbar("Report  Uploaded Successfully", {
                      //     variant: "success",
                      //     // action: <Button>See all</Button>
                      //   });
                      //   setErrors(false);
                      // });
                    } catch (error) {
                      console.log({ error });

                      setStatus({ success: false });
                      setErrors({ submit: error.message });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Grid container xs={12} spacing={2}>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="genuses"
                                name={values?.genus}
                                options={genuses}
                                key="genuses"
                                getOptionLabel={(option) => option.name}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("genus", value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.genus && errors?.genus
                                    )}
                                    helperText={touched?.genus && errors?.genus}
                                    style={{ padding: "2px" }}
                                    label="---Select genus---"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.genus}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="kingdoms"
                                name={values?.kingdom}
                                options={kingdoms}
                                key="kingdoms"
                                getOptionLabel={(option) => option.name}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("kingdom", value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.species && errors?.species
                                    )}
                                    helperText={
                                      touched?.species && errors?.species
                                    }
                                    style={{ padding: "2px" }}
                                    label="---Select Species---"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.kingdom}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.commonName && errors?.commonName
                                )}
                                helperText={
                                  touched?.commonName && errors?.commonName
                                }
                                label="Common Name"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.commonName}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.taxonomy && errors?.taxonomy
                                )}
                                helperText={
                                  touched?.taxonomy && errors?.taxonomy
                                }
                                label="Higher Taxonomy"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.taxonomy}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.distribution && errors?.distribution
                                )}
                                helperText={
                                  touched?.distribution && errors?.distribution
                                }
                                label="Distribution"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.distribution}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Button
                                className={styles.bg_primary}
                                style={{
                                  width: "80px",
                                  maxHeight: "80px",
                                  minWidth: "40px",
                                  minHeight: "40px",
                                  color: "white",
                                  boxShadow: "1px 1px 4px grey",
                                  marginBottom: "10px",
                                }}
                              >
                                Search
                              </Button>
                            </Grid>
                          </Grid>

                      <br />
                    </Form>
                  )}
                </Formik>
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
                          <StyledTableCell
                            component="th"
                            scope="row"
                            className={styles.textContainer}
                          >
                            {row.number}
                          </StyledTableCell>
                          <StyledTableCell component="th">
                            <Image
                              src={imageSrc}
                              height={100}
                              width={150}
                              sx={{ borderRadius: 10 }}
                            ></Image>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Typography component="h3" variant="h3">
                              {row.Species}
                            </Typography>
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
                          <StyledTableCell
                            align="center"
                            className={styles.textContainer}
                          >
                            {row.GIS}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
                              <Button
                                className={styles.bg_primary}
                                style={{
                                  width: "80px",
                                  maxHeight: "80px",
                                  minWidth: "40px",
                                  minHeight: "40px",
                                  color: "white",
                                  boxShadow: "1px 1px 4px grey",
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
                                  boxShadow: "1px 1px 4px grey",
                                  maxHeight: "80px",
                                  width: "80px",
                                  background: "white",
                                  minHeight: "40px",
                                  color: "#0f4c39",
                                }}
                                type="button"
                                onClick={() =>
                                  router.push({ pathname: "/map", query: row })
                                }
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
        fullWidth
        maxWidth="md"
        // style={{
        //   // width: "100%",
        //   minWidth: "500px"
        // }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          style={{
            fontWeight: 600,
            fontSize: 20,
            fontFamily: "Raleway",
            color: "#0f4c39",
          }}
        >
          <br />
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Image
            src={imageSrc}
            // width={500}
            height={400}
          ></Image>
          <Typography
            gutterBottom
            style={{
              fontWeight: 600,
              fontSize: 30,
              fontFamily: "Raleway",
              paddingBottom: 20,
              paddingTop: 20,
              color: "#0f4c39",
            }}
          >
            Praesent commodo cursus magna
          </Typography>
          <Typography
            gutterBottom
            style={{ fontWeight: 600, fontFamily: "Roboto" }}
          >
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography
            gutterBottom
            style={{ fontWeight: 300, fontFamily: "Roboto" }}
          >
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
            sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
            sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
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
