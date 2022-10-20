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
   tableCellClasses,
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
import { imageLoader, pageGroups } from "../utils/utils";
import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
const Animals = () => {
   const [category, setCatgory] = React.useState()
   const theme = useTheme();
   const [searchMessage, setSearchMessage] = React.useState('')
   const [speciesList, setSpeciesList] = React.useState()
   const initialValues = {
      kingdom: null,
      phylum: null,
      class_name: null,
      order_name: null,
      family: null,
      genus: null,
      species: null,
      plants: null,
      subSpecies: null,
      variety: null,
      subVariety: null,
      clone: null,
      forma: null,
      type: null,
      nameOfSpecies: {
         bangla: null,
         english: null,
         commonName: null,
         synonym: null
      },
      identificationFeatures: {},
      categories: [],
      additionalFiles: [],
      profileImage: null,
   };
   async function fetchData() {
      let response = await callApi("/get-categories-by-name", { name: pageGroups.animals });
      let localData = localStorage.getItem(pageGroups.animals)
      let isAllowed = localStorage.getItem(`allowed${pageGroups.animals}`)
      console.log(router.query, localData)
      // if (router?.query?.initial) {
      //   localStorage.removeItem(category)
      // }
      if (localData && isAllowed) {
        let searchParameters = JSON.parse(localData)
        let res = await callApi("/search-species-by-field", {
          searchParameters,
        });
        console.log("response", res);
        setSpeciesList(res?.data);
        localStorage.removeItem(`allowed${pageGroups.animals}`)
      }
      else {
        localStorage.removeItem(pageGroups.animals)
      }
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

   const router = useRouter();
   return (
      <Box>

         {/* header */}

         <Header index={2} />


         {/* drawer */}


         {/* breadcrumb */}

         <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({

            })}
            onSubmit={async (
               values,
               { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
            ) => {
               try {
                  console.log({ values });
                  values.category = 'Animals'

                  let searchParameters = values;
                  // console.log({ loggedUser: loggedUser.userId });
                  // data.append("reportfile", values.reportfile);
                  let res = await callApi("/search-species-by-field", { searchParameters })
                  console.log("response", res);
                  setSpeciesList(res?.data)
                  setSearchMessage(res?.message)
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
                           <Autocomplete
                              size="small"
                              disablePortal
                              id="animals"
                              name={values?.type}
                              options={category?.keyList || []}
                              key="animals"
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
                                    label="animals"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.type}
                                 />
                              )}
                           />
                        </Grid>

                        <CommonDropDowns values={values} setFieldValue={setFieldValue} touched={touched} handleChange={handleChange} errors={errors}></CommonDropDowns>

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
         <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={15}>
            <Grid item xs={12}>
               {speciesList?.length > 0 ? (
                  <TableData speciesList={speciesList} category={pageGroups.animals}></TableData>
               ) : <Typography variant="h1" component="h1" align="center" padding={25}>
                  {searchMessage ?? ''}
               </Typography>}
            </Grid>
         </Grid>
         <Footer />
      </Box>
   );
};

export default Animals;



