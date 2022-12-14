import React, { useState, useEffect, useRef } from "react";
// import Footer from '../components/Home/Footer/Footer';
// import Header from "../components/Home/Header";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  useMediaQuery,
  Autocomplete,
  Divider,
} from "@mui/material";
// import ImageUpload from "./ImageUpload";
import Header from "../components/Home/Header";
import Sidebar from "../components/Admin/Sidebar";
import Breadcrumbs from "../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconCashBanknoteOff, IconChevronRight } from "@tabler/icons";
import { Icon } from "@iconify/react";
import navigation from "../components/Admin/menu-items";
import { useSnackbar } from "notistack";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { drawerWidth } from "../store/constant";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi from "../utils/callApi";
import Image from "next/legacy/image";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import { teal } from "@mui/material/colors";
import { useRouter } from "next/router";
import Geocoder from 'react-mapbox-gl-geocoder'
import Geocode from "react-geocode";
mapboxgl.accessToken = process.env.mapbox_key;
// import { kingdoms } from "../utils/kingdoms";
// const kingdoms = require("../utils/kingdoms");
// const phylums = require("../utils/kingdoms");
// const classes = require("../utils/kingdoms");
// const orders = require("../utils/kingdoms");
// const families = require("../utils/kingdoms");
// const genuses = require("../utils/kingdoms");
// const species = require("../utils/kingdoms");

