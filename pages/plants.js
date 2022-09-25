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
// import { kingdoms } from "../utils/kingdoms";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");
const plants = require("../utils/plants");
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
const Plants = () => {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);
   const theme = useTheme();
   const [categoryList, setCatgoryList] = React.useState()
   const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
   const initialValues = {
      serial: "",
      kingdom: "",
      phylum: "",
      class: "",
      order: "",
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
   return (
      <Box height={800}>
        
         {/* header */}
     
         <Header index={1} />
    

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
                                 id="plants"
                                 name={values?.plant}
                                 options={plants}
                                 key="plants"
                                 getOptionLabel={(option) => option.name}
                                 // sx={{ width: 300 }}
                                 onChange={(e, value) => {
                                    setFieldValue("plant", value);
                                 }}
                                 renderInput={(params) => (
                                    <TextField
                                       {...params}
                                       error={Boolean(touched?.plant && errors?.plant)}
                                       helperText={touched?.plant && errors?.plant}
                                       style={{ padding: "2px" }}
                                       label="---Select plants---"
                                       variant="outlined"
                                       placeholder="Select"
                                       value={values?.plant}
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
                                 {/* <Grid item xs={12}>
                                    <Grid container xs={12} spacing={2}>
                                       <Grid item xs={2}>
                                          <Autocomplete
                                             size="small"
                                             disablePortal
                                             id="species"
                                             name={values?.category}
                                             options={categoryList}
                                             key=""
                                             getOptionLabel={(option) => option.name}
                                             // sx={{ width: 300 }}
                                             onChange={(e, value) => {
                                                setFieldValue("category", value);
                                             }}
                                             renderInput={(params) => (
                                                <TextField
                                                   {...params}
                                                   error={Boolean(touched?.category && errors?.category)}
                                                   helperText={touched?.category && errors?.category}
                                                   style={{ padding: "2px" }}
                                                   label="Select Category"
                                                   variant="outlined"
                                                   placeholder="Select"
                                                   value={values?.category}
                                                />
                                             )}
                                          />
                                       </Grid>
                                       {values?.category?.type === 'Dropdown' ? (
                                          <Grid item xs={2}>
                                             <Autocomplete
                                                size="small"
                                                disablePortal
                                                id="species"
                                                name={values?.identificationFeatures?.subCategory}
                                                options={values?.category.keyList}
                                                isOptionEqualToValue={(option, value) => option.key === value.key}
                                                getOptionLabel={(option) => option.name}
                                                // sx={{ width: 300 }}
                                                onChange={(e, value) => {
                                                   setFieldValue("identificationFeatures.subCategory", value);
                                                }}
                                                renderInput={(params) => (
                                                   <TextField
                                                      {...params}
                                                      error={Boolean(touched?.identificationFeatures?.subCategory && errors?.identificationFeatures?.subCategory)}
                                                      helperText={touched?.identificationFeatures?.subCategory && errors?.identificationFeatures?.subCategory}
                                                      style={{ padding: "2px" }}
                                                      label="Select Sub Category"
                                                      variant="outlined"
                                                      placeholder="Select"
                                                      value={values?.category}
                                                   />
                                                )}
                                             />
                                          </Grid>
                                       ) :
                                          values?.category?.keyList?.map((item, index) => {
                                             return (
                                                <Grid item xs={2}>
                                                   <TextField
                                                      required
                                                      id={`key${index}`}
                                                      key={`key${index}`}
                                                      name={`identificationFeatures.${item.key}`}
                                                      // margin="normal"
                                                      size="small"
                                                      label={item.name}
                                                      fullWidth
                                                      onChange={handleChange}
                                                      autoComplete={item.name}
                                                      variant="outlined"
                                                   />
                                                </Grid>
                                             )
                                          })}
                                    </Grid>
                                 </Grid> */}

                        


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
            {/* <Footer  style={{ padding: "100px" }} /> */}
      </Box>
   );
};

export default Plants;


// import React from "react";
// import styles from "../styles/Home.module.css";
// import { styled } from "@mui/material/styles";
// import { useRouter } from "next/router";
// import CloseIcon from "@mui/icons-material/Close";
// import PropTypes from "prop-types";
// const imageSrc = require("../assets/images/species1.jpg");

// import {
//   AppBar,
//   Box,
//   CssBaseline,
//   Toolbar,
//   Container,
//   useMediaQuery,
//   Grid,
//   Typography,
//   TextField,
//   TableCell,
//   TableRow,
//   TableBody,
//   TableHead,
//   Table,
//   TableContainer,
//   Button,
//   Modal,
//   Divider,
//   Card,
//   CardActions,
//   CardContent,
//   tableCellClasses,
//   TablePagination,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Autocomplete,
//   Dialog,
// } from "@mui/material";
// import Header from "../components/Home/Header";
// import CollapseCard from "../components/Home/collapseCard";
// import SearchSection from "../components/Home/Header/SearchSection";
// import Paper from "@mui/material/Paper";
// import { Link, Router } from "react-router-dom";
// import Image from "next/image";
// import Footer from "../components/Home/Footer/Footer";
// import Counters from "../components/Home/counters";
// import { fontSize, fontWeight, height } from "@mui/system";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import listOfSpecies from "../utils/speciesList";
// import callApi from "../utils/callApi";
// import DetailsDialog from "../components/DetailsDialog";
// const kingdoms = require("../utils/kingdoms");
// const phylums = require("../utils/kingdoms");
// const classes = require("../utils/kingdoms");
// const orders = require("../utils/kingdoms");
// const families = require("../utils/kingdoms");
// const plants = require("../utils/plants");
// const species = require("../utils/kingdoms");

// const initialValues = {
//   kingdom: "",
//   phylum: "",
//   class: "",
//   order: "",
//   family: "",
//   plant: "",
// };
// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// const BootstrapDialogTitle = (props) => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 8,
//             top: 8,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

// function createData(
//   number,
//   imageSrc,
//   Species,
//   description,
//   Family,
//   Locality,
//   Habitat,
//   Size,
//   lat,
//   lng
// ) {
//   return {
//     number,
//     imageSrc,
//     Species,
//     description,
//     Family,
//     Locality,
//     Habitat,
//     Size,
//     lat,
//     lng,
//   };
// }
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 20,
//   },
// }));
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Species = () => {
//   // const classes = useStyles();
//   const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);
//   const [rows, setRows] = useState([]);
//   useEffect(() => {
//     getAllSpeciesList();
//   }, []);
//   const router = useRouter();
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const getAllSpeciesList = async () => {
//     let searchParameters = {
//       name: "test",
//     };
//     // const speciesList = await callApi("/get-species-list", searchParameters);
//     const speciesList = listOfSpecies;
//     let list = [];
//     console.log(speciesList);
//     speciesList?.map((species, index) => {
//       list.push(
//         createData(
//           index,
//           species.imageSrc,
//           species.title,
//           species.description,
//           "Bryopsidaceae",
//           "St Martin’s Island (SMI)",
//           "rocks, corals",
//           "2-3",
//           20.62299,
//           92.320325
//         )
//       );
//       if (index == speciesList.length - 1) {
//         console.log("working");
//         setRows(list);
//       }
//     });
//   };
//   return (
//     <div className={styles.body}>
//       <Header index={1} />

//       <div className={styles.main}>
//         <Box component="section" className={styles.main_box}>
//           {/* Species Search */}
//           <Grid container item xs={12} md={12} sx={{ mx: "auto", mt: 10 }}>
//             <Grid item xs={12} md={12}>
//               <Card sx={{ marginBottom: "10px" }}>
//                 <Typography
//                   gutterBottom
//                   component="h2"
//                   variant="h2"
//                   style={{ color: "#c44d34", fontSize: 30 }}
//                 >
//                   Species Search
//                 </Typography>
//                 <Typography
//                   gutterBottom
//                   component="description"
//                   variant="div"
//                   style={{ fontSize: 20, color: "black" }}
//                 >
//                   The full name of the genus or species can be inserted, or you
//                   can type the first four letters of the generic name and/or the
//                   first four letters <br /> of the species (or other) epithet in
//                   upper or lower case (e.g. Mere micr or mere micr for
//                   Meredithia microphylla). A full list of the species <br /> and
//                   subspecific entities in each genus can be obtained in the
//                   genus database.
//                 </Typography>
//               </Card>

//               <Grid item xs={12} style={{ borderRadius: "5px", marginTop: 15 }}>
//                 <Formik
//                   initialValues={initialValues}
//                   validationSchema={Yup.object().shape({
//                     species: Yup.object().shape({
//                       english: Yup.string().required(
//                         "Patient english name is required"
//                       ),
//                       bangla: Yup.string().required(
//                         "patient bangla is required"
//                       ),

//                       // gender: Yup.string().required("patient gender is required"),
//                       // address: Yup.string().required("patient adressis required"),
//                     }),

//                     kingdom: Yup.string("Add Remarks").required("Add Remark"),
//                     phylum: Yup.string("Add filmType").required("Add filmType"),
//                     class: Yup.string("Add priority").required("Add priority"),
//                     order: Yup.string("Add priority").required("Add priority"),
//                     plant: Yup.string("Add priority").required("Add priority"),
//                   })}
//                   onSubmit={async (
//                     values,
//                     {
//                       resetForm,
//                       setErrors,
//                       setStatus,
//                       setSubmitting,
//                       setFieldValue,
//                     }
//                   ) => {
//                     try {
//                       // console.log({ values });
//                       // // console.log(values.reportfile.name);
//                       // let xrayData = values;
//                       // xrayData.createdBy = {
//                       //   name: loggedUser.name,
//                       //   userId: loggedUser.userId,
//                       // };
//                       // xrayData.createdAt = new Date().getTime();
//                       // console.log({ loggedUser: loggedUser.userId });
//                       // const data = new FormData();
//                       // data.append("data", JSON.stringify(xrayData));
//                       // let files = values.reportfile;
//                       // if (files.length != 0) {
//                       //   for (const single_file of files) {
//                       //     data.append('reportfile', single_file)
//                       //   }
//                       // }
//                       // // data.append("reportfile", values.reportfile);
//                       // callApi.post("/xray/new", data, {
//                       //   headers: {
//                       //     "Content-Type": "multipart/form-data"
//                       //   }
//                       // }).then((res) => {\
//                       //   console.log("response", res);
//                       //   enqueueSnackbar("Report  Uploaded Successfully", {
//                       //     variant: "success",
//                       //     // action: <Button>See all</Button>
//                       //   });
//                       //   setErrors(false);
//                       // });
//                     } catch (error) {
//                       console.log({ error });

//                       setStatus({ success: false });
//                       setErrors({ submit: error.message });
//                       setSubmitting(false);
//                     }
//                   }}
//                 >
//                   {({
//                     errors,
//                     handleBlur,
//                     handleChange,
//                     handleSubmit,
//                     isSubmitting,
//                     touched,
//                     values,
//                     setFieldValue,
//                   }) => (
//                     <Form onSubmit={handleSubmit}>
//                       <Grid container xs={8} spacing={2}>
//                         <Grid item xs={2}>
//                           <Autocomplete
//                             size="small"
//                             disablePortal
//                             id="plants"
//                             name={values?.plant}
//                             options={plants}
//                             key="plants"
//                             getOptionLabel={(option) => option.name}
//                             // sx={{ width: 300 }}
//                             onChange={(e, value) => {
//                               setFieldValue("plant", value);
//                             }}
//                             renderInput={(params) => (
//                               <TextField
//                                 {...params}
//                                 error={Boolean(
//                                   touched?.plant && errors?.plant
//                                 )}
//                                 helperText={touched?.plant && errors?.plant}
//                                 style={{ padding: "2px" }}
//                                 label="---Select plant---"
//                                 variant="outlined"
//                                 placeholder="Select"
//                                 value={values?.plant}
//                               />
//                             )}
//                           />
//                         </Grid>
//                         {/* <Grid item xs={2}>
//                           <Autocomplete
//                             size="small"
//                             disablePortal
//                             id="kingdoms"
//                             name={values?.kingdom}
//                             options={kingdoms}
//                             key="kingdoms"
//                             getOptionLabel={(option) => option.name}
//                             // sx={{ width: 300 }}
//                             onChange={(e, value) => {
//                               setFieldValue("kingdom", value);
//                             }}
//                             renderInput={(params) => (
//                               <TextField
//                                 {...params}
//                                 error={Boolean(
//                                   touched?.species && errors?.species
//                                 )}
//                                 helperText={
//                                   touched?.species && errors?.species
//                                 }
//                                 style={{ padding: "2px" }}
//                                 label="---Select Species---"
//                                 variant="outlined"
//                                 placeholder="Select"
//                                 value={values?.kingdom}
//                               />
//                             )}
//                           />
//                         </Grid> */}
//                         <Grid item xs={2}>
//                           <TextField
//                             size="small"
//                             error={Boolean(
//                               touched?.commonName && errors?.commonName
//                             )}
//                             helperText={
//                               touched?.commonName && errors?.commonName
//                             }
//                             label="Common Name"
//                             variant="outlined"
//                             placeholder="Select"
//                             value={values?.commonName}
//                           />
//                         </Grid>
//                         {/* <Grid item xs={2}>
//                           <TextField
//                             size="small"
//                             error={Boolean(
//                               touched?.taxonomy && errors?.taxonomy
//                             )}
//                             helperText={
//                               touched?.taxonomy && errors?.taxonomy
//                             }
//                             label="Higher Taxonomy"
//                             variant="outlined"
//                             placeholder="Select"
//                             value={values?.taxonomy}
//                           />
//                         </Grid> */}
//                         {/* <Grid item xs={2}>
//                           <TextField
//                             size="small"
//                             error={Boolean(
//                               touched?.distribution && errors?.distribution
//                             )}
//                             helperText={
//                               touched?.distribution && errors?.distribution
//                             }
//                             label="Distribution"
//                             variant="outlined"
//                             placeholder="Select"
//                             value={values?.distribution}
//                           />
//                         </Grid> */}
//                         <Grid item xs={2}>
//                           <Button
//                             className={styles.bg_primary}
//                             style={{
//                               width: "80px",
//                               maxHeight: "80px",
//                               minWidth: "40px",
//                               minHeight: "40px",
//                               color: "white",
//                               boxShadow: "1px 1px 4px grey",
//                               marginBottom: "10px",
//                             }}
//                           >
//                             Search
//                           </Button>
//                         </Grid>
//                       </Grid>

//                       <br />
//                     </Form>
//                   )}
//                 </Formik>
//               </Grid>

//               {/* TABLE */}
//               {/* <Divider></Divider> */}

//               {/* <h1>Total Species Found (5)</h1>
//               <br /> */}
//               {/* <Grid
//                 item
//                 xs={12}
//                 sx={{ b: 1, mb: 3 }}
//                 style={{ borderRadius: "10px" }}
//               >
//                 <TableContainer component={Paper}>
//                   <Table sx={{ minWidth: 650 }} aria-label="customized table">
                  
//                     <TableBody>
//                       {rows.map((row) => (
//                         <StyledTableRow
//                           key={row.name}
//                           sx={{
//                             "&:last-child td, &:last-child th": { border: 0 },
//                           }}
//                         >
//                           <StyledTableCell
//                             component="th"
//                             scope="row"
//                             className={styles.textContainer}
//                           >
//                             {row.number}
//                           </StyledTableCell>
//                           <StyledTableCell component="th">
//                             <Image
//                               src={imageSrc}
//                               height={100}
//                               width={150}
//                               sx={{ borderRadius: 10 }}
//                             ></Image>
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             <Typography component="h3" variant="h3">
//                               {row.Species}
//                             </Typography>
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             {row.Family}
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             {row.Locality}
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             {row.Habitat}
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             {row.Size}
//                           </StyledTableCell>
//                           <StyledTableCell
//                             align="center"
//                             className={styles.textContainer}
//                           >
//                             {row.GIS}
//                           </StyledTableCell>
//                           <StyledTableCell align="center">
//                             <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
//                               <Button
//                                 className={styles.bg_primary}
//                                 style={{
//                                   width: "80px",
//                                   maxHeight: "80px",
//                                   minWidth: "40px",
//                                   minHeight: "40px",
//                                   color: "white",
//                                   boxShadow: "1px 1px 4px grey",
//                                 }}
//                                 onClick={handleClickOpen}
//                                 sx={{ mb: 1, mr: 0.5 }}
//                               // variant="outlined"
//                               >
//                                 Details
//                               </Button>

                            

//                               <br />
//                               <Button
//                                 style={{
//                                   boxShadow: "1px 1px 4px grey",
//                                   maxHeight: "80px",
//                                   width: "80px",
//                                   background: "white",
//                                   minHeight: "40px",
//                                   color: "#0f4c39",
//                                 }}
//                                 type="button"
//                                 onClick={() =>
//                                   router.push({ pathname: "/map", query: row })
//                                 }
//                               >
//                                 View&nbsp;map
//                               </Button>
//                             </Box>
//                           </StyledTableCell>
//                         </StyledTableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
              
//               </Grid>  */}
//             </Grid>
//           </Grid>
//         </Box>
//       </div>

//       <DetailsDialog open={open} handleClose={handleClose}></DetailsDialog>
//       <Footer  style={{ padding: "100px" }} />
//     </div>
//   );
// };

// export default Species;
