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
  Autocomplete,

} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi from "../utils/callApi";

import { useRouter } from "next/router";

import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
import { pageGroups } from "../utils/utils";

const Fungi = () => {

  const [category, setCatgory] = React.useState();
  const [searchMessage, setSearchMessage] = React.useState("");
  const theme = useTheme();
  const [speciesList, setSpeciesList] = React.useState();
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
      synonym: null,
    },
    identificationFeatures: {},
    categories: [],
    additionalFiles: [],
    profileImage: null,
  };


  useEffect(() => {
    async function fetchData() {
      let response = await callApi("/get-categories-by-name", { name: pageGroups.fungi });
      let localData = localStorage.getItem(pageGroups.fungi)
      let isAllowed = localStorage.getItem(`allowed${pageGroups.fungi}`)
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
        localStorage.removeItem(`allowed${pageGroups.fungi}`)
      }
      else {
        localStorage.removeItem(pageGroups.fungi)
      }
      if (response.data.length > 0) {
        console.log(response.data);
        setCatgory(response.data[0]);
      } else {
        setCatgory({});
      }
    }
    fetchData();

  });


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
            english: Yup.string().required("Patient english name is required"),
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
            values.category = "Fungi";

            let searchParameters = values;
            // console.log({ loggedUser: loggedUser.userId });
            // data.append("reportfile", values.reportfile);
            let res = await callApi("/search-species-by-field", {
              searchParameters,
            });
            console.log("response", res);
            setSpeciesList(res?.data);
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
                    id="fungis"
                    name={values?.type}
                    options={category?.keyList || []}
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
                        label="Biodiversity Group"
                        variant="outlined"
                        placeholder="Select"
                        value={values?.type}
                      />
                    )}
                  />
                </Grid>

                <CommonDropDowns
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  handleChange={handleChange}
                  errors={errors}
                ></CommonDropDowns>
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
      <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={6}>
        <Grid item xs={12}>
          {speciesList?.length > 0 ? (
            <TableData speciesList={speciesList} category={pageGroups.fungi}></TableData>
          ) : (
            <Typography variant="h1" component="h1" align="center" padding={25}>
              {searchMessage ?? ""}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Fungi;
