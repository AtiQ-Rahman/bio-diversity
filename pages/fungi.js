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
import Loader2 from "../components/loader2";

const Fungi = () => {
  const router = useRouter();
  const [category, setCatgory] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState("");
  const theme = useTheme();
  const [speciesList, setSpeciesList] = React.useState();
  const [searchValues, setSearchValues] = React.useState(null)

  useEffect(() => {
    async function fetchData() {

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
        setLoading(false)
        setSearchValues(searchParameters)
        setSpeciesList(res?.data);
        localStorage.removeItem(`allowed${pageGroups.fungi}`);
      } else {
        setSearchValues(initialValues)

        localStorage.removeItem(pageGroups.fungi);
      }
    }
    fetchData();
  }, [router.pathname, router.query]);

  return (
    <Box>
      {/* header */}
      <Header index={3} />
      {searchValues ? (
        <Formik
          initialValues={searchValues}
          validationSchema={Yup.object().shape({})}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
          ) => {
            try {
              console.log({ values });
              // console.log(values.reportfile.name);
              setLoading(true)
              values.category = "Fungi";

              let searchParameters = values;
              localStorage.setItem(`${values.category}`, JSON.stringify(searchParameters))

              // console.log({ loggedUser: loggedUser.userId });
              // data.append("reportfile", values.reportfile);
              let res = await callApi("/search-species-by-field", {
                searchParameters,
              });
              console.log("response", res);
              setSpeciesList(res?.data);
              setSearchMessage(res?.message);
              setLoading(false)
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
                  <CommonDropDowns
                    values={values}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    handleChange={handleChange}
                    errors={errors}
                    category={pageGroups.fungi}
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
      ) : (
        <Loader2 size={50}></Loader2>
      )}

      <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={6}>
        <Grid item xs={12}>
        {loading ? (
        <Loader2 size={50}></Loader2>
      ) : null}
          {speciesList?.length > 0 ? (
            <TableData
              speciesList={speciesList}
              category={pageGroups.fungi}
            ></TableData>
          ) : (
            <Typography variant="h1" component="h1" align="center" paddingBottom={20} paddingTop={10}>
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
