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
import { SET_MENU } from "../store/actions";
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Collapse from "@mui/material/Collapse";
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
  ListItem,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import callApi from "../utils/callApi";
import Slide from "@mui/material/Slide";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSnackbar } from "notistack";
import { display } from "@mui/system";
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
  //   { id: "subcategory", label: "Subcategory", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "button", label: "Edit / Delete ", minWidth: 100 },
];

function createData(name, code, population, size) {
  const density = population / size;
  return {
    name,
    code,
    population,
    size,
    density,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

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
const SubCategories = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  // const classes = useStyles();
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const query = router.query;
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [force, setForce] = React.useState(false);
  const [category, setCategory] = React.useState();
  const [subCategoryList, setSubCategoryList] = React.useState([]);
  const [keyIndex, setKeyIndex] = useState(-1);
  const initialValues = {
    name: "",
    key: "",
  };
  const [subCategoryValues, setSubCategoriesValues] = useState(initialValues);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setKeyIndex(-1);
    setOpen(false);
  };
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseUploadDelete = () => {
    setOpenDelete(false);
  };
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const pointer = { cursor: "pointer", width: "100%" };
  let markerColor = () => { return '#' + Math.floor(Math.random() * 16777215).toString(16) }

  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const changeCategory = (e) => { };
  function FormRow(props) {
    const { row, index } = props;
    const [openCategory, setOpenCategory] = React.useState(false);
    const pointer = { cursor: "pointer" };
    return (
      <>
        <React.Fragment>
          <Grid item xs={6} md={4}>
            <Item>
              <Card
                sx={{
                  // backgroundColor: '#ff907838',
                  boxShadow: "3px 1px 10px #f1f1f1",
                  border: "1px solid #f3c4b8",
                  // '&:hover': {
                  //   backgroundColor: '#e7e7e7',
                  //   opacity: [0.9, 0.8, 0.7],
                  // },
                }}
              >
                <CardContent sx={{ pb: 30, justifyContent: "center" }}>
                  <Box sx={{ pr: 2, justifyContent: "center" }} style={pointer}>
                    <Icon
                      icon="dashicons:edit-large"
                      color="#c44d34"
                      onClick={(e) => {
                        setSubCategoriesValues(row);
                        handleClickOpen();
                      }}
                    />
                  </Box>

                  <Box style={pointer}>
                    {" "}
                    <Icon icon="fluent:delete-16-filled" color="#c44d34" />
                  </Box>

                  <Grid container spacing={2}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      if (column.id !== "button") {
                        return (
                          <Grid
                            item
                            xs={12}
                            key={column.id}
                            align="center"
                            fontSize={17}
                          >
                            <b>{column.label}</b>:{" "}
                            <span
                              style={{
                                padding: "5px",
                                borderRadius: "6px",
                                marginLeft: "10px",
                              }}
                            >
                              {value}
                            </span>
                          </Grid>
                        );
                      }
                    })}
                  </Grid>
                </CardContent>
              </Card>
            </Item>
          </Grid>
        </React.Fragment>

        {/* <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Sub Categories
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Key</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.keyList.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.name}
                        </TableCell>
                        <TableCell>{historyRow.key}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell> */}
        {/* </TableRow> */}
      </>
    );
  }
  async function fetchData(query) {
    let response = await callApi("/get-categories-by-name", {
      name: query.name,
    });
    setCategory(response.data[0]);
    setSubCategoryList(response.data[0].keyList);
  }
  useEffect(() => {
    if (!query) return;
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    fetchData(query);
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
        <Main theme={theme} open={leftDrawerOpened} sx={{ mt: 8 }}>
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
                    {/* <Typography gutterBottom component="h2" variant="h2">
                      Manage Category
                    </Typography> */}
                  </Card>

                  {/* TABLE */}
                  <Divider></Divider>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                      <h2>Selected Category ({query.name})</h2>
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Grid container>
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
                              width: "200px",
                              maxHeight: "80px",
                              minWidth: "40px",
                              minHeight: "40px",
                              color: "white",
                              boxShadow: "1px 1px 4px grey",
                              margin: "10px",
                            }}
                            onClick={handleClickOpen}
                          >
                            Add New Sub Category
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid
                    item
                    xs={12}
                    sx={{ b: 1, mb: 3, pt: 0 }}
                    style={{ borderRadius: "10px" }}
                  >
                    <Grid container spacing={3}>
                      {subCategoryList.map((row, index) => {
                        return (
                          <Grid
                            item
                            xs={6}
                            md={2}
                            key={`subCategory${index}`}
                            sx={{
                              width: "fit-content",
                              height: 100,
                              boxShadow: "15px 5px 20px #f1f1f1",
                              backgroundColor: "GhostWhite",
                              border: "1px solid #f3c4b8",
                              px: 1,
                              py: 1,
                              m: 1,
                              pb: 3,
                              borderRadius: 2
                            }}
                          >
                            <Grid container >
                              <Grid item xs={12} md={12} >
                                <Box
                                  style={{
                                    ...pointer,
                                    justifyContent: "end",
                                    display: "flex",

                                  }}
                                >
                                  <Grid paddingRight={1}>
                                    <Icon
                                      fontSize={18}
                                      icon="dashicons:edit-large"
                                      color="#3874cf"

                                      onClick={(e) => {
                                        setSubCategoriesValues(row);
                                        handleClickOpen();
                                      }}
                                    />
                                  </Grid>
                                  <Grid><Icon
                                    fontSize={18}
                                    icon="fluent:delete-16-filled"
                                    color="#c4393b"
                                    onClick={(e) => {
                                      setSubCategoriesValues(row);
                                      handleClickOpenDelete();
                                    }}
                                  /></Grid>
                                </Box>
                              </Grid>
                              <Grid item xs={12} md={12}>
                                <Typography
                                  noWrap
                                  component="div"
                                  align="center"
                                >
                                  <b>{row.name}</b>
                                </Typography>
                              </Grid>

                            </Grid>
                          </Grid>

                          // <FormRow
                          //   key={row.name}
                          //   index={index}
                          //   row={row}
                          // ></FormRow>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </div>

          <BootstrapDialog
            onClose={handleClickOpen}
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
              Add
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Formik
                initialValues={subCategoryValues}
                // validationSchema={Yup.object().shape({
                //    species: Yup.object().shape({
                //       english: Yup.string().required(
                //          "Patient english name is required"
                //       ),
                //       bangla: Yup.string().required("patient bangla is required"),

                //       // gender: Yup.string().required("patient gender is required"),
                //       // address: Yup.string().required("patient adressis required"),
                //    }),

                //    kingdom: Yup.string("Add Remarks").required("Add Remark"),
                //    phylum: Yup.string("Add filmType").required("Add filmType"),
                //    class: Yup.string("Add priority").required("Add priority"),
                //    order: Yup.string("Add priority").required("Add priority"),
                //    genus: Yup.string("Add priority").required("Add priority"),
                // })}
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
                    if (!values.name) {
                      return;
                    }
                    values.serial = category.serial;
                    console.log({ values });
                    let response = await callApi(
                      "/add-update-subcategories",
                      values
                    );
                    enqueueSnackbar("Sub Caategory Updated", {
                      variant: "success",
                      // action: <Button>See all</Button>
                    });
                    // handleClose();
                    // window.location.reload()
                    // resetForm();
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
                      <Grid container md={12} sx={{ mb: 5 }}>
                        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                          <TextField
                            type="text"
                            name="name"
                            value={values?.name || ""}
                            label="Name"
                            sx={{ mr: 5 }}
                            onChange={handleChange}
                          />

                          {/* <Button
                            size="small"
                            className={styles.bg_primary}
                            sx={{ color: "white", width: "150px", ml: 10 }}
                            onClick={() => {
                              let subCategories = values.keyList;
                              subCategories.push({
                                name: "",
                                key: "",
                              });
                              setFieldValue("keyList", subCategories);
                              // setCategoryObject(category)
                              setForce(!force);
                            }}
                          >
                            Add subcategory
                          </Button> */}
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
          <Dialog
            onClose={handleClickOpenDelete}
            aria-labelledby="customized-dialog-title"
            open={openDelete}>
            <DialogTitle> Are you sure you want to delete ? </DialogTitle>
            <DialogActions>
              <Button

                type="submit"
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
                onClick={async (e) => {
                  console.log(subCategoryValues)
                  let response = await callApi(
                    "/delete-subcategories",
                    { values: subCategoryValues }
                  );
                  handleCloseUploadDelete()
                  window.location.reload()
                }}
              >
                Yes
              </Button>
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
                onClick={(e) => {
                  handleCloseUploadDelete()

                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          {/* <Dialog
            fullScreen
            open={openUpload}
            onClose={handleCloseUpload}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative', background: "white" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  sx={{ color: "black" }}
                  onClick={handleCloseUpload}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
                  Add Category
                </Typography>
                <Button autoFocus color="inherit" onClick={handleClose} className={styles.bg_primary}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <Box sx={{ p: 5, background: "#eee" }}>
              <Grid container md={12} sx={{ mb: 5 }}>
                <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                  <TextField
                    type="text"
                    name="category-name"
                    label="Category Name"
                    sx={{ mr: 5 }}
                    onChange={changeCategory}
                  />

                  <Autocomplete
                    options={['Field', 'Dropdown']}
                    getOptionLabel={(option) => option}
                    id="category-type"
                    sx={{ width: 200 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Type" variant="standard" />
                    )}
                  />
                  <Button size="small" className={styles.bg_primary} sx={{ color: "white", width: "150px", ml: 10 }} onClick={() => {
                    let category = categoryObject
                    category.keyList.push({
                      name: "",
                      key: ""
                    })
                    setCategoryObject(category)
                    setForce(!force)
                  }}

                  >
                    Add New Field
                  </Button>
                </Grid>

              </Grid>
              <Divider />
              <Grid container md={12}>
                {categoryObject?.keyList.map((item, index) => {
                  return (

                    <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                      <TextField
                        type="text"
                        size="small"
                        name="subcategory-name"
                        value={item.name}
                        label="Name"
                        sx={{ mr: 5 }}
                        onChange={changeCategory}
                      />

                      <TextField
                        type="text"
                        value={item.key}
                        size="small"
                        name="subcategory-key"
                        label="Key"
                        sx={{ mr: 5 }}
                        onChange={changeCategory}
                      />

                    </Grid>

                  )
                })}

              </Grid>

            </Box>

          </Dialog> */}
        </Main>
      </Box>
    </div>
  );
};
SubCategories.getInitialProps = ({ query }) => {
  return { query };
};
export default SubCategories;
