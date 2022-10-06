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
import { imageLoader } from "../utils/utils";
import { useRouter } from "next/router";
// import { kingdoms } from "../utils/kingdoms";


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
let imageProps = {
   height: "100px",
   width: "200px",
}
const EcosystemDiversity = () => {
   const [image, setImage] = useState(null);
   const [createObjectURL, setCreateObjectURL] = useState(null);
   const [category, setCatgory] = React.useState()
   const [searchMessage, setSearchMessage] = React.useState('')
   const theme = useTheme();
   const [speciesList, setSpeciesList] = React.useState()
   const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
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
      let response = await callApi('/get-categories-by-name', { name: 'Ecosystem Diversity' })
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
                                    key={row.index}
                                    sx={{
                                       "&:last-child td, &:last-child th": { border: 0 },
                                    }}

                                 >
                                    <TableCell component="th" scope="row">
                                       {index + 1}
                                    </TableCell>
                                    <TableCell component="td" scope="row" width={200}>
                                       <Image {...imageProps} objectFit="cover" loader={imageLoader} src={imageUrl + '/' + row.profile_image}></Image>
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
                                                      category: 'Plants'
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
                                                      category: 'Ecosystem Diversity'
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
         <Footer style={{ padding: "100px" }} />
      </Box>
   );
};

export default EcosystemDiversity;



