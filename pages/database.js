import Head from "next/head";
import Image from "next/image";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

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
import Header from "../components/Home/Header";
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
import Footer from "../components/Home/Footer/Footer";
const species7 = require("../assets/images/species7.jpg")
const species8 = require("../assets/images/species8.jpg")
const species9 = require("../assets/images/species9.jpg")
const species10 = require("../assets/images/species10.jpg")
const species11 = require("../assets/images/species11.jpg")
const species12 = require("../assets/images/species12.jpg")
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

 
}));
export default function database() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
            }} 
            // onClick={() =>
            //   router.push({
            //     pathname: "/manageSpeciesTable",
            //     query: {
            //       category: row.name
            //     }
            //   })
            // }
            >
               <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={species[`species${index + 7}`].default.src}
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
      const f = evt.target.files[0];
      var name = f.name;
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
          console.log(i)
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
    if (uploadedSpecies.length > 0) {
      let data = {
        uploadedSpecies,
        type: 'xlsx'
      }
      let res = await callApi('upload-species-by-excel', data)
      console.log("response", res);
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
        <Header index={7} />

      <Box sx={{ display: "flex",pt:5 }} >
        
    
        {/* main content */}
     
        
          <div className={styles.main}>
            <Box component="section" className={styles.main_box1} sx={{ mt: 5 }}>
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
                      <h1>Total Species (6)</h1>
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
                           Download
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

     
    
      
      </Box>
      <Footer/>
    </div>
  );
}
