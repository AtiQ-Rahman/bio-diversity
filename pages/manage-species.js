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
import AddIcon from "@mui/icons-material/Add";
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
  Tooltip,
} from "@mui/material";
import Paper from "@mui/material/Paper";
// import { useRouter } from "next/router";

import callApi from "../utils/callApi";
import { useSnackbar } from "notistack";

import * as XLSX from 'xlsx';
import { LoadingButton } from "@mui/lab";
const species7 = require("../assets/images/Plants.jpg")
const species8 = require("../assets/images/micro_orga.jpg")
const species9 = require("../assets/images/eco_sys.jpg")
const species10 = require("../assets/images/fungi.jpg")
const species11 = require("../assets/images/genetic_cellular.png")
const species12 = require("../assets/images/animals.jpg")
let species = {
  species7, species8, species9, species10, species11, species12
}
console.log({ species10 })
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
const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // backgroundColor:"red",

  paddingTop: 10,
  textAlign: "center",
  paddingBottom: 30,

  // color: theme.palette.text.secondary,
  // border: "1px solid",
  // boxShadow:"1px 1px 1px 1px black",
  // width: "300px",
  // height: "200px",
}));
export default function ManageSpecies() {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [uploadedSpecies, setUploadedSpecies] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCatgoryList] = React.useState([]);
  function FormRow() {
    const router = useRouter();
    return (
      <React.Fragment>
        {categoryList?.map((row, index) => (
          <Grid item xs={4}
            key={`Category${index}`}
          >
            <Card sx={{
              border: "1px solid #eee", filter: "drop-shadow(2px 2px 10px #eee)",
              transition: "all .2s ease-in-out",
              "&:hover": {
                filter: "drop-shadow(10px 2px 20px gray)",
                cursor: "pointer",
                transform: "scale(1.1)"
              }
            }} onClick={() =>
              router.push({
                pathname: "/manageSpeciesTable",
                query: {
                  category: row.name
                }
              })
            }>
              <CardMedia
                component="img"
                objectFit="cover"
                sx={{ height: 350 }}
                image={species[`species${index + 7}`]?.default?.src || species[`species7`].default.src}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                  <Typography component="div" variant="h3" textAlign="center">
                    {row.name} ({row.totalItem})

                  </Typography>

                </CardContent>
              </Box>

            </Card>
          </Grid>
        ))}
        {/* <Grid item xs={4}>
          <Item>Item</Item>
        </Grid> */}
        {/* <Grid item xs={4}>
          <Item>Item</Item>
        </Grid> */}
      </React.Fragment>
    );
  }
  const uploadCSV = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener("loadend", async (evt) => {
        // (B1) GET THE FIRST WORKSHEET
        var workbook = XLSX.read(evt.target.result, { type: "binary" }),
          worksheet = workbook.Sheets[workbook.SheetNames[0]],
          range = XLSX.utils.decode_range(worksheet["!ref"]);

        // (B2) READ CELLS IN ARRAY
        var data = [];
        for (let row = range.s.r; row <= range.e.r; row++) {
          let i = data.length;
          data.push([]);
          for (let col = range.s.c; col <= range.e.c; col++) {
            let cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
            data[i].push(cell?.v || '');
          }
        }
        setUploadedSpecies(data)

      });

      // (C) START - READ SELECTED EXCEL FILE
      reader.readAsArrayBuffer(evt.target.files[0]);

    }
  };
  async function uploadSpeciesTapped() {
    setLoading(true)
    if (uploadedSpecies.length > 0) {
      console.log({ uploadedSpecies })
      let data = {
        uploadedSpecies: JSON.stringify(uploadedSpecies),
        type: 'xlsx'
      }
      let res = await callApi('upload-species-by-excel', data)
      console.log("response", res);
      setLoading(false)
      if (res.success) {
        enqueueSnackbar("Species Uploaded Successfully", {
          variant: "success",
          // action: <Button>See all</Button>
        });
        window.location.reload()
      }
    }

  }
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
    // let value = eval('species10')
    // console.log({value})
    let response = await callApi("/get-categories-list", {});
    setCatgoryList(response.data);
  }
  useEffect(() => {

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.body}>
      <Box sx={{ display: "flex", pt: 5 }} >
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
              <Grid container item sx={{ mx: "auto" }}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ marginBottom: "10px" }}>
                    <Typography gutterBottom component="h2" variant="h2">
                      Major Biodiversity
                    </Typography>
                  </Card>

                  <Divider></Divider>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <h1>Total Components (6)</h1>
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
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={1}>
                        <Grid container item spacing={3}>
                          <FormRow />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  {/* <Divider></Divider> */}

                  <br />
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
              Upload Excel
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

            </DialogContent>
            <DialogActions>
              <LoadingButton loading={loading} loadingIndicator="Uploading…" variant="outlined" onClick={uploadSpeciesTapped}>
                Upload
              </LoadingButton>
              {/* <Button
                className={styles.bg_primary}
                size="small"
                style={{

                  color: "white",

                }}
                onClick={uploadSpeciesTapped}
              >
                Upload
              </Button> */}
              <Button
                size="small"
                className={styles.bg_primary}
                sx={{ color: "white" }}
                onClick={handleCloseUpload}
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
