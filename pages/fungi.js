import React, { useState, useEffect } from "react";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Autocomplete,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi from "../utils/callApi";

import { useRouter } from "next/router";

import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
import { initialValues, pageGroups } from "../utils/utils";

const Fungi = () => {
  const router = useRouter();
  const [category, setCatgory] = React.useState();
  const [searchMessage, setSearchMessage] = React.useState("");
  const theme = useTheme();
  const [speciesList, setSpeciesList] = React.useState();
  const initialValues = initialValues;

  useEffect(() => {
    async function fetchData() {
      let response = await callApi("/get-categories-by-name", {
        name: pageGroups.fungi,
      });
      let localData = localStorage.getItem(pageGroups.fungi);
      let isAllowed = localStorage.getItem(`allowed${pageGroups.fungi}`);
      console.log(router.query, localData);
      // if (router?.query?.initial) {
      //   localStorage.removeItem(category)
      // }
      if (localData && isAllowed) {
        let searchParameters = JSON.parse(localData);
        let res = await callApi("/search-species-by-field", {
          searchParameters,
        });
        console.log("response", res);
        setSpeciesList(res?.data);
        localStorage.removeItem(`allowed${pageGroups.fungi}`);
      } else {
        localStorage.removeItem(pageGroups.fungi);
      }
      if (response.data.length > 0) {
        console.log(response.data);
        setCatgory(response.data[0]);
      } else {
        setCatgory({});
      }
    }
    fetchData();
  }, [router.pathname, router.query]);

  return (
    <Box>
      {/* header */}
      <Header index={3} />
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
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
            setSearchMessage(res?.message);
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
              <Typography gutterBottom variant="h3" sx={{ pt: 8 }}>
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
            <TableData
              speciesList={speciesList}
              category={pageGroups.fungi}
            ></TableData>
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
