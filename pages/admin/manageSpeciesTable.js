import Head from "next/head";
import Image from "next/legacy/image";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import Breadcrumbs from "../../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronRight } from "@tabler/icons";
import navigation from "../../components/Admin/menu-items";
import { drawerWidth } from "../../store/constant";
import { SET_MENU } from "../../store/actions";
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
import { useSnackbar } from "notistack";
import callApi from "../../utils/callApi";
import DetailsIcon from "@mui/icons-material/Details";
import { initialValues } from "../../utils/utils";


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
    backgroundColor: "#c44d34",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontFamily: "Times New Roman",
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
const ManageSpeciesTable = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [allTypesOfSpecies, setAllTypesOfSpecies] = useState(null)
  const [subCategories, setSubcategories] = useState([])
  const [subGroups, setSubGroups] = useState([])
  const [kingdoms, setKingdoms] = useState([])
  const [families, setFamilies] = useState([])
  const [speciesListFromServer, setSpeciesListFromServer] = useState([])
  const [genuses, setGenuses] = useState([])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
  const [speciesList, setSpeciesList] = useState([]);

  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  async function fetchData(query, cbfn) {
    let searchParameters = query;
    let response = await callApi("/get-species-by-category", {
      searchParameters,
    });

    if (response.data.length > 0) {
      console.log(response.data);
      setSpeciesList(response.data);
      let speciesList = response.data;
      console.log({ speciesList });
      if(speciesList.length > 0){
        let allTypesOfSpecies = await callApi("/get-unique-types-of-species", { category: searchParameters.category });
        setAllTypesOfSpecies(allTypesOfSpecies?.data)
        setSubcategories(allTypesOfSpecies?.data.categories)
        setSubGroups(allTypesOfSpecies.data.subGroups)
        setKingdoms(allTypesOfSpecies.data.kingdoms)
        setFamilies(allTypesOfSpecies.data.families)
        setSpeciesListFromServer(allTypesOfSpecies.data.speciesListFromServer)
        setGenuses(allTypesOfSpecies.data.genuses)
        cbfn(speciesList)
      }
      else {
        cbfn([])
      }
    }
  }
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    fetchData(router.query, (speciesList) => {
      null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, matchDownMd]);
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
          <Toolbar
            sx={{
              boxShadow: "1px 1px 10px #d9d5d5",
            }}
          >
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        <Main theme={theme} open={leftDrawerOpened} sx={{ mt: 5 }}>
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
                      Biodiversity Group
                    </Typography>
                  </Card>
                  <Grid
                    item
                    xs={12}
                    style={{ borderRadius: "5px", marginTop: 15 }}
                  >
                    <Formik
                      initialValues={initialValues}
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
                        values.category = router.query.category

                        try {
                          let res = await callApi("/search-species-by-field", {
                            searchParameters: values,
                          });
                          console.log("response", res);
                          setSpeciesList(res?.data)
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
                          <Grid container spacing={3}>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.nameOfSpecies?.bangla && errors?.nameOfSpecies?.bangla
                                )}
                                helperText={
                                  touched?.nameOfSpecies?.bangla && errors?.nameOfSpecies?.bangla
                                }
                                label="Bangla Name"
                                variant="outlined"
                                placeholder="Select"
                                name="nameOfSpecies.bangla"
                                value={values?.nameOfSpecies?.bangla}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="subGroups"
                                name={values?.subGroup || ""}
                                options={subGroups}
                                key="subGroups"
                                getOptionLabel={(option) => option.subGroup || option}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("subGroup", value?.subGroup || value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.subGroup && errors?.subGroup
                                    )}
                                    helperText={touched?.subGroup && errors?.subGroup}
                                    style={{ padding: "2px" }}
                                    label="Sub Groups"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.subGroup || ""}
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
                                getOptionLabel={(option) => option.kingdom || option}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("kingdom", value?.kingdom || value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.kingdom && errors?.kingdom
                                    )}
                                    helperText={
                                      touched?.kingdom && errors?.kingdom
                                    }
                                    style={{ padding: "2px" }}
                                    label="Kingdoms"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.kingdom || ""}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="kingdoms"
                                name={values?.family}
                                options={families}
                                key="kingdoms"
                                getOptionLabel={(option) => option.family || option}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("family", value?.family || value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.family && errors?.family
                                    )}
                                    helperText={
                                      touched?.family && errors?.family
                                    }
                                    style={{ padding: "2px" }}
                                    label="Families"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.family || ""}
                                  />
                                )}
                              />
                            </Grid>

                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="genuses"
                                name={values?.genus}
                                options={genuses}
                                key="genuses"
                                getOptionLabel={(option) => option.genus || option}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("genus", value?.genus || value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.genus && errors?.genus
                                    )}
                                    helperText={
                                      touched?.genus && errors?.genus
                                    }
                                    style={{ padding: "2px" }}
                                    label="Genus"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.genus || ""}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="kingdoms"
                                name={values?.species}
                                options={speciesListFromServer}
                                key="kingdoms"
                                getOptionLabel={(option) => option.species || option}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("species", value?.species || value);
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
                                    label="Species"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.species || ""}
                                  />
                                )}
                              />
                            </Grid>


                            <Grid item xs={2}>
                              <Button
                                className={styles.bg_primary}
                                type="submit"

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
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <h1>Total Species Found ({speciesList.length})</h1>
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Grid container md={12}>
                        <Grid
                          item
                          xs={12}
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
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
                              router.push({
                                pathname: "/admin/add-new-species",
                                query: {
                                  category: router.query.category
                                }
                              });
                            }}
                          >
                            Add New Species
                          </Button>
                        </Grid>
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
                        <TableHead>
                          <TableRow >
                            <StyledTableCell>
                              English Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Sub Group
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Family
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Species
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Genus
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              kingdom
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Action
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {speciesList?.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          ).map((row, index) => (
                            <StyledTableRow
                              key={`species${index}`}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {row.english}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography component="div" variant="div">
                                  {row.subGroup}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.family}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.species}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.genus}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.kingdom}
                              </StyledTableCell>

                              <StyledTableCell align="center">
                                <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
                                  <Button
                                    className={styles.bg_primary}
                                    style={{
                                      width: "120px",
                                      maxHeight: "80px",
                                      minWidth: "40px",
                                      minHeight: "40px",
                                      color: "white",
                                      boxShadow: "1px 1px 4px grey",
                                    }}
                                    onClick={(e) => {
                                      router.push({
                                        pathname: "/admin/manageSpeciesDetails",
                                        query: {
                                          serial: row.serial,
                                          category: row.category,
                                        },
                                      });
                                    }}
                                    sx={{ mb: 1, mr: 0.5 }}
                                  // variant="outlined"
                                  >
                                    Details
                                  </Button>

                                  {/* =======MODAL===== */}

                                  {/* <br />
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
                                  </Button> */}
                                </Box>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[100, 50]}
                      component="div"
                      count={speciesList?.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
        </Main>
      </Box>
    </div>
  );
};
ManageSpeciesTable.getInitialProps = ({ query }) => {
  return { query };
};
export default ManageSpeciesTable;
