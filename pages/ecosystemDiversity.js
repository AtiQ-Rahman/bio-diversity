import React, { useState, useEffect } from "react";
// import Footer from '../components/Home/Footer/Footer';
// import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import {
   Typography,
   Grid,
   TextField,
   Button,
   Card,
   CardContent,
   FormControlLabel,
   Checkbox,
   Box,
   AppBar,
   Toolbar,
   useMediaQuery,
   CssBaseline,
   Autocomplete,
   Divider,
   TableContainer,
   Paper,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   tableCellClasses
} from "@mui/material";
// import ImageUpload from "./ImageUpload";

import Sidebar from "../components/Admin/Sidebar";
import Breadcrumbs from "../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronRight } from "@tabler/icons";
import { Icon } from "@iconify/react";
import navigation from "../components/Admin/menu-items";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { drawerWidth } from "../store/constant";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi from "../utils/callApi";
import Image from "next/image";
import { useRouter } from "next/router";
// import { kingdoms } from "../utils/kingdoms";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");
const plants = require("../utils/plants");
const animals = require("../utils/animals");
const fungis = require("../utils/fungi");
const microOrgansims = require("../utils/microOrgansim");
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
 const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
     backgroundColor: theme.palette.common.black,
     color: theme.palette.common.white
   },
   [`&.${tableCellClasses.body}`]: {
     fontSize: 14
   }
 }));
 const StyledTableRow = styled(TableRow)(({ theme }) => ({
   "&:nth-of-type(odd)": {
     backgroundColor: theme.palette.action.hover
   },
   // hide last border
   "&:last-child td, &:last-child th": {
     border: 0
   }
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
console.log(kingdoms);
const Input = styled("input")({
   display: "none",
});
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
const map = require("../assets/images/map.png");
const EcosystemDiversity = () => {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);
   const theme = useTheme();
   const [categoryList, setCatgoryList] = React.useState()
   const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
   const initialValues = {
      serial: "",
      kingdom: "",
      phylum: "",
      animal:"",
      class: "",
      order: "",
      fungi:"",
      family: "",
      genus: "",
      species: "",
      plants:"",
      subSpecies: "",
      variety: "",
      subVariety: "",
      clone: "",
      forma: "",
      species: {
         bangla: "",
         english: "",
         commonName: "",
         synonym: ""
      },
      identificationFeatures: {},
      categories: [],
      additionalFiles: [],
      profileImage: "",
   };
   async function fetchData() {
      let response = await callApi('/get-categories-list', {})
      setCatgoryList(response.data)
   }
   useEffect(() => {
      fetchData()

   }, [])
   // Handle left drawer
   const leftDrawerOpened = useSelector((state) => state.customization.opened);
   const dispatch = useDispatch();
   const handleLeftDrawerToggle = () => {
      dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
   };

   const uploadToClient = (event) => {
      if (event.target.files[0]) {
         const i = event.target.files[0];

         setImage(i);
         setCreateObjectURL(URL.createObjectURL(i));
      }
      
   };
   const router = useRouter();
   return (
      <Box>
        
         {/* header */}
     
         <Header index={5} />
    

         {/* drawer */}
         
         
            {/* breadcrumb */}
           
            <Formik
               initialValues={initialValues}
               validationSchema={Yup.object().shape({
                  species: Yup.object().shape({
                     english: Yup.string().required(
                        "Patient english name is required"
                     ),
                     bangla: Yup.string().required("patient bangla is required"),
                     commonName: Yup.string().required("patient commonName is required"),
                     synonym: Yup.string().required("patient commonName is required"),

                     // gender: Yup.string().required("patient gender is required"),
                     // address: Yup.string().required("patient adressis required"),
                  }),
                  // serial: Yup.string("Add serial").required("Add serial"),
                  // kingdom: Yup.string("Add kingdom").required("Add kingdom"),
                  // phylum: Yup.string("Add phylum").required("Add phylum"),
                  // class: Yup.string("Add class").required("Add class"),
                  // order: Yup.string("Add order").required("Add order"),
                  // genus: Yup.string("Add genus").required("Add genus"),
                  // species: Yup.string("Add species").required("Add species"),
                  // subSpecies: Yup.string("Add subSpecies").required("Add subSpecies"),
                  // variety: Yup.string("Add variety").required("Add variety"),
                  // subVariety: Yup.string("Add subVariety").required("Add subVariety"),
                  // clone: Yup.string("Add clone").required("Add clone"),
                  // forma: Yup.string("Add forma").required("Add forma"),
               })}
               onSubmit={async (
                  values,
                  { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
               ) => {
                  try {
                     console.log({ values });
                     // console.log(values.reportfile.name);
                     let speciesData = values;
                     speciesData.createdBy = {
                        name: "test admin",
                        userId: "blabla",
                     };
                     speciesData.createdAt = new Date().getTime();
                     // console.log({ loggedUser: loggedUser.userId });
                     const data = new FormData();
                     data.append("data", JSON.stringify(speciesData));
                     let files = values.additionalFiles;
                     if (files.length != 0) {
                        for (const single_file of files) {
                           data.append('additionalFiles', single_file)
                        }
                     }
                     // data.append("reportfile", values.reportfile);
                     let res = await callApi("/create-new-species", data, {
                        headers: {
                           "Content-Type": "multipart/form-data"
                        }
                     })
                     console.log("response", res);
                     // enqueueSnackbar("Report  Uploaded Successfully", {
                     //    variant: "success",
                     //    // action: <Button>See all</Button>
                     // });
                     setErrors(false);

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
                     <Grid sx={{ p: 10, background: "white" }}>
                        <Typography
                           gutterBottom
                           variant="h3"
                           align="start"
                           sx={{ pt: 8 }}
                        >
                           Enter Your Details
                        </Typography>
                        <Grid container spacing={3}>
                      
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="deseription"
                                 name="deseription"
                                 // margin="normal"
                                 size="small"
                                 label="deseription"
                                 type="deseription"
                                 fullWidth
                                 autoComplete="deseription"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="C-sequestration"
                                 name="C-sequestration"
                                 // margin="normal"
                                 size="small"
                                 label="C-sequestration"
                                 type="C-sequestration"
                                 fullWidth
                                 autoComplete="C-sequestration"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="C-Production"
                                 name="C-Production"
                                 // margin="normal"
                                 size="small"
                                 label="C-Production"
                                 type="C-Production"
                                 fullWidth
                                 autoComplete="C-Production"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="O2-Production"
                                 name="O2-Production"
                                 // margin="normal"
                                 size="small"
                                 label="O2-Production"
                                 type="O2-Production"
                                 fullWidth
                                 autoComplete="O2-Production"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="Ecosystem value"
                                 name="Ecosystem value"
                                 // margin="normal"
                                 size="small"
                                 label="Ecosystem value"
                                 type="Ecosystem value"
                                 fullWidth
                                 autoComplete="Ecosystem value"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <TextField
                                 required
                                 id="Ecosystem status"
                                 name="Ecosystem value"
                                 // margin="normal"
                                 size="small"
                                 label="Ecosystem value"
                                 type="Ecosystem value"
                                 fullWidth
                                 autoComplete="Ecosystem value"
                                 variant="outlined"
                              />
                           </Grid>
                           
                           
                          
                           
                          
                           
                          
                           
                           

                           
                        </Grid>
                        <br />
                        <Button
                           className={styles.bg_primary}
                           type="submit"
                           // disabled={isSubmitting}
                           style={{
                              width: "80px",
                              maxHeight: "80px",
                              minWidth: "40px",
                              minHeight: "40px",
                              color: "white",
                              boxShadow: "1px 1px 4px grey",
                              marginBottom: "10px",
                           }}
                           sx={{ mb: 1, mr: 1 }}
                        >
                           Search
                        </Button>
                       
                     </Grid>
                  </Form>
               )}
            </Formik>
            <Grid item xs={12}      style={{ borderRadius: "10px",paddingBottom:"100px" }} >
                <TableContainer component={Paper}    >
                  <Table sx={{ minWidth: 650 }} aria-label="customized table" >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>SI</StyledTableCell>
                        <StyledTableCell align="center">Species</StyledTableCell>
                        <StyledTableCell align="center">Family</StyledTableCell>
                        <StyledTableCell align="center">Locality</StyledTableCell>
                        <StyledTableCell align="center">Habitat</StyledTableCell>
                        <StyledTableCell align="center">Size &nbsp;(cm)</StyledTableCell>
                        <StyledTableCell align="center">GIS</StyledTableCell>
                        <StyledTableCell align="center">Additional button</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody   >
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
                          <StyledTableCell align="center">{row.Species}</StyledTableCell>
                          <StyledTableCell align="center">{row.Family}</StyledTableCell>
                          <StyledTableCell align="center">{row.Locality}</StyledTableCell>
                          <StyledTableCell align="center">{row.Habitat}</StyledTableCell>
                          <StyledTableCell align="center">{row.Size}</StyledTableCell>
                          <StyledTableCell align="center">{row.GIS}</StyledTableCell>
                          <StyledTableCell align="center">
                          <Button
                             style={{ maxWidth: "80px",
                             maxHeight: "80px",
                             minWidth: "40px",
                             minHeight: "40px"
                    }}
                              type="button"
                              onClick={() => router.push("/details")}
                              variant="outlined"
                            >
                              details
                            </Button>
                            {/* =======MODAL===== */}

                           
                            <br />
                            {/* <Button
                             style={{ maxWidth: "80px",
                             maxHeight: "80px",
                             minWidth: "40px",
                             minHeight: "40px"
                    }}
                              type="button"
                              onClick={() => router.push("/map")}
                              variant="outlined"
                            >
                              View&nbsp;map
                            </Button> */}
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
            <Footer  style={{ padding: "100px" }} />
      </Box>
   );
};

export default EcosystemDiversity;



