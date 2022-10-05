import Head from "next/head";
import Image from "next/image";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import Breadcrumbs from "../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronRight } from "@tabler/icons";
import navigation from "../components/Admin/menu-items";
import { drawerWidth } from "../store/constant";
import { SET_MENU } from "../store/actions";
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
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
  Autocomplete,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import callApi from "../utils/callApi";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");
const imageSrc = require("../assets/images/species1.jpg");
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
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);
export default function ManageSpecies() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const uploadCSV = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const [speciesList, setSpeciesList] = useState([])

  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  async function fetchData(cbfn) {
    let response = await callApi('/get-species-list', {})
    setSpeciesList(response.data)
    let speciesList = response.data
    console.log({ speciesList })
    speciesList.length > 0 ? cbfn(speciesList) : cbfn([])
  }
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    fetchData((speciesList) => { null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);
  return (
    <div className={styles.body}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: leftDrawerOpened
              ? theme.transitions.create("width")
              : "none",
              
          }}
        >
          <Toolbar sx={{
          boxShadow: '1px 1px 10px #d9d5d5',
             
        }}>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle}  />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
         
        />

        {/* main content */}
        <Main theme={theme} open={leftDrawerOpened}  sx={{mt:5}}>
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
           
          />
          <div className={styles.main}>
            <Box component="section" className={styles.main_box}>
              {/* Species Search */}
              <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ marginBottom: "10px" }}>
                    <Typography gutterBottom component="h2" variant="h2">
                      Species Search
                    </Typography>
                  </Card>
                  <Grid
                    item
                    xs={12}
                    style={{ borderRadius: "5px", marginTop: 15 }}
                  >
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

                        kingdom:
                          Yup.string("Add Remarks").required("Add Remark"),
                        phylum:
                          Yup.string("Add filmType").required("Add filmType"),
                        class:
                          Yup.string("Add priority").required("Add priority"),
                        order:
                          Yup.string("Add priority").required("Add priority"),
                        genus:
                          Yup.string("Add priority").required("Add priority"),
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
                          <Grid container xs={9} spacing={3}>
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
                                    label="Select genus"
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
                                    label="Select Species"
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
                  <Grid container xs={12}>
                    <Grid item xs={12} md={5}>
                      <h1>Total Species Found ({speciesList.length})</h1>
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Grid container xs={12} md={12}>


                        <Grid item xs={12} style={{
                          display: "flex",
                          justifyContent: "end",
                        }}>
                          <Button
                            className={styles.bg_primary}
                            style={{
                              width: "150px",
                              maxHeight: "80px",
                              minWidth: "40px",
                              minHeight: "40px",
                              color: "white",
                              boxShadow: "1px 1px 4px grey",
                              margin: "10px",
                            }}
                            onClick={(e) => {
                              router.push('/add-new-species')
                            }}
                          >
                            Add New Species
                          </Button>
                          <Button
                            className={styles.bg_primary}
                            style={{
                              width: "150px",
                              maxHeight: "80px",
                              minWidth: "40px",
                              minHeight: "40px",
                              color: "white",
                              boxShadow: "1px 1px 4px grey",
                              margin: "10px",
                            }}
                            onClick={handleClickUpload}
                          >
                            Upload Species
                          </Button></Grid>
                      </Grid>
                    </Grid>

                  </Grid>
                  <br />
                  <Grid
                    item
                    xs={12}
                    sx={{ b: 1, mb: 3 }}
                    style={{ borderRadius: "10px" }}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="customized table"
                      >
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
                          {speciesList?.map((row, index) => (
                            <StyledTableRow
                              key={`species${row.index}`}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {row.name.bangla}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography component="div" variant="div">
                                  {row.category}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.family}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.species}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.kingdom}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.Size}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.lng}, {row.lat}
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
                                    onClick={(e) => {
                                      router.push({
                                        pathname: '/add-new-species',
                                        query: {
                                          serial: row.serial,
                                          category: row.category
                                        }
                                      })
                                    }}
                                    sx={{ mb: 1, mr: 0.5 }}
                                  // variant="outlined"
                                  >
                                    <Icon icon="dashicons:edit-large" />
                                    &nbsp; Edit
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
                                  // onClick={() => router.push("/map")}
                                  >
                                    <Icon icon="fluent:delete-16-filled" />
                                    &nbsp; Delete
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
              Species Details
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="Species"
                    name="Species"
                    label="Species Name"
                    fullWidth
                    autoComplete="Species Name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Family"
                    name="Family"
                    label="Family"
                    fullWidth
                    autoComplete="Family"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Locality"
                    name="Locality"
                    label="Locality"
                    fullWidth
                    autoComplete="Locality"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Habitat"
                    name="Habitat"
                    label="Habitat"
                    fullWidth
                    autoComplete="Habitat"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="Size (cm)"
                    name="Size (cm)"
                    label="Size (cm)"
                    fullWidth
                    autoComplete="Size (cm)"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="latitude(GIS)"
                    name="latitude(GIS)"
                    label="latitude(GIS)"
                    fullWidth
                    autoComplete="latitude(GIS)"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="longitude(GIS)"
                    name="longitude(GIS)"
                    label="longitude(GIS)"
                    fullWidth
                    autoComplete="longitude(GIS)"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Descripton"
                    multiline
                    rows={4}
                    placeholder="Type your Descripton here"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid>
                  <TextField
                    sx={{
                      flexGrow: 1,

                      mt: 2,
                      ml: 3,
                    }}
                    type="file"
                    name="myImage"
                    onChange={uploadToClient}
                  />
                </Grid>
              </Grid>
              <br />
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
                Upload
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
              >
                Save
              </Button>
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
          <BootstrapDialog
            onClose={handleCloseUpload}
            aria-labelledby="customized-dialog-title"
            open={openUpload}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleCloseUpload}
              style={{
                fontWeight: 600,
                fontSize: 20,
                fontFamily: "Raleway",
                color: "#0f4c39",
              }}
            >
              Upload CSV
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid>
                  <TextField
                    sx={{
                      flexGrow: 1,

                      mt: 2,
                      ml: 3,
                    }}
                    type="file"
                    name="myImage"
                    onChange={uploadCSV}
                  />
                </Grid>
              </Grid>
              <br />
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
                Upload
              </Button>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
              >
                Save
              </Button>
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
              >
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </Main>
      </Box>
    </div>
  );
}
