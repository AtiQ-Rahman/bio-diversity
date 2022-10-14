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
import Collapse from "@mui/material/Collapse";
import AddIcon from "@mui/icons-material/Add";
const species7 = require("../assets/images/species7.jpg");
const species8 = require("../assets/images/species8.jpg");
const species9 = require("../assets/images/species9.jpg");
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
  CardMedia,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import callApi from "../utils/callApi";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Details from "./details";
import AllDetailsPage from "./AllDetailsPage";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");
const imageSrc = require("../assets/images/species1.jpg");
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
export default function ManageSpeciesDetails() {
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
  const initialValues = {
    name: "",
    serial: null,
    type: "",
    keyList: [],
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
  const changeCategory = (e) => {};

  async function fetchData() {
    let response = await callApi("/get-categories-list", {});
    setCatgoryList(response.data);
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
                    <Typography gutterBottom component="h2" variant="h2" textAlign="end">
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
                                        pathname: '/addNewSpecies',
                                        // query: {
                                        //   serial: row.serial,
                                        //   category: "row.category"
                                        // }
                                      })
                                    }}
                                    sx={{ mb: 1, mr: 0.5 }}
                                  // variant="outlined"
                                  >
                                    {/* <DetailsIcon></DetailsIcon> */}
                                    &nbsp; Edit
                                  </Button>
                    </Typography>
                  </Card>

                  <Divider></Divider>
                  <Grid><AllDetailsPage></AllDetailsPage></Grid>
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
              Add
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
                    if (
                      !values.name ||
                      !values.type ||
                      values.keyList.length == 0
                    ) {
                      return;
                    }

                    let data = {
                      name: values.name,
                      serial: values.serial,
                      type: values.type,
                      keyList: values.keyList,
                    };
                    let response = await callApi(
                      "/add-update-categories",
                      data
                    );
                    resetForm();
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
                    <Box sx={{ p: 5, background: "#eee" }}>
                      <Grid container xs={12} md={12} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                          <TextField
                            type="text"
                            name="name"
                            value={values?.name || ""}
                            label="Category Name"
                            sx={{ mr: 5 }}
                            onChange={handleChange}
                          />

                          <Autocomplete
                            options={["Field", "Dropdown"]}
                            getOptionLabel={(option) => option}
                            // value={values?.type}
                            id="category-type"
                            name="type"
                            sx={{ width: 200 }}
                            onChange={(e, val) => {
                              console.log(val);
                              setFieldValue("type", val);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Type"
                                variant="standard"
                                value={values?.type}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container xs={12} md={12}>
                        {values?.keyList.map((item, index) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              key={`keyList${index}`}
                              md={12}
                              sx={{ display: "flex", mb: 2 }}
                            >
                              <TextField
                                type="text"
                                size="small"
                                name="subcategory-name"
                                value={values?.keyList[index].name}
                                label="Name"
                                sx={{ mr: 5 }}
                                onChange={(e, value) => {
                                  values.keyList[index].name = e.target.value;
                                  setFieldValue("keyList", values.keyList);
                                  console.log(e.target.value);
                                }}
                              />

                              <TextField
                                type="text"
                                value={values?.keyList[index].key}
                                size="small"
                                name="subcategory-key"
                                label="Key"
                                sx={{ mr: 5 }}
                                onChange={(e) => {
                                  values.keyList[index].key = e.target.value;
                                  setFieldValue("keyList", values.keyList);
                                }}
                              />
                              <Icon
                                icon="fluent:delete-28-filled"
                                width={30}
                                color="red"
                                onClick={(e) => {
                                  values.keyList.splice(index, 1);
                                  setFieldValue("keyList", values.keyList);
                                  // setCategoryObject(category)
                                  setForce(!force);
                                }}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
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
