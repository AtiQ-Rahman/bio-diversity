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
   TablePagination,
   tableCellClasses,
} from "@mui/material";
// import ImageUpload from "./ImageUpload";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi, { imageUrl } from "../utils/callApi";
import { imageLoader, initialValues, pageGroups, processNames } from "../utils/utils";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import Loader2 from "../components/loader2";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#c44d34",
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
      fontFamily: "Times New Roman"
   },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));
let imageProps = {
   height: "100px",
   width: "200px",
}
const GeneticSubCellularDiversity = () => {
   const [loading, setLoading] = React.useState(false);
   const [category, setCatgory] = React.useState()
   const [searchMessage, setSearchMessage] = React.useState('')
   const theme = useTheme();
   const [speciesList, setSpeciesList] = React.useState()
   const router = useRouter();
   const [allTypesOfSpecies, setAllTypesOfSpecies] = useState([])
   const [subGroups, setSubGroups] = useState([])
   const [subValues, setSubValues] = useState({})
   const [searchValues, setSearchValues] = React.useState(null)
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(+event.target.value);
     setPage(0);
   };
   useEffect(() => {
      async function fetchData() {
         let allTypesOfSpecies = await callApi("/get-unique-types-of-species", { category: pageGroups.genetic });
         console.log({ allTypesOfSpecies })
         setAllTypesOfSpecies(allTypesOfSpecies.data)
         setSubGroups(allTypesOfSpecies.data.subGroups)
         subValues.geneticdatas = allTypesOfSpecies.data.genticdatas ? allTypesOfSpecies.data.geneticdatas : []
         subValues.speciestaxas = allTypesOfSpecies.data.speciestaxas ? allTypesOfSpecies.data.speciestaxas : []
         let response = await callApi("/get-categories-by-name", { name: pageGroups.genetic });
         let localData = localStorage.getItem(pageGroups.genetic)
         let isAllowed = localStorage.getItem(`allowed${pageGroups.genetic}`)
         console.log(router.query, localData)
         // if (router?.query?.initial) {
         //   localStorage.removeItem(category)
         // }
         if (localData && isAllowed) {
            let searchParameters = JSON.parse(localData)
            let res = await callApi("/search-species-by-field", {
               searchParameters,
            });
            setLoading(false);
            console.log("response", res);
            setSearchValues(searchParameters)
            setSpeciesList(res?.data);
            localStorage.removeItem(`allowed${pageGroups.genetic}`)
         }
         else {
            setSearchValues(initialValues)
            localStorage.removeItem(pageGroups.genetic)
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
   return (
      <Box>

         {/* header */}

         <Header index={6} />


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
                     setLoading(true)
                     // console.log(values.reportfile.name);
                     values.category = 'Genetic & Sub-Cellular Diversity'

                     let searchParameters = values;
                     localStorage.setItem(`${values.category.replaceAll(" ", '')}`, JSON.stringify(searchParameters))
                     // console.log({ loggedUser: loggedUser.userId });
                     // data.append("reportfile", values.reportfile);
                     let res = await callApi("/search-species-by-field", { searchParameters })
                     console.log("response", res);
                     setSpeciesList(res?.data);
                     setSearchMessage(res?.message);
                     setLoading(false);
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
                        <br></br>
                        <Grid container spacing={3}>
                           {category?.keyList?.length > 0 ?
                              category.keyList.map((category, index) => {
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
                                                console.log({ value })
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
         ) : null}

         <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={7}>
            <Grid item xs={12} >
            {loading ? (
        <Loader2 size={50}></Loader2>
      ) : null}
               {speciesList?.length > 0 ? (
                  <>
                     <Typography variant="h2" component="h2" align="center" gutterBottom>
                        Total Species Found : {speciesList.length}
                     </Typography>
                     <br />
                     <TableContainer component={Paper}    >
                        <Table sx={{ minWidth: 650 }} aria-label="customized table" >
                           <TableHead>
                              <TableRow>
                                 <StyledTableCell><b>SI</b></StyledTableCell>
                                 <StyledTableCell><b>Image</b></StyledTableCell>
                                 <StyledTableCell align="center"><b>Species Name</b></StyledTableCell>
                                 <StyledTableCell align="center"><b>Type</b></StyledTableCell>
                                 <StyledTableCell align="center"><b>Family</b></StyledTableCell>
                                 <StyledTableCell align="center"><b>Action</b></StyledTableCell>
                              </TableRow>
                           </TableHead>
                           <TableBody   >
                              {speciesList.map((row, index) => (
                                 <StyledTableRow
                                    key={row.index}
                                    sx={{
                                       "&:last-child td, &:last-child th": { border: 0 },
                                    }}

                                 >
                                    <StyledTableCell component="th" scope="row">
                                       {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell component="td" scope="row" width={200}>
                                       <Image {...imageProps} objectFit="cover" loader={imageLoader}
                                          alt="Profile Image"
                                          src={imageUrl + '/' + row.profile_image}></Image>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                       {row.bangla}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.identificationFeatures.description}</StyledTableCell>

                                    <StyledTableCell align="center">{row.family}</StyledTableCell>
                                    <StyledTableCell sx={{ pl: 10 }} align="center">
                                       <Grid container spacing={1} >

                                          <Button

                                             style={{
                                                width: "110px",
                                                maxHeight: "80px",
                                                minWidth: "40px",
                                                minHeight: "40px",

                                             }}
                                             type="button"
                                             onClick={() => router.push({
                                                pathname: "/details",
                                                query: {
                                                   serial: row.serial,
                                                   category: pageGroups.genetic,
                                                   initial: false
                                                }
                                             })}
                                             variant="outlined"
                                          >
                                             View Details
                                          </Button>


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
                                                   category: pageGroups.genetic,
                                                   initial: false
                                                }
                                             })}
                                             // variant="outlined"
                                             sx={{ ml: 1 }}
                                          >
                                             View  map
                                          </Button>

                                       </Grid>


                                    </StyledTableCell>
                                 </StyledTableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                     <TablePagination
                        rowsPerPageOptions={[100, 50]}
                        component="div"
                        count={speciesList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                     </>
               ) : <Typography variant="h1" component="h1" align="center" paddingBottom={20} paddingTop={10}>
                  {searchMessage ?? ''}
               </Typography>}
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
         </Grid>

         <Footer style={{ padding: "100px" }} />
      </Box>
   );
};

export default GeneticSubCellularDiversity;



