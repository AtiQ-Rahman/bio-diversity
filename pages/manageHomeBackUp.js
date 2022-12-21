import Head from "next/head";
import Image from "next/legacy/image";

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
import { useSnackbar } from "notistack";
import { SET_MENU } from "../store/actions";
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
const species8 = require("../assets/images/species8.jpg");
const species10 = require("../assets/images/species10.jpg");
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
  CardActionArea,
  CardMedia, MenuItem, FormControl, Select, InputLabel
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import callApi, { imageUrl } from "../utils/callApi";
import { imageLoader } from "../utils/utils";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
const columns = [
  // { id: "subcategory", label: "Subcategory", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "type", label: "Type", minWidth: 100 },
  { id: "button", label: "Action ", width: 100 },
];
const itemData = [
  {
    img1: species8,
    title: "Butterfly",
    author: "@bkristastucchio",
    featured: true,
  },
  // {
  //   img2: species10,
  //   title: "Turtle",
  //   author: "@rollelflex_graphy726",
  // },
  // {
  //   img3: species7,
  //   title: "Deer",
  //   author: "@helloimnik",
  // },
];
const sightingsData = [
  {
    img2: species10,
    title: "Turtle",
    author: "@rollelflex_graphy726",
  },
  // {
  //   img3: species7,
  //   title: "Deer",
  //   author: "@helloimnik",
  // },
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
export default function ManageHome() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [force, setForce] = React.useState(false);
  const [categoryList, setCatgoryList] = React.useState();
  const { enqueueSnackbar } = useSnackbar();

  const [templateList, setTemplateList] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState({});
  const [selectedRecentSightings, setSelectedRecentSightings] = React.useState([]);
  const initialValues = {
    name: "",
    serial: null,
    sliderImages: [],
    recentSighting: '',
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
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
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const changeCategory = (e) => { };

  async function fetchData() {
    let response = await callApi("/get-template-list", {});
    setTemplateList(response.data);
    let list = response.data
    let modifiedList = list.filter((item) => item.selected)
    console.log(modifiedList)
    setSelectedTemplate(modifiedList?.[0] || [])
    if (modifiedList[0]) {
      let allSpecies = await callApi("/get-species-list", {});
      if (allSpecies.data.length > 0) {
        console.log(allSpecies.data)
        let speciesList = allSpecies.data
        speciesList = speciesList.sort((a, b) => {
          if (a.createdDatetimeStamp > b.createdDatetimeStamp) return -1;
          if (a.createdDatetimeStamp < b.createdDatetimeStamp) return 1;
          return 0;
        });
        console.log(speciesList.slice(0, parseInt(modifiedList[0]?.recentSighting)))
        if (speciesList.length < parseInt(modifiedList[0]?.recentSighting)) {
          setSelectedRecentSightings(speciesList)
        }
        else {
          setSelectedRecentSightings(speciesList.slice(0, parseInt(modifiedList[0]?.recentSighting)))
        }
      }
    }

  }
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    fetchData();
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
                      Manage Home Page
                    </Typography>
                  </Card>

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
                        onClick={handleClickUpload}
                      >
                        Add New Template
                      </Button>
                    </Grid>
                  </Grid>


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
                          <TableRow>
                            <TableCell>SI</TableCell>
                            <TableCell align="center">Template Name</TableCell>
                            <TableCell align="center">Selected</TableCell>
                            <TableCell align="center">Images</TableCell>
                            <TableCell align="center">Recent Sightings</TableCell>
                            <TableCell align="center">Action</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {templateList?.map((row, index) => (
                            <StyledTableRow
                              key={`species${index}`}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {index +  1}
                              </StyledTableCell>
                              <StyledTableCell component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.selected == 1 ?
                                  (<Typography component="div" variant="div" style={{ background: "green", color: "white", padding: "5px", borderRadius: "8px" }}>
                                    Yes
                                  </Typography>)
                                  :
                                  (
                                    <Typography component="div" variant="div">
                                      No
                                    </Typography>)
                                }


                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.sliderImages}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                last {row.recentSighting} sights
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
                                    onClick={async (e) => {
                                      let serial = row.serial

                                      let res = await callApi("/update-selected-template", { serial })
                                      window.location.reload()
                                      console.log(res)
                                    }}
                                    sx={{ mb: 1, mr: 0.5 }}
                                  // variant="outlined"
                                  >
                                    {/* <DetailsIcon></DetailsIcon> */}
                                    &nbsp; Select
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
                  <Divider></Divider>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <h1>Selected Slider Images</h1>
                    </Grid>

                  </Grid>
                  <br />
                  <Grid
                    item
                    xs={12}
                    sx={{ b: 1, mb: 3 }}
                    style={{ borderRadius: "10px" }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >
                          {selectedTemplate?.sliderImages?.split(',')?.map((item, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                              <Item>
                                <Card sx={{ maxWidth: 345 }}>

                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      alt=""
                                    />
                                    <Image
                                      src={imageUrl + "/" + item}
                                      layout="fill"
                                      loader={imageLoader}

                                      // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                      alt={item.title}
                                    // loading="lazy"
                                    />
                                  </CardActionArea>

                                </Card>
                              </Item>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                  <Divider></Divider>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <h1>Total Slider (3)</h1>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid
                    item
                    xs={12}
                    sx={{ b: 1, mb: 3 }}
                    style={{ borderRadius: "10px" }}
                  >
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Grid
                          container
                          spacing={{ xs: 2, md: 3 }}
                          columns={{ xs: 4, sm: 8, md: 12 }}
                        >

                          <Grid item xs={2} sm={4} md={4}>
                            <Item>
                              {selectedRecentSightings.map((item, index) => (
                                <Card sx={{ border: "1px solid gray" }} key={index}>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      height="140"
                                      image={imageUrl + '/' + item.profile_image}
                                      alt="green iguana"
                                    />

                                    <CardContent>
                                      <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                      >
                                        {item.english}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        {item.kingdom}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              ))}
                            </Item>
                          </Grid>

                        </Grid>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>

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
              Add Template
            </BootstrapDialogTitle>
            <DialogContent dividers>
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
                  try {
                    console.log(values);
                    let homePageData = values
                    const data = new FormData();
                    data.append("data", JSON.stringify(homePageData));
                    let files = homePageData.sliderImages;
                    if (files.length != 0) {
                      for (const single_file of files) {
                        data.append("sliderImages", single_file);
                      }
                    }
                    console.log(homePageData);

                    let res = await callApi("/create-new-template", data, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });
                    console.log("response", res);
                    enqueueSnackbar("Templated Added Successfully", {
                      variant: "success",
                      // action: <Button>See all</Button>
                    });
                    setErrors(false);
                    resetForm();
                    handleCloseUpload()
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
                    <Box sx={{ p: 5, background: "#white" }}>
                      <Grid container md={12} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                          <TextField
                            type="text"
                            name="name"
                            value={values?.name || ""}
                            label="Template Name"
                            sx={{ mr: 5 }}
                            onChange={handleChange}
                          />
                          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small">Select Sights</InputLabel>
                            <Select
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={values?.recentSighting || "None"}
                              label="Select Sights"
                              name="recentSighting"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={3}>last 3 sights</MenuItem>
                              <MenuItem value={5}>last 5 sights</MenuItem>
                              <MenuItem value={6}>last 6 sights</MenuItem>
                              <MenuItem value={7}>last 7 sights</MenuItem>
                              <MenuItem value={8}>last 8 sights</MenuItem>
                              <MenuItem value={9}>last 9 sights</MenuItem>
                              <MenuItem value={10}>last 10 sights</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sx={{ my: 2 }}>
                          <input
                            style={{
                              flexGrow: 1,
                              mt: 2,

                            }}
                            type="file"
                            multiple
                            name="profileImage"
                            onChange={(e) => {
                              for (let file of e.target.files) {
                                values.sliderImages.push(file);
                              }
                              setFieldValue(
                                "sliderImages",
                                values.sliderImages
                              );
                              console.log(e.target.files);
                              // setFileName(e.target.files[0].name);
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {values?.sliderImages?.length > 0 ? (
                            Array.from(values.sliderImages)
                              .slice(0, 5)
                              .map((file, index) => {
                                return (
                                  <Grid
                                    key={`additionalFiles${index}`}
                                    item
                                    xs={12}
                                    style={{
                                      border: "1px solid #eee",
                                      borderRadius: "10px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    <Grid
                                      container
                                      style={{ padding: 10 }}
                                    >
                                      <Grid
                                        item
                                        xs={1}
                                        md={2}
                                        style={{ paddingTop: 2 }}
                                      >
                                        <Icon icon="bi:image" />
                                      </Grid>
                                      <Grid
                                        item
                                        xs={10}
                                        md={9}
                                        style={{ paddingLeft: 2 }}
                                      >
                                        <Typography
                                          component="div"
                                          variant="body"
                                        >
                                          {file?.name || file}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={1}
                                        style={{ paddingTop: 2 }}
                                      >
                                        <Icon
                                          icon="fluent:delete-32-filled"
                                          onClick={(e) => {
                                            let list = Array.from(
                                              values.sliderImages
                                            );
                                            list.splice(index, 1);
                                            setFieldValue(
                                              "sliderImages",
                                              list
                                            );
                                          }}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                );
                              })
                          ) : (
                            null
                          )}
                        </Grid>
                      </Grid>
                      <Divider />

                    </Box>
                    <DialogActions>
                      <Button
                        disabled={isSubmitting}
                        type="submit"
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
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </BootstrapDialog>
        </Main>
      </Box>
    </div>
  );
}
