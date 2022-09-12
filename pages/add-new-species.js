import React, { useState } from "react";
// import Footer from '../components/Home/Footer/Footer';
// import Header from "../components/Home/Header";
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
  Divider
} from "@mui/material";
// import ImageUpload from "./ImageUpload";
import Header from "../components/Admin/Header";
import Sidebar from '../components/Admin/Sidebar';
import Breadcrumbs from '../components/Home/ui-component/extended/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { IconChevronRight } from '@tabler/icons';
import { Icon } from "@iconify/react";
import navigation from '../components/Admin/menu-items';
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { drawerWidth } from '../store/constant';
import { SET_MENU } from '../store/actions';
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
// import { kingdoms } from "../utils/kingdoms";
const kingdoms = require('../utils/kingdoms')
const phylums = require('../utils/kingdoms')
const classes = require('../utils/kingdoms')
const orders = require('../utils/kingdoms')
const families = require('../utils/kingdoms')
const genuses = require('../utils/kingdoms')
const species = require('../utils/kingdoms')
console.log(kingdoms)
const Input = styled("input")({
  display: "none",
});
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px'
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px'
    }
  })
}));
const map = require("../assets/images/map.png");
const AddNewSpecies = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const theme =useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const initialValues = {
    kingdom: '',
    phylum: '',
    class: '',
    order: '',
    family: '',
    genus: '',
    species: {
      bangla: '',
      english: ""
    },
    categories: [],
    additionalFiles: [],
    profileImage: ""
  }
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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <Main theme={theme} open={leftDrawerOpened}>
        {/* breadcrumb */}
        <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({

            species: Yup.object().shape({
              english: Yup.string().required("Patient english name is required"),
              bangla: Yup.string().required("patient bangla is required"),

              // gender: Yup.string().required("patient gender is required"),
              // address: Yup.string().required("patient adressis required"),
            }),

            kingdom: Yup.string("Add Remarks").required("Add Remark"),
            phylum: Yup.string("Add filmType").required("Add filmType"),
            class: Yup.string("Add priority").required("Add priority"),
            order: Yup.string("Add priority").required("Add priority"),
            genus: Yup.string("Add priority").required("Add priority"),

          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
          ) => {
            try {
              // console.log({ values });
              // // console.log(values.reportfile.name);
              // let xrayData = values;
              // xrayData.createdBy = {
              //   name: loggedUser.name,
              //   userId: loggedUser.userId,
              // };
              // xrayData.createdAt = new Date().getTime();
              // console.log({ loggedUser: loggedUser.userId });
              // const data = new FormData();
              // data.append("data", JSON.stringify(xrayData));
              // let files = values.reportfile;
              // if (files.length != 0) {
              //   for (const single_file of files) {
              //     data.append('reportfile', single_file)

              //   }
              // }

              // // data.append("reportfile", values.reportfile);
              // callApi.post("/xray/new", data, {
              //   headers: {
              //     "Content-Type": "multipart/form-data"
              //   }
              // }).then((res) => {
              //   console.log("response", res);
              //   enqueueSnackbar("Report  Uploaded Successfully", {
              //     variant: "success",
              //     // action: <Button>See all</Button>
              //   });
              //   setErrors(false);
              // });
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
            <Form

              onSubmit={handleSubmit}

            >
              <Grid sx={{ p: 10, background: "white" }} >
                <Typography gutterBottom variant="h3" align="start" sx={{ p: 2 }}>
                  Enter Your Details
                </Typography>
                <Grid container spacing={3} >
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
                        setFieldValue('kingdom', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.kingdom && errors?.kingdom
                          )}
                          helperText={
                            touched?.kingdom && errors?.kingdom
                          }
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
                        setFieldValue('phylum', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.phylum && errors?.phylum
                          )}
                          helperText={
                            touched?.phylum && errors?.phylum
                          }
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
                        setFieldValue('class', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.class && errors?.class
                          )}
                          helperText={
                            touched?.class && errors?.class
                          }
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
                        setFieldValue('order', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.order && errors?.order
                          )}
                          helperText={
                            touched?.order && errors?.order
                          }
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
                        setFieldValue('family', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.family && errors?.family
                          )}
                          helperText={
                            touched?.family && errors?.family
                          }
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
                        setFieldValue('genus', value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.genus && errors?.genus
                          )}
                          helperText={
                            touched?.genus && errors?.genus
                          }
                          style={{ padding: "2px" }}
                          label="---Select genus---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.genus}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container item xs={12}>
                      <Grid item xs={6}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="Species"
                            name="species.english"
                            label="English Name"
                            fullWidth
                            autoComplete="English Name"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="banglaName"
                            name="species.bangla"
                            margin="normal"
                            label="Bangla Name"
                            fullWidth
                            autoComplete="Bangla Name"
                            variant="outlined"
                          />
                        </Grid>
                        <Typography gutterBottom component="h3" variant="div">Identification Features</Typography>

                        {values?.categories.map((category, index) => {
                          return (
                            <>
                              <TextField
                                fullWidth
                                autoFocus
                                label={`Category Name ${index + 1}`}
                                margin="normal"
                                name="category.name"
                                onBlur={handleBlur}
                                onChange={(e, value) => {

                                }}
                                // type="number"
                                value={category.name || ""}
                                variant="outlined"
                              />
                              <TextField
                                fullWidth
                                autoFocus
                                label={`Category Data ${index}`}
                                margin="normal"
                                name="category.name"
                                onBlur={handleBlur}
                                onChange={(e, value) => {

                                }}
                                // type="number"
                                value={category.name || ""}
                                variant="outlined"
                              />
                              <Divider />
                            </>
                          )
                        })}
                        <Button
                          className={styles.bg_secondary}

                          style={{
                            width: "80px",
                            maxHeight: "80px",
                            minWidth: "200px",
                            minHeight: "40px",
                            marginBottom: "10px"
                          }}
                          onClick={(e) => {
                            values.categories.push({
                              name: "",
                              data: ""

                            })
                            setFieldValue("categories", values.categories)

                          }}
                        >
                          Add New Category
                        </Button>
                        <Grid item xs={12}>
                          <TextField
                            required
                            id="Locality"
                            name="Locality"
                            label="Locality"
                            fullWidth
                            autoComplete="Locality"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Physical Identification Details"
                            multiline
                            rows={4}
                            margin="normal"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Habitat"
                            multiline
                            rows={3}
                            margin="normal"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Behavior"
                            multiline
                            rows={3}
                            margin="normal"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth
                            required
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Breeding Behavior"
                            multiline
                            rows={4}
                            margin="normal"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth
                            required
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={6} sx={{ p: 2 }}>
                        <Typography component="h3" variant="div">Profile Image</Typography>
                        {createObjectURL ? (
                          <Image src={createObjectURL} height="200" width="150"></Image>
                        ) : (<Icon icon="entypo:upload-to-cloud" width="200" height="200" />)}

                        <TextField
                          sx={{
                            flexGrow: 1,

                            mt: 2,
                            ml: 3,
                          }}
                          type="file"
                          name="profileImage"
                          onChange={uploadToClient}
                        />
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
                                  values.additionalFiles.push(file)

                                }
                                setFieldValue("additionalFiles", values.additionalFiles);
                                console.log(e.target.files)
                                // setFileName(e.target.files[0].name);
                              }}
                            // onChange={(event, values) => {
                            //   setFieldValue("file", event.currentTarget.files[0]);
                            // }}
                            />

                            <div> </div>

                            <Box
                              variant="contained"
                              component="div"
                              size="large"
                              style={{ border: "1px solid #c6b3b3", borderRadius: "10px", marginTop: "20px" }}

                            >
                              {values?.additionalFiles?.length > 0 ? (
                                Array.from(values.additionalFiles).slice(0, 5).map((file, index) => {
                                  return (<Grid key={`additionalFiles${index}`} xs={12} style={{ border: "1px solid #eee", borderRadius: "10px", marginRight: "5px" }}>
                                    <Grid container xs={12} style={{ padding: 10 }}>
                                      <Grid item xs={1} md={2} style={{ paddingTop: 2 }}><Icon icon="bi:image" /></Grid>
                                      <Grid item xs={10} md={9} style={{ paddingLeft: 2 }}><Typography component="div" variant="body">{file.name}</Typography></Grid>
                                      <Grid item xs={1} style={{ paddingTop: 2 }}>
                                        <Icon icon="fluent:delete-32-filled" onClick={(e) => {
                                          let list = Array.from(values.additionalFiles)
                                          list.splice(index, 1)
                                          setFieldValue("additionalFiles", list)
                                        }} />

                                      </Grid>
                                    </Grid>

                                  </Grid>)
                                })
                              ) : (<Typography sx={{ p: 5 }} component="h4" variant="caption">Please Upload Addition File here</Typography>)}

                            </Box>

                          </label>

                        </Grid>

                      </Grid>
                    </Grid>

                  </Grid>






                </Grid>
                <br />
                <Button
                  className={styles.bg_primary}

                  style={{
                    width: "80px",
                    maxHeight: "80px",
                    minWidth: "40px",
                    minHeight: "40px",
                    color: "white",
                    boxShadow: "1px 1px 4px grey",
                    marginBottom: "10px"
                  }}
                >
                  Save
                </Button>
                <Button
                  className={styles.bg_secondary}

                  style={{
                    width: "80px",
                    maxHeight: "80px",
                    minWidth: "40px",
                    minHeight: "40px",
                    color: "white",
                    boxShadow: "1px 1px 4px grey",
                    marginBottom: "10px"
                  }}
                >
                  Cancel
                </Button>
              </Grid>



            </Form>
          )}
        </Formik>


      </Main>

    </Box>
  );
};

export default AddNewSpecies;
