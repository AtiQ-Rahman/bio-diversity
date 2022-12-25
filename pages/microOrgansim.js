import React, { useState, useEffect } from "react";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import { useRouter } from "next/router";
import Loader2 from "../components/Loader2";
import {
   Typography,
   Grid,
   TextField,
   Button,
   Box,
   useMediaQuery,
   Autocomplete,
   TableRow,
   TableCell,
   TableBody,
   tableCellClasses
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { drawerWidth } from "../store/constant";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi, { imageUrl } from "../utils/callApi";
import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
import { initialValues, pageGroups } from "../utils/utils";

// import { kingdoms } from "../utils/kingdoms";
const MicroOrgansim = () => {
   const [category, setCatgory] = React.useState();
   const [loading, setLoading] = React.useState(false);
   const theme = useTheme();
   const [searchMessage, setSearchMessage] = React.useState('')
   const [speciesList, setSpeciesList] = React.useState()
   const router = useRouter();
   const [searchValues, setSearchValues] = React.useState(null)

   useEffect(() => {
      async function fetchData() {
         let localData = localStorage.getItem(pageGroups.micro)
         let isAllowed = localStorage.getItem(`allowed${pageGroups.micro}`)
         console.log(router.query, localData)
         // if (router?.query?.initial) {
         //   localStorage.removeItem(category)
         // }
         if (localData && isAllowed) {
            let searchParameters = JSON.parse(localData)
            let res = await callApi("/search-species-by-field", {
               searchParameters,
            });
            setLoading(false)
            console.log("response", res);
            setSearchValues(searchParameters)
            setSpeciesList(res?.data);
            localStorage.removeItem(`allowed${pageGroups.micro}`)
         }
         else {
            setSearchValues(initialValues)
            localStorage.removeItem(pageGroups.micro)
         }
      }
      fetchData()
   }, [router.pathname, router.query])
   // Handle left drawer
   const leftDrawerOpened = useSelector((state) => state.customization.opened);
   const dispatch = useDispatch();
   return (
      <Box>

         {/* header */}

         <Header index={4} />


         {/* drawer */}


         {/* breadcrumb */}
         {searchValues ? (
            <Formik
               initialValues={searchValues}
               validationSchema={Yup.object().shape({
                  // species: Yup.object().shape({
                  //    english: Yup.string().required(
                  //       "Patient english name is required"
                  //    ),
                  //    bangla: Yup.string().required("patient bangla is required"),
                  //    commonName: Yup.string().required("patient commonName is required"),
                  //    synonym: Yup.string().required("patient commonName is required"),

                  //    // gender: Yup.string().required("patient gender is required"),
                  //    // address: Yup.string().required("patient adressis required"),
                  // }),
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
                     setLoading(true)
                     values.category = 'Microorganisms'

                     let searchParameters = values;
                     localStorage.setItem(`${values.category}`, JSON.stringify(searchParameters))

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
                     setLoading(false)
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
                           sx={{ pt: 12,pb:5 }}
                        >
                           Enter Your Details
                        </Typography>
                        <Grid container spacing={3}>
                           <CommonDropDowns values={values} setFieldValue={setFieldValue} touched={touched} handleChange={handleChange} errors={errors} category={pageGroups.micro}></CommonDropDowns>
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
         ) :  (
            <Loader2 size={50}></Loader2>
          )}

         <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={6} >
            <Grid item xs={12}>
            {loading ? (
        <Loader2 size={50}></Loader2>
      ) : null}
               {speciesList?.length > 0 ? (
                  <TableData speciesList={speciesList} category={pageGroups.micro}></TableData>
               ) : <Typography variant="h1" component="h1" align="center" paddingBottom={20} paddingTop={10}>
                  {searchMessage ?? ''}
               </Typography>}
            </Grid>

         </Grid>
         <Footer />
      </Box>
   );
};

export default MicroOrgansim;