const Input = styled("input")({
  display: "none",
});
const mapAccess = {
  mapboxApiAccessToken: process.env.mapbox_key
}
const queryParams = {
  country: 'bd'
}
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
const AddNewSpecies = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const router = useRouter();
  const [speciesData, setSpeciesData] = useState(null);
  const query = router.query;
  const theme = useTheme();
  const [categoryList, setCatgoryList] = React.useState();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(5.52);
  const [markerUrl, setMarkerUrl] = useState("");
  const [force, setForce] = useState(null);
  const [profileIndex, setProfileIndex] = useState();

  const initialValues = {
    serial: "",
    kingdom: "",
    phylum: "",
    class_name: "",
    order_name: "",
    family: "",
    genus: "",
    species: "",
    sub_species: "",
    variety: "",
    sub_variety: "",
    clone: "",
    forma: "",
    address: "",
    lng,
    lat,
    addtionalCategories: [],
    nameOfSpecies: {
      bangla: "",
      english: "",
      commonName: "",
      synonym: "",
    },
    requestBy: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    identificationFeatures: {},
    categories: [],
    additionalFiles: [],
    profileImage: "",
  };
  const [allTypesOfSpecies, setAllTypesOfSpecies] = useState([])
  const [subGroups, setSubGroups] = useState([]);
  const [subCategories, setSubcategories] = useState([])
  const [kingdoms, setKingdoms] = useState([])
  const [phylums, setPhylums] = useState([])
  const [classes, setClassNames] = useState([])
  const [orders, setOrderNames] = useState([])
  const [families, setFamilies] = useState([])
  const [genuses, setGenuses] = useState([])
  const [speciesListFromServer, setSpeciesListFromServer] = useState([])
  const [subSpeciesList, setSubSpeciesList] = useState([])
  const [varieties, setVarieties] = useState([])
  const [subVarieties, setSubVarieties] = useState([])
  const [clones, setClones] = useState([])
  const [formas, setFormas] = useState([])
  const [geocodeSearchResult, setGeocodeSearchResult] = useState([])
  const [selectedDistricts, setSelectedDistricts] = useState([])
  const onSelected = (viewport, item) => {
    setViewPort({ viewport });
    console.log('Selected: ', item)
  }
  const callGecoderApi = (value) => {
    let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.mapbox_key}&bbox=88.007207%2C20.4817039%2C92.679485%2C26.638142`
    fetch(url)           //api for the get request
      .then(response => response.json())
      .then(data => {
        setGeocodeSearchResult(data?.features || [])
      });
  }

  useEffect(() => {
    async function fetchData(query, cbfn) {
      let response = await callApi("/get-categories-list", {});
      if (query?.category) {
        let searchParameters = query;
        let species = await callApi("/get-species-by-serial", {
          searchParameters,
        });
        if (species?.data?.length > 0) {
          let data = species.data[0];
          data.nameOfSpecies = data.name;
          setMarkerUrl(data.marker);
          setLng(parseFloat(data.lng));
          setLat(parseFloat(data.lat));
          setSpeciesData(data);
          cbfn();
        }
      } else {
        setSpeciesData(initialValues);
        cbfn();
      }
      setCatgoryList(response.data);
    }
    fetchData(query, () => null);
  }, [query]);
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();

  const getMarkerUrl = (event) => {
    if (event.target.files[0]) {
      const reader = new FileReader();

      const file = event.target.files[0];

      reader.readAsDataURL(file);
      return (reader.onload = () => {
        let dataUri;
        dataUri = reader.result;
        console.log(dataUri);
        setLng(90.399452);
        setLat(23.777176);
        setMarkerUrl(dataUri);
        setForce(!force);
        return;
      });
    }
  };
  return (
    <Box>
      {/* header */}
      <Header index={8} />


      {speciesData ? (
        <Formik
          initialValues={speciesData}
          validationSchema={Yup.object().shape({
            // nameOfSpecies: Yup.object().shape({
            //   english: Yup.string().required(
            //     "Patient english name is required"
            //   ),
            //   bangla: Yup.string().required("patient bangla is required"),
            //   commonName: Yup.string().required(
            //     "patient commonName is required"
            //   ),
            //   synonym: Yup.string().required(
            //     "patient commonName is required"
            //   ),

            //   // gender: Yup.string().required("patient gender is required"),
            //   // address: Yup.string().required("patient adressis required"),
            // }),
            // category: Yup.object().shape({
            //   serial: Yup.string().required("category serial is required"),
            //   name: Yup.string().required("name is required"),
            //   type: Yup.string().required("type is required"),
            //   // gender: Yup.string().required("patient gender is required"),
            //   // address: Yup.string().required("patient adressis required"),
            // }),
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
              let districts = []
              selectedDistricts.map((district) => {
                districts.push({
                  place_name: district.place_name,
                  center: district.center
                })
              })
              speciesData.district = districts
              speciesData.createdBy = {
                name: "test admin",
                userId: "blabla",
              };
              speciesData.createdAt = new Date().getTime();
              // console.log({ loggedUser: loggedUser.userId });
              console.log(speciesData);
              speciesData.thumbnailImage = createObjectURL;
              speciesData.marker = markerUrl;
              speciesData.lng = lng;
              speciesData.lat = lat;
              speciesData.profileIndex = profileIndex;
              const data = new FormData();
              data.append("data", JSON.stringify(speciesData));
              let files = speciesData.additionalFiles;
              if (files.length != 0) {
                for (const single_file of files) {
                  data.append("additionalFiles", single_file);
                }
              }
              console.log(speciesData);

              let res = await callApi("/send-request-for-new-species", data, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              console.log("response", res);
              enqueueSnackbar("Species Requested Successfully", {
                variant: "success",
                // action: <Button>See all</Button>
              });
              router.push({
                pathname:"/"
              })
              setErrors(false);
              resetForm();
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
              <Grid sx={{ p: 10, mt: 15,  background: "white" }}>
                <Typography gutterBottom variant="h3">
                  Request A Species
                </Typography>
                <Grid item xs={12} md={3}>
                        <TextField

                          id="Name"
                          name="requestBy.name"
                          margin="normal"
                          size="Name"
                          label="Contributor"
                          fullWidth
                          onChange={handleChange}
                          autoComplete="Contributor"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField

                          id="Email"
                          name="requestBy.email"
                          margin="normal"
                          size="small"
                          label="Email"
                          fullWidth
                          onChange={handleChange}
                          autoComplete="Email"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField

                          id="phone"
                          name="requestBy.phone"
                          margin="normal"
                          size="small"
                          label="Phone"
                          fullWidth
                          autoComplete="phone"
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </Grid>
                <Grid container spacing={3} sx={{pt:5}}>
                  <Grid item xs={12} md={2}>
                    <Autocomplete
                      size="small"
                      id="species"
                      name={values?.category}
                      value={values?.category}
                      options={categoryList}
                      key="categorySpecies"
                      getOptionLabel={(option) =>
                        option.name || option
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.serial === value.serial
                      }
                      required
                      // sx={{ width: 300 }}
                      onChange={async (e, value) => {
                        setFieldValue("category", value);
                        let allTypesOfSpecies = await callApi("/get-unique-types-of-species", { category: value.name });
                        setAllTypesOfSpecies(allTypesOfSpecies.data);
                        setSubcategories(allTypesOfSpecies?.data.categories)

                        setSubGroups(allTypesOfSpecies.data.subGroups)
                        setKingdoms(allTypesOfSpecies.data.kingdoms);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.category && errors?.category
                          )}
                          helperText={
                            touched?.category && errors?.category
                          }
                          style={{ padding: "2px" }}
                          label="Major Bio-Diversity"
                          variant="outlined"
                          placeholder="Select"
                          required
                          value={values?.category}
                        />
                      )}
                    />
                  </Grid>
                  {values?.category?.type === "Dropdown" ? (
                    <Grid item  xs={12} md={2}>
                      <Autocomplete
                        size="small"
                        disablePortal
                        id="species"
                        name={
                          values?.identificationFeatures?.subCategory
                        }
                        value={values?.identificationFeatures.subCategory}
                        options={subCategories}
                        getOptionLabel={(option) => option?.subCategory || option}
                        // sx={{ width: 300 }}

                        onChange={(e, value) => {
                          setFieldValue(
                            "identificationFeatures.subCategory",
                            value?.subCategory || value
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={Boolean(
                              touched?.identificationFeatures
                                ?.subCategory &&
                              errors?.identificationFeatures
                                ?.subCategory
                            )}
                            helperText={
                              touched?.identificationFeatures
                                ?.subCategory &&
                              errors?.identificationFeatures
                                ?.subCategory
                            }
                            style={{ padding: "2px" }}
                            label=" Bio-Diversity Group"
                            variant="outlined"
                            placeholder="Select"
                            required
                            value={values?.identificationFeatures.subCategory}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    values?.category?.keyList?.map((item, index) => {
                      return (
                        <Grid
                          key={`identificationFeaturesCate${index}`}
                          item
                           xs={12} md={2}
                        >
                          <TextField
                            required
                            id={`key${index}`}
                            key={`key${index}`}
                            name={`identificationFeatures.${item.key}`}
                            // margin="normal"
                            size="small"
                            label={item.name}
                            fullWidth
                            value={values?.identificationFeatures[processNames(item?.name)]}
                            onChange={(e) => {
                              values.identificationFeatures[
                                processNames(item?.name)
                              ] = e.target.value;
                            }}
                            autoComplete={item.name}
                            variant="outlined"
                          />
                        </Grid>
                      );
                    })
                  )}

                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="subGroup"
                      name={values?.subGroup}
                      options={subGroups}
                      key="subGroup"
                      // value={values?.kingdom}
                      getOptionLabel={(option) => option?.subGroup || option}
                      value={values?.subGroup}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("subGroup", value?.subGroup || value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(touched?.subGroup && errors?.subGroup)}
                          helperText={touched?.subGroup && errors?.subGroup}
                          style={{ padding: "2px" }}
                          label="---Sub Group---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.subGroup}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="kingdoms"
                      name={values?.kingdom}
                      options={kingdoms}
                      key="kingdoms"
                      // value={values?.kingdom}
                      getOptionLabel={(option) => option?.kingdom || option}
                      value={values?.kingdom}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("kingdom", value?.kingdom || value);
                        let phylums = allTypesOfSpecies.phylums.filter((item) => item.kingdom == (value?.kingdom || value))
                        setPhylums(phylums)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="phylums"
                      name={values?.phylum}
                      options={phylums}
                      key="phylums"
                      getOptionLabel={(option) => option?.phylum || option}
                      value={values?.phylum}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        console.log(value)
                        setFieldValue("phylum", value?.phylum || value);
                        let classes = allTypesOfSpecies.classes.filter((item) => item.phylum == (value?.phylum || value))
                        setClassNames(classes)

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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="classes"
                      name={values?.class_name}
                      options={classes}
                      key="classes"
                      getOptionLabel={(option) => option?.class_name || option}
                      value={values?.class_name}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("class_name", value?.class_name || value);
                        let orders = allTypesOfSpecies.orders.filter((item) => item.class_name == (value?.class_name || value))
                        setOrderNames(orders)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.class_name && errors?.class_name
                          )}
                          helperText={
                            touched?.class_name && errors?.class_name
                          }
                          style={{ padding: "2px" }}
                          label="---Select Class---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.class_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="orders"
                      name={values?.order_name}
                      options={orders}
                      key="orders"
                      getOptionLabel={(option) => option?.order_name || option}
                      value={values?.order_name}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("order_name", value?.order_name || value);
                        let families = allTypesOfSpecies.families.filter((item) => item.order_name == (value?.order_name || value))
                        setFamilies(families)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.order_name && errors?.order_name
                          )}
                          helperText={
                            touched?.order_name && errors?.order_name
                          }
                          style={{ padding: "2px" }}
                          label="---Select Order---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.order_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="families"
                      name={values?.family}
                      options={families}
                      key="families"
                      getOptionLabel={(option) => option?.family || option}
                      value={values?.family}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("family", value?.family || value);
                        let genuses = allTypesOfSpecies.genuses.filter((item) => item.family == (value?.family || value))
                        setGenuses(genuses)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="genuses"
                      name={values?.genus}
                      options={genuses}
                      key="genuses"
                      getOptionLabel={(option) => option?.genus || option}
                      value={values?.genus}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("genus", value?.genus || value);
                        let species = allTypesOfSpecies.speciesListFromServer.filter((item) => item.genus == (value?.genus || value))
                        setSpeciesListFromServer(species)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="species"
                      name={values?.species}
                      options={speciesListFromServer}
                      key=""
                      getOptionLabel={(option) => option?.species || option}
                      value={values?.species}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("species", value?.species || value);
                        let subSpeciesList = allTypesOfSpecies.subSpeciesList.filter((item) => item.species == (value?.species || value))
                        setSubSpeciesList(subSpeciesList)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="sub_species"
                      name={values?.sub_species}
                      options={subSpeciesList}
                      key=""
                      getOptionLabel={(option) => option?.sub_species || option}
                      value={values?.sub_species}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("sub_species", value?.sub_species || value);
                        let varieties = allTypesOfSpecies.varieties
                        setVarieties(varieties)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.sub_species && errors?.sub_species
                          )}
                          helperText={
                            touched?.sub_species && errors?.sub_species
                          }
                          style={{ padding: "2px" }}
                          label="---Select Sub Species---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.sub_species}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="variety"
                      name={values?.variety}
                      options={varieties}
                      key=""
                      getOptionLabel={(option) => option?.variety || option}
                      value={values?.variety}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("variety", value?.variety || value);
                        let subVarieties = allTypesOfSpecies.subVarieties.filter((item) => item.variety == (value?.variety || value))
                        setSubVarieties(subVarieties)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="sub_variety"
                      name={values?.sub_variety}
                      options={subVarieties}
                      key=""
                      getOptionLabel={(option) => option?.sub_variety || option}
                      value={values?.sub_variety}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("sub_variety", value?.sub_variety || value);
                        let clones = allTypesOfSpecies.clones
                        setClones(clones)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={Boolean(
                            touched?.sub_variety && errors?.sub_variety
                          )}
                          helperText={
                            touched?.sub_variety && errors?.sub_variety
                          }
                          style={{ padding: "2px" }}
                          label="---Select sub-variety---"
                          variant="outlined"
                          placeholder="Select"
                          value={values?.sub_variety}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="clone"
                      name={values?.clone}
                      options={clones}
                      key="clone"
                      getOptionLabel={(option) => option?.clone || option}
                      value={values?.clone}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("clone", value?.clone || value);
                        let formas = allTypesOfSpecies.formas.filter((item) => item.clone == (value?.clone || value))
                        setFormas(formas)
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
                  <Grid item  xs={12} md={2}>
                    <Autocomplete
                      freeSolo
                      size="small"
                      disablePortal
                      id="forma"
                      name={values?.forma}
                      options={formas}
                      key=""
                      getOptionLabel={(option) => option?.forma || option}
                      value={values?.forma}
                      // sx={{ width: 300 }}
                      onInputChange={(e, value) => {
                        setFieldValue("forma", value?.forma || value);
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

                  <Grid item xs={12} md={13}>
                    <Grid container item xs={12} md={12} spacing={2}>

                      <Grid item xs={12} md={3}>
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
                      <Grid item xs={12} md={3}>
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
                      <Grid item xs={12} md={3}>
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
                      <Grid item xs={12} md={3}>
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
                      <Grid item xs={12} md={12} sx={{ p: 2 }}>
                        <Typography component="h4" variant="div">
                          Thumbnail Image
                        </Typography>
                        {createObjectURL ? (
                          <Image
                            src={createObjectURL}
                            height="200"
                            width="150"
                            alt="Thumnail Image"
                          ></Image>
                        ) : (
                          <Icon icon="bx:image-add" width="70" height="80" />
                        )}

                        <TextField
                          sx={{
                            flexGrow: 1,

                            mt: 2,
                            ml: 3,
                          }}
                          type="file"
                          name="profileImage"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            setCreateObjectURL(URL.createObjectURL(file));
                            let length = values?.additionalFiles?.length;
                            if (length) {
                              setProfileIndex(length);
                            } else {
                              setProfileIndex(0);
                            }
                            values.additionalFiles.push(file);
                          }}
                        />
                        <Grid item xs={12} md={12} sx={{pt:5}}>
                          <Typography component="h4" variant="div">
                            Additional Image
                          </Typography>
                          <label htmlFor="contained-button-file">
                            <Input
                              id="contained-button-file"
                              multiple
                              name="additionalFiles"
                              type="file"
                              accept=".png, */png, .jpg, */jpg"
                              error={Boolean(
                                touched.additionalFiles &&
                                errors.additionalFiles
                              )}
                              helpertext={
                                touched.additionalFiles &&
                                errors.additionalFiles
                              }
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

                            <Box
                              variant="contained"
                              component="div"
                              size="large"
                              style={{
                                border: "1px dashed #c6b3b3",
                                borderRadius: "10px",
                                marginTop: "20px",
                              }}
                            >
                              {values?.additionalFiles?.length > 0 ? (
                                Array.from(values.additionalFiles)
                                  .slice(0, 5)
                                  .map((file, index) => {
                                    return (
                                      <Grid
                                        key={`additionalFiles${index}`}
                                        item
                                        xs={12}
                                        style={{
                                          border: "1px solid #eee",
                                          borderRadius: "10px",
                                          marginRight: "5px",
                                        }}
                                      >
                                        <Grid
                                          container
                                          style={{ padding: 10 }}
                                        >
                                          <Grid
                                            item
                                            xs={1}
                                            md={2}
                                            style={{ paddingTop: 2 }}
                                          >
                                            <Icon icon="bi:image" />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={10}
                                            md={9}
                                            style={{ paddingLeft: 2 }}
                                          >
                                            <Typography
                                              component="div"
                                              variant="body"
                                            >
                                              {file?.name || file}
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={1}
                                            style={{ paddingTop: 2 }}
                                          >
                                            <Icon
                                              icon="fluent:delete-32-filled"
                                              onClick={(e) => {
                                                let list = Array.from(
                                                  values.additionalFiles
                                                );
                                                list.splice(index, 1);
                                                setFieldValue(
                                                  "additionalFiles",
                                                  list
                                                );
                                              }}
                                            />
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    );
                                  })
                              ) : (
                                <Typography
                                  sx={{ p: 5 }}
                                  component="h5"
                                  variant="h5"
                                >
                                  <Icon
                                    icon="clarity:image-gallery-solid"
                                    width={20}
                                  />{" "}
                                  Please Upload Addition File here
                                </Typography>
                              )}
                            </Box>
                          </label>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item md={6}>
                            <Typography component="h4" variant="div">
                              Add Marker
                            </Typography>
                            {markerUrl ? (
                              <Image
                                src={markerUrl}
                                height="200"
                                width="150"
                                alt="Marker Image"
                              ></Image>
                            ) : (
                              <Icon
                                icon="bx:image-add"
                                width="70"
                                height="80"
                              />
                            )}

                            <TextField
                              sx={{
                                flexGrow: 1,

                                mt: 2,
                                ml: 3,
                              }}
                              type="file"
                              name="marker"
                              onChange={getMarkerUrl}
                            />
                            <Box>
                              <br></br>
                              {/* <Geocoder
                              style={{ background: "white" }}
                              {...mapAccess} onSelected={onSelected} viewport={viewport} hideOnSelect={true}
                              queryParams={queryParams}
                            /> */}
                              <Autocomplete
                                multiple
                                disabled={markerUrl ? false : true}
                                id="tags-standard"
                                options={geocodeSearchResult}
                                getOptionLabel={(option) => option.place_name || option}
                                defaultValue={[]}
                                onInputChange={(e, value) => {
                                  callGecoderApi(value)
                                }}
                                onChange={(e, value) => {
                                  console.log(value)
                                  setSelectedDistricts(value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    style={{ padding: "2px" }}
                                    label="Select District"
                                    variant="outlined"
                                    placeholder="Select"
                                  // value={values?.district}
                                  />
                                )}
                              />
                            </Box>
                            <br></br>
                          </Grid>
                          {/* <Grid item md={6}>
                            <div
                              ref={mapContainer}
                              className={styles.map_container_2}
                            ></div>
                          </Grid> */}
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography gutterBottom component="h3" variant="div">
                          Identification Features
                        </Typography>

                        {values?.addtionalCategories?.map(
                          (category, index) => {
                            return (
                              <>
                                <TextField
                                  fullWidth
                                  autoFocus
                                  label={`Category Name ${index + 1}`}
                                  key={`CategoryName${index}`}
                                  margin="normal"
                                  size="small"
                                  onBlur={handleBlur}
                                  onChange={(e, value) => {
                                    values.addtionalCategories[index].name =
                                      e.target.value;
                                    setFieldValue(
                                      "addtionalCategories",
                                      values.addtionalCategories
                                    );
                                  }}
                                  // type="number"
                                  value={category.name || ""}
                                  variant="outlined"
                                />
                                <TextField
                                  fullWidth
                                  key={`CategoryValue${index}`}
                                  autoFocus
                                  label={`Category Data ${index + 1}`}
                                  margin="normal"
                                  size="small"
                                  onBlur={handleBlur}
                                  onChange={(e, value) => {
                                    values.addtionalCategories[index].value =
                                      e.target.value;
                                    setFieldValue(
                                      "addtionalCategories",
                                      values.addtionalCategories
                                    );
                                  }}
                                  value={category.value || ""}
                                  // type="number"
                                  variant="outlined"
                                />
                                <Divider />
                              </>
                            );
                          }
                        )}
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
                            values.addtionalCategories.push({
                              name: "",
                              data: "",
                            });
                            setFieldValue(
                              "addtionalCategories",
                              values.addtionalCategories
                            );
                          }}
                        >
                          Add New Category
                        </Button>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Physical Identification Details"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.physical"
                          onChange={(e) => {
                            values.identificationFeatures["physical"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Habitat"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.habitat"
                          onChange={(e) => {
                            values.identificationFeatures["habitat"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Behavior"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.behavior"
                          onChange={(e) => {
                            values.identificationFeatures["behavior"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Migration"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.migration"
                          onChange={(e) => {
                            values.identificationFeatures["migration"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Breeding Behavior"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.breeding"
                          onChange={(e) => {
                            values.identificationFeatures["breeding"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Chromosome Number"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.chromosome"
                          onChange={(e) => {
                            values.identificationFeatures["chromosome"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Molecular Characteristic"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.molecular"
                          onChange={(e) => {
                            values.identificationFeatures["molecular"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Notes"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.notes"
                          onChange={(e) => {
                            values.identificationFeatures["notes"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="World distribution"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.distribution"
                          onChange={(e) => {
                            values.identificationFeatures["distribution"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="IUCN status"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.iucn"
                          onChange={(e) => {
                            values.identificationFeatures["iucn"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Economic Importance"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.economic"
                          onChange={(e) => {
                            values.identificationFeatures["economic"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Medicinal use"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.medicinal"
                          onChange={(e) => {
                            values.identificationFeatures["medicinal"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Uses as Foods and Feeds"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.foods"
                          onChange={(e) => {
                            values.identificationFeatures["foods"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="As pharmaceuticals"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.pharmaceuticals"
                          onChange={(e) => {
                            values.identificationFeatures["pharmaceuticals"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="As industrial product"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.industrial"
                          onChange={(e) => {
                            values.identificationFeatures["industrial"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Other information"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.otherInfo"
                          onChange={(e) => {
                            values.identificationFeatures["otherInfo"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Other uses"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.otherUses"
                          onChange={(e) => {
                            values.identificationFeatures["otherUses"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Ecological Indicator"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.ecologicalIndicator"
                          onChange={(e) => {
                            values.identificationFeatures[
                              "ecologicalIndicator"
                            ] = e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Exotic"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.exotic"
                          onChange={(e) => {
                            values.identificationFeatures["exotic"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Crop / fruit / industrial products/ weed etc"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.typeOfSpecies"
                          onChange={(e) => {
                            values.identificationFeatures["physical"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Fruting time"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.fruitingTime"
                          onChange={(e) => {
                            values.identificationFeatures["fruitingTime"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Scientific Research Interest"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.scientific"
                          onChange={(e) => {
                            values.identificationFeatures["scientific"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Ecological Role"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.Ecological-Role"
                          onChange={(e) => {
                            values.identificationFeatures["Ecological-Role"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Value C-Sequester"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.Value-C-Sequester"
                          onChange={(e) => {
                            values.identificationFeatures["Value C-Sequester"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Health Resource"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.health"
                          onChange={(e) => {
                            values.identificationFeatures["health"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Growing season"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.season"
                          onChange={(e) => {
                            values.identificationFeatures["season"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Threats to the Species / Genus"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.threats"
                          onChange={(e) => {
                            values.identificationFeatures["threats"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Conservation status"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.conservation"
                          onChange={(e) => {
                            values.identificationFeatures["conservation"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Measures taken"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.measures"
                          onChange={(e) => {
                            values.identificationFeatures["physical"] =
                              e.target.value;
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          label="Miscellaneous"
                          multiline
                          rows={3}
                          margin="normal"
                          size="small"
                          placeholder="Type your Descripton here"
                          variant="outlined"
                          fullWidth
                          name="identificationFeatures.miscellaneous"
                          onChange={(e) => {
                            values.identificationFeatures["miscellaneous"] =
                              e.target.value;
                          }}
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
                    marginBottom: "10px",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : null}

    </Box>
  );
};
AddNewSpecies.getInitialProps = ({ query }) => {
  return { query };
};
export default AddNewSpecies;
