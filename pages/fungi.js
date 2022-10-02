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
import callApi, { imageUrl } from "../utils/callApi";
import Image from "next/image";
import { useRouter } from "next/router";
import { imageLoader } from "../utils/utils";
// import { kingdoms } from "../utils/kingdoms";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
console.log(kingdoms);
const Input = styled("input")({
   display: "none",
});
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
let imageProps = {
   height: "100px",
   width: "200px",
}
const map = require("../assets/images/map.png");
const Fungi = () => {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);
   const [category, setCatgory] = React.useState()
   const theme = useTheme();
   const [speciesList, setSpeciesList] = React.useState()
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
      let response = await callApi('/get-categories-by-name', { name: 'Fungi' })
      if (response.data.length > 0) {
         console.log(response.data)
         setCatgory(response.data[0])
      }
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
     
         <Header index={3} />
    

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
                                 id="serial"
                                 name="serial"
                                 // margin="normal"
                                 size="small"
                                 label="Serial"
                                 type="number"
                                 fullWidth
                                 autoComplete="Serial"
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="fungis"
                                 name={values?.type}
                                 options={category}
                                 key="fungis"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("type", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.type && errors?.type)}
                                       helperText={touched?.type && errors?.type}
                                       style={{ padding: "2px" }}
                                       label="fungis"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.type}
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
                                       error={Boolean(touched?.kingdom && errors?.kingdom)}
                                       helperText={touched?.kingdom && errors?.kingdom}
                                       style={{ padding: "2px" }}
                                       label="---Select Kingdom---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.kingdom}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="phylums"
                                 name={values?.phylum}
                                 options={phylums}
                                 key="phylums"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("phylum", value.name);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.phylum && errors?.phylum)}
                                       helperText={touched?.phylum && errors?.phylum}
                                       style={{ padding: "2px" }}
                                       label="---Select Phylum---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.phylum}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="classes"
                                 name={values?.class}
                                 options={classes}
                                 key="classes"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("class", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.class && errors?.class)}
                                       helperText={touched?.class && errors?.class}
                                       style={{ padding: "2px" }}
                                       label="---Select Class---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.class}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="orders"
                                 name={values?.order}
                                 options={orders}
                                 key="orders"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("order", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.order && errors?.order)}
                                       helperText={touched?.order && errors?.order}
                                       style={{ padding: "2px" }}
                                       label="---Select Order---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.order}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="families"
                                 name={values?.family}
                                 options={families}
                                 key="families"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("family", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.family && errors?.family)}
                                       helperText={touched?.family && errors?.family}
                                       style={{ padding: "2px" }}
                                       label="---Select Family---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.family}
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
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("genus", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.genus && errors?.genus)}
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
                                 id="species"
                                 name={values?.species}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("species", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.species && errors?.species)}
                                       helperText={touched?.species && errors?.species}
                                       style={{ padding: "2px" }}
                                       label="---Select species---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.species}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="subSpecies"
                                 name={values?.subSpecies}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("subSpecies", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.subSpecies && errors?.subSpecies)}
                                       helperText={touched?.subSpecies && errors?.subSpecies}
                                       style={{ padding: "2px" }}
                                       label="---Select Sub Species---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.subSpecies}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="variety"
                                 name={values?.variety}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("variety", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.variety && errors?.variety)}
                                       helperText={touched?.variety && errors?.variety}
                                       style={{ padding: "2px" }}
                                       label="---Select variety---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.variety}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="subVariety"
                                 name={values?.subVariety}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("subVariety", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.subVariety && errors?.subVariety)}
                                       helperText={touched?.subVariety && errors?.subVariety}
                                       style={{ padding: "2px" }}
                                       label="---Select sub-variety---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.subVariety}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="clone"
                                 name={values?.clone}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("clone", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.clone && errors?.clone)}
                                       helperText={touched?.clone && errors?.clone}
                                       style={{ padding: "2px" }}
                                       label="---Select clone---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.clone}
                                    />
                                 )}
                              />
                           </Grid>
                           <Grid item xs={2}>
                              <Autocomplete
                                 size="small"
                                 disablePortal
                                 id="forma"
                                 name={values?.forma}
                                 options={genuses}
                                 key=""
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("forma", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.forma && errors?.forma)}
                                       helperText={touched?.forma && errors?.forma}
                                       style={{ padding: "2px" }}
                                       label="---Select forma---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.forma}
                                    />
                                 )}
                              />
                           </Grid>

                           <Grid item xs={12}>
                              <Grid container item xs={12} spacing={2}>

                                 <Grid item xs={3}>
                                    <TextField
                                       required
                                       id="Species"
                                       name="species.english"
                                       margin="normal"
                                       size="small"
                                       label="English Name"
                                       fullWidth
                                       onChange={handleChange}
                                       autoComplete="English Name"
                                       variant="outlined"
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       required
                                       id="banglaName"
                                       name="species.bangla"
                                       margin="normal"
                                       size="small"
                                       label="Bangla Name"
                                       fullWidth
                                       onChange={handleChange}
                                       autoComplete="Bangla Name"
                                       variant="outlined"
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       required
                                       id="commonName"
                                       name="species.commonName"
                                       margin="normal"
                                       size="small"
                                       label="Common Name"
                                       fullWidth
                                       autoComplete="commonName"
                                       onChange={handleChange}
                                       variant="outlined"
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       required
                                       id="synonym"
                                       name="species.synonym"
                                       margin="normal"
                                       size="small"
                                       label="Synonym"
                                       fullWidth
                                       autoComplete="synonym"
                                       variant="outlined"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={12} sx={{ p: 2 }}>
                                   
                                 

                                    <Grid item xs={12}>
                                      
                                       <label htmlFor="contained-button-file">
                                          <Input
                                             id="contained-button-file"
                                             multiple
                                             name="additionalFiles"
                                             type="file"
                                             accept=".png, */png, .jpg, */jpg"
                                             error={Boolean(touched.file && errors.file)}
                                             helpertext={touched.file && errors.file}
                                             color="success"
                                             onChange={(e) => {
                                                for (let file of e.target.files) {
                                                   values.additionalFiles.push(file);
                                                }
                                                setFieldValue(
                                                   "additionalFiles",
                                                   values.additionalFiles
                                                );
                                                console.log(e.target.files);
                                                // setFileName(e.target.files[0].name);
                                             }}
                                          // onChange={(event, values) => {
                                          //   setFieldValue("file", event.currentTarget.files[0]);
                                          // }}
                                          />

                                          <div> </div>

                                         
                                       </label>
                                    </Grid>
                                 </Grid>
                                 {/* <Grid item xs={12}>
                                    <Typography gutterBottom component="h3" variant="div">
                                       Identification Features
                                    </Typography>
                                    {values?.categories.map((category, index) => {
                                       return (
                                          <>
                                             <TextField
                                                fullWidth
                                                autoFocus
                                                label={`Category Name ${index + 1}`}
                                                margin="normal"
                                                size="small"
                                                name="category.name"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => { }}
                                                // type="number"
                                                value={category.name || ""}
                                                variant="outlined"
                                             />
                                             <TextField
                                                fullWidth
                                                autoFocus
                                                label={`Category Data ${index}`}
                                                margin="normal"
                                                size="small"
                                                name="category.name"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => { }}
                                                // type="number"
                                                value={category.name || ""}
                                                variant="outlined"
                                             />
                                             <Divider />
                                          </>
                                       );
                                    })}
                                    <Button
                                       className={styles.bg_secondary}
                                       style={{
                                          width: "80px",
                                          maxHeight: "80px",
                                          minWidth: "200px",
                                          minHeight: "40px",
                                          marginBottom: "10px",
                                       }}
                                       onClick={(e) => {
                                          values.categories.push({
                                             name: "",
                                             data: "",
                                          });
                                          setFieldValue("categories", values.categories);
                                       }}
                                    >
                                       Add New Category
                                    </Button>
                                 </Grid> */}
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Physical Identification Details"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.physical"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Habitat"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.habitat"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Behavior"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.behavior"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Migration"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.migration"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Breeding Behavior"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.breeding"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Chromosome Number"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.chromosome"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Molecular Characteristic"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.molecular"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Notes"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.notes"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="World distribution"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.distribution"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="IUCN status"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.iucn"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Economic Importance"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.economic"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Medicinal use"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.medicinal"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Uses as Foods and Feeds"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures."
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="As pharmaceuticals"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.pharmaceuticals"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="As industrial product"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures."
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Other information"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.otherInfo"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Other uses"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.otherUses"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Ecological Indicator"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.ecologicalIndicator"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Exotic"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures."
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Crop / fruit / industrial products/ weed etc"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.typeOfSpecies"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Fruting time"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.fruitingTime"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Scientific Research Interest"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures."
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Health Resource"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures."
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Growing season"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.season"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Threats to the Species / Genus"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.threats"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Conservation status"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.conservation"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Measures taken"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.measures"
                                       onChange={handleChange}
                                    />
                                 </Grid>
                                 <Grid item xs={3}>
                                    <TextField
                                       label="Miscellaneous"
                                       multiline
                                       rows={3}
                                       margin="normal"
                                       size="small"
                                       placeholder="Type your Descripton here"
                                       variant="outlined"
                                       fullWidth
                                       required
                                       name="identificationFeatures.miscellaneous"
                                       onChange={handleChange}
                                    />
                                 </Grid>


                              </Grid>
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

export default Fungi;



