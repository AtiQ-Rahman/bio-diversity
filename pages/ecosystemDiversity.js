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
   Box,
   useMediaQuery,
   TableContainer,
   Paper,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Autocomplete,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi, { imageUrl } from "../utils/callApi";
import Image from "next/image";
import { imageLoader, initialValues, pageGroups, processNames } from "../utils/utils";
import { useRouter } from "next/router";
let imageProps = {
   height: "100px",
   width: "200px",
}
const EcosystemDiversity = () => {

   const [category, setCatgory] = React.useState()
   const [searchMessage, setSearchMessage] = React.useState('')
   const theme = useTheme();
   const [speciesList, setSpeciesList] = React.useState()
   const router = useRouter();
   const [allTypesOfSpecies, setAllTypesOfSpecies] = useState([])
   const [subGroups, setSubGroups] = useState([])
   const [subValues, setSubValues] = useState({})
   useEffect(() => {
      async function fetchData() {
         let allTypesOfSpecies = await callApi("/get-unique-types-of-species", {});
         console.log({ allTypesOfSpecies })
         setAllTypesOfSpecies(allTypesOfSpecies.data)

         setSubGroups(allTypesOfSpecies.data.subGroups)
         subValues.csequestrations = allTypesOfSpecies.data.cSequestrations ?? []
         subValues.cproductions = allTypesOfSpecies.data.cProductions ?? []
         subValues.ecosystemstatuss = allTypesOfSpecies.data.ecosystemStatuses ?? []
         subValues.ecosystemvalues = allTypesOfSpecies.data.ecosystemValues ?? []
         let response = await callApi("/get-categories-by-name", { name: pageGroups.eco });
         let localData = localStorage.getItem(pageGroups.eco.replaceAll(" ", ""))
         let isAllowed = localStorage.getItem(`allowed${pageGroups.eco.replaceAll(" ", "")}`)
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
            localStorage.removeItem(`allowed${pageGroups.eco.replaceAll(" ", "")}`)
         }
         else {
            localStorage.removeItem(pageGroups.eco.replaceAll(" ", ""))
         }
         if (response.data.length > 0) {
            console.log(response.data)
            setCatgory(response.data[0])
         }
         else {
            setCatgory({})
         }
      }
      fetchData()

   }, [router.pathname, router.query])
   // Handle left drawer
   return (
      <Box>

         {/* header */}

         <Header index={5} />


         {/* drawer */}


         {/* breadcrumb */}

         <Formik
            initialValues={initialValues}
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
                  values.category = 'Ecosystem Diversity'

                  let searchParameters = values;
                  localStorage.setItem(`${values.category.replaceAll(" ", '')}`, JSON.stringify(searchParameters))

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
                        sx={{ pt: 8 }}
                     >
                        Enter Your Details
                     </Typography>
                     <Grid container spacing={3}>
                        {category?.keyList?.length > 0 ?
                           category.keyList.map((category, index) => {
                              if (category.name.toLowerCase() !== 'description') {
                                 return (
                                    <>
                                       <Grid item xs={2} key={`keyList${index}`}>
                                          <Autocomplete
                                             freeSolo
                                             size="small"
                                             disablePortal
                                             id="subGroups"
                                             name={`${category.name.toLowerCase()}`}
                                             options={subValues[`${processNames(category.name)}s`]}
                                             key={`dropdowns${index}`}
                                             // value={values?.kingdom}
                                             getOptionLabel={(option) => option[`${processNames(category.name)}`] || option}
                                             value={values[`${processNames(category?.name)}`]}
                                             // sx={{ width: 300 }}
                                             onInputChange={(e, value) => {
                                                console.log({value})
                                                setFieldValue(`${processNames(category.name)}`, value);
                                             }}
                                             renderInput={(params) => (
                                                <TextField
                                                   {...params}
                                                   style={{ padding: "2px" }}
                                                   label={`${category.name}`}
                                                   variant="outlined"
                                                   placeholder="Select"
                                                   value={values[`${processNames(category?.name)}`]}
                                                />
                                             )}
                                          />
                                          {/* <TextField
                                             id={`${category.name + index}`}
                                             name={`${category.name.toLowerCase()}`}
                                             // margin="normal"
                                             size="small"
                                             label={`${category.name}`}
                                             type="deseription"
                                             fullWidth
                                             variant="outlined"
                                          /> */}
                                       </Grid>
                                    </>
                                 )
                              }

                           })
                           : null}

                     </Grid>
                     <Grid container spacing={2}>
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
         <Grid container sx={{ borderRadius: "10px", px: 10 }} >
            <Grid item xs={12}>
               {speciesList?.length > 0 ? (
                  <><Typography variant="h2" component="h2" align="center" gutterBottom>
                     Total Species Found : {speciesList.length}
                  </Typography>
                     <TableContainer component={Paper}    >
                        <Table sx={{ minWidth: 650 }} aria-label="customized table" >
                           <TableHead>
                              <TableRow>
                                 <TableCell>SI</TableCell>
                                 <TableCell></TableCell>
                                 <TableCell align="center">Species Name</TableCell>
                                 <TableCell align="center">Descripton</TableCell>
                                 <TableCell align="center">Family</TableCell>
                                 <TableCell align="center">C-Production</TableCell>
                                 <TableCell align="center">Lng/Lat</TableCell>
                                 <TableCell align="center">Action</TableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody   >
                              {speciesList.map((row, index) => (
                                 <TableRow
                                    key={`list${row.index}`}
                                    sx={{
                                       "&:last-child td, &:last-child th": { border: 0 },
                                    }}

                                 >
                                    <TableCell component="th" scope="row">
                                       {index + 1}
                                    </TableCell>
                                    <TableCell component="td" scope="row" width={200}>
                                       <Image {...imageProps} objectFit="cover"
                                          alt="Profile Image"
                                          loader={imageLoader} src={imageUrl + '/' + row.profile_image}></Image>
                                    </TableCell>
                                    <TableCell align="center">
                                       {row.name.commonName}
                                    </TableCell>
                                    <TableCell align="center">{row.identificationFeatures.description}</TableCell>

                                    <TableCell align="center">{row.family}</TableCell>
                                    <TableCell align="center">{row.production}</TableCell>
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
                                                      category: pageGroups.eco,
                                                      initial: false
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
                                                      category: pageGroups.eco,
                                                      initial: false
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
                     </TableContainer></>
               ) : <Typography variant="h1" component="h1" align="center">
                  {searchMessage ?? ''}
               </Typography>}
            </Grid>
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
         <Footer style={{ padding: "120px" }} />
      </Box>
   );
};

export default EcosystemDiversity;



