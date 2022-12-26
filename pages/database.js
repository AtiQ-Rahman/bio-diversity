// import Head from "next/head";
// import Image from "next/legacy/image";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

// import Breadcrumbs from "../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
// import { IconChevronRight } from "@tabler/icons";
// import navigation from "../components/Admin/menu-items";
// import { drawerWidth } from "../store/constant";
// import { SET_MENU } from "../store/actions";
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
// import { Icon } from "@iconify/react";
// import Collapse from "@mui/material/Collapse";
// import AddIcon from "@mui/icons-material/Add";
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
  // TextField,
  // TableCell,
  // TableRow,
  // TableBody,
  // TableHead,
  // Table,
  // TableContainer,
  // Button,
  // Modal,
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

// import * as XLSX from 'xlsx';
// import Footer from "../components/Home/Footer/Footer";
// import Link from "next/link";
import { pageGroups } from "../utils/utils";
import Footer from "../components/Home/Footer/Footer";
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

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // backgroundColor:"red",

  paddingTop: 10,
  textAlign: "center",
  paddingBottom: 30,


}));
export default function Database() {
  const router = useRouter();
  // const [open, setOpen] = React.useState(false);
  // const [openUpload, setOpenUpload] = React.useState(false);
  // const [uploadedSpecies, setUploadedSpecies] = React.useState([]);
  // const { enqueueSnackbar } = useSnackbar();
  const [categoryList, setCatgoryList] = React.useState([]);
  function FormRow() {
    return (
      <Grid container item spacing={3}>
        {categoryList?.map((row, index) => (
          <Grid item md={4} xs={12}
            key={`Category${index}`}
            onClick={(e) => {
              let url
              if (row.name == pageGroups.plants) {
                url = '/plants'
              }
              else if (row.name == pageGroups.animals) {
                url = '/animals'
              }
              else if (row.name == pageGroups.fungi) {
                url = '/fungi'
              }
              else if (row.name == pageGroups.micro) {
                url = '/microOrgansim'
              }
              else if (row.name == pageGroups.eco) {
                url = '/ecosystemDiversity'
              }
              else if (row.name == pageGroups.genetic) {
                url = '/geneticSubCellularDiversity'
              }
              router.push(url)
            }}
          >
            <Card sx={{
              border: "1px solid #eee", filter: "drop-shadow(2px 2px 10px #eee)",
              transition: "all .2s ease-in-out",
              cursor: "pointer"
              // "&:hover": {
              //   filter: "drop-shadow(10px 2px 20px gray)",
              //   cursor: "pointer",
              //   transform: "scale(1.1)"
              // }
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
                image={species[`species${index + 7}`]?.default?.src || species[`species7`].default.src}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent >
                  <Grid container>
                    <Grid item xs={3} sx={{
                      borderRight: "1px solid grey",
                      // borderRadius: 2
                    }}>
                      <Typography component="div" variant="h5" textAlign="center" >
                        <span style={{
                          fontSize: '2rem',
                          color: "green"
                        }}>{row.totalItem} </span>
                        
                      </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography component="div" variant="h4"
                        sx={{
                          pl: 2,
                        }} 

                        >
                        {row.name}
                      </Typography>
                      <Typography component="a" variant="link"
                        sx={{
                          pl: 2,
                          color: 'blue',
                          '&:hover':{
                            textDecoration: "underline" 
                          }
                        }} >
                        Download Datasets
                      </Typography>
                    </Grid>
                  </Grid>
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
      </Grid>


    );
  }

  // const handleClickUpload = () => {
  //   setOpenUpload(true);
  // };
  // const handleCloseUpload = () => {
  //   setOpenUpload(false);
  // };
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  // const handleLeftDrawerToggle = () => {
  //   dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  // };
  // const changeCategory = (e) => { };

  async function fetchData() {
    // let value = eval('species10')
    // console.log({value})
    let response = await callApi("/get-categories-list", {});
    setCatgoryList(response.data);
  }
  useEffect(() => {

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);
  return (
    <div className={styles.body}>
      <Header index={8} />

      <Box sx={{ display: "flex", pt: 5 }} >


        {/* main content */}


        <div className={styles.main}>
          <Box component="section" className={styles.main_box1} sx={{ mt: 5 }}>
            {/* Species Search */}
            <Grid container item sx={{ mx: "auto" }}>
              <Grid item xs={12} md={12}>
                <Card sx={{ marginBottom: "10px" }}>
                  <Typography gutterBottom component="h2" variant="h2">
                    Major components
                  </Typography>
                </Card>

                <Divider></Divider>
                {/* <Grid container>

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

                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> */}
                <br />
                <Grid>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                      <FormRow />

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
      <Footer />
    </div>
  );
}
