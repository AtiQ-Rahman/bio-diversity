import * as React from "react";

import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";

import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Autocomplete,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";
import callApi, { imageUrl } from "../utils/callApi";

import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
import { useRouter } from "next/router";
import { initialValues, pageGroups } from "../utils/utils";

const SearchSpecies = () => {
  const router = useRouter();
  const [searchText, setSearchText] = React.useState("");
  const [category, setCatgory] = React.useState();
  const query = router.query
  const [speciesList, setSpeciesList] = React.useState([]);
  const [searchMessage, setSearchMessage] = React.useState("");
  const [searchValues, setSearchValues] = React.useState(null)
  React.useEffect(() => {
    async function fetchData(query) {
      let response = await callApi('search-species-dynamically', { searchText: query.searchText })
      console.log({ response })
      setSpeciesList(response?.data);

    }
    fetchData(query);
  }, [query]);
  // Handle left drawer

  return (
    <Box height={800}>
      {/* header */}

      <Header index={1} relative={true} />

      {/* drawer */}

      {/* breadcrumb */}


      <Formik
        initialValues={searchValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
        ) => {
          try {
            console.log({ searchText })
            let response = await callApi('search-species-dynamically', { searchText })
            console.log({ response })
            console.log("response", response);
            setSpeciesList(response?.data);
            setSearchMessage(response?.message);
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

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="h3"
                  // sx={{ pt: 8 }}
                  >
                    Enter Your Details
                  </Typography> </Grid>
                <FormControl
                  sx={{ width: "25ch" }}
                  className={styles.search}
                >
                  <OutlinedInput placeholder="Please enter text" onChange={(e, value) => {
                    setSearchText(e.target.value)
                  }} />
                </FormControl>
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




      {speciesList?.length > 0 ? (
        <TableData speciesList={speciesList} category={pageGroups.plants}></TableData>
      ) : (
        <Typography variant="h1" component="h1" align="center" paddingBottom={20} paddingTop={10}>
          {searchMessage ?? ""}
        </Typography>
      )}

      <Footer />
    </Box>
  );
};
SearchSpecies.getInitialProps = ({ query }) => {
  return query;
}
export default SearchSpecies;
