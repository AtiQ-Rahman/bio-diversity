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
import { imageLoader } from "../utils/utils";
import Image from "next/image";
import { useRouter } from "next/router";

let imageProps = {
   height: "100px",
   width: "200px",
}
const GeneticSubCellularDiversity = () => {
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
      animal: "",
      class: "",
      order: "",
      fungi: "",
      family: "",
      genus: "",
      species: "",
      plants: "",
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
      let response = await callApi('/get-categories-by-name', { name: 'Genetic & Sub-Cellular Diversity' })
      if (response.data.length > 0) {
         console.log(response.data)
         setCatgory(response.data[0])
      }
      else {
         setCatgory({})
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

         <Header index={6} />


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
                  values.category = 'Genetic & Sub-Cellular Diversity'

                  let searchParameters = values;
                  // console.log({ loggedUser: loggedUser.userId });
                  // data.append("reportfile", values.reportfile);
                  let res = await callApi("/search-species-by-field", { searchParameters })
                  console.log("response", res);
                  setSpeciesList(res?.data)
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
                        {category?.keyList?.length > 0 ?
                           category.keyList.map((category, index) => {
                              return (
                                 <>
                                    <Grid item xs={2} key={`keyList${index}`}>
                                       <TextField
                                          id={`${category.name + index}`}
                                          name={`${category.name.toLowerCase()}`}
                                          // margin="normal"
                                          size="small"
                                          label={`${category.name}`}
                                          type="deseription"
                                          fullWidth
                                          variant="outlined"
                                       />
                                    </Grid>
                                 </>
                              )
                           })
                           : null}



                     </Grid>
                     <Grid item xs={3}>
                        <TextField

                           id="Species"
                           name="nameOfSpecies.english"
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

                           id="banglaName"
                           name="nameOfSpecies.bangla"
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

                           id="commonName"
                           name="nameOfSpecies.commonName"
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

                           id="synonym"
                           name="nameOfSpecies.synonym"
                           margin="normal"
                           size="small"
                           label="Synonym"
                           fullWidth
                           autoComplete="synonym"
                           variant="outlined"
                           onChange={handleChange}
                        />
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
         <Grid item xs={12} style={{ borderRadius: "10px", paddingBottom: "100px" }} >
            {speciesList?.length > 0 ? (
               <TableContainer component={Paper}    >
                  <Table sx={{ minWidth: 650 }} aria-label="customized table" >
                     <TableHead>
                        <TableRow>
                           <TableCell>SI</TableCell>
                           <TableCell align="center">Species Name</TableCell>
                           <TableCell align="center">Type</TableCell>
                           <TableCell align="center">Family</TableCell>
                           <TableCell align="center">Order name</TableCell>
                           <TableCell align="center">Lng/Lat</TableCell>
                           <TableCell align="center">Action</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody   >
                        {speciesList.map((row, index) => (
                           <TableRow
                              key={row.index}
                              sx={{
                                 "&:last-child td, &:last-child th": { border: 0 },
                              }}

                           >
                              <TableCell component="th" scope="row">
                                 {index + 1}
                              </TableCell>
                              <TableCell align="center">
                                 {row.profile_image ? (
                                    <Grid container sx={{ justifyContent: "center" }}>
                                       <Grid item xs={4}>
                                          <Image {...imageProps} objectFit="cover" loader={imageLoader} src={imageUrl + '/' + row.profile_image}></Image>
                                       </Grid>
                                       <Grid item xs={8}>
                                          {row.name.bangla}

                                       </Grid>
                                    </Grid>) : (
                                    row.name.bangla
                                 )}

                              </TableCell>
                              <TableCell align="center">{row.identificationFeatures.description}</TableCell>

                              <TableCell align="center">{row.family}</TableCell>
                              <TableCell align="center">{row.cProduction}</TableCell>
                              <TableCell align="center">{row.lng} ,{row.lat}</TableCell>
                              <TableCell align="center">
                                 <Grid container spacing={1} width={100}>
                                    <Grid item xs={12}>
                                       <Button
                                          style={{
                                             width: "130px",
                                             maxHeight: "80px",
                                             minWidth: "40px",
                                             minHeight: "40px"
                                          }}
                                          type="button"
                                          onClick={() => router.push({
                                             pathname: "/details",
                                             query: {
                                                serial: row.serial,
                                                category: 'Genetic & Sub-Cellular Diversity'
                                             }
                                          })}
                                          variant="outlined"
                                       >
                                          View Details
                                       </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                       <Button
                                          className={styles.bg_primary}
                                          style={{
                                             width: "130px",
                                             maxHeight: "80px",
                                             minWidth: "40px",
                                             minHeight: "40px",
                                             color: "white"
                                          }}
                                          type="button"
                                          onClick={() => router.push({
                                             pathname: "/map",
                                             query: {
                                                serial: row.serial,
                                                category: 'Genetic & Sub-Cellular Diversity'
                                             }
                                          })}
                                       // variant="outlined"
                                       >
                                          View on map
                                       </Button>
                                    </Grid>

                                 </Grid>

                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </TableContainer>
            ) : null}
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
         <Footer style={{ padding: "100px" }} />
      </Box>
   );
};

export default GeneticSubCellularDiversity;



