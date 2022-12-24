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
import { pageGroups } from "../utils/utils";
import Loader from "../components/loader";
// import Loader2 from "./loader2";
import Loader2 from "../components/loader2";
const SearchSpecies = () => {
  const router = useRouter();
  const initialValues = {
    searchText: router?.query?.searchText || ""
  }
  const [searchText, setSearchText] = React.useState(router.query.searchText);
  const [loading, setLoading] = React.useState(true);
  const query = router.query
  const [speciesList, setSpeciesList] = React.useState([]);
  const [searchMessage, setSearchMessage] = React.useState("");
  const [searchValues, setSearchValues] = React.useState(null)
  React.useEffect(() => {
    async function fetchData(query) {
      let response = await callApi('search-species-dynamically', { searchText: query.searchText })
      console.log({ response })
      setSpeciesList(response?.data);
      setLoading(false)

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
        initialValues={initialValues}
        validationSchema={Yup.object().shape({})}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting, setFieldValue }
        ) => {
          try {
            console.log({ searchText })
            // setSearchText(null)
            setSearchText(values.searchText)
            let response = await callApi('search-species-dynamically', { searchText: values.searchText })
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
            <Grid sx={{ pt: 8, pl: 10, background: "white" }}>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    gutterBottom
                    variant="h1"
                  // sx={{ pt: 8 }}
                  >
                    Search all over databases
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField placeholder="Please enter text" size="small" value={values?.searchText} onChange={(e, value) => {
                    setFieldValue('searchText', e.target.value)
                  }} />
                  <Button
                    className={styles.bg_primary}
                    type="submit"
                    // disabled={isSubmitting}
                    style={{
                      marginLeft: "10px",
                      width: "80px",
                      maxHeight: "80px",
                      minWidth: "40px",
                      minHeight: "40px",
                      color: "white",
                      // backgroundColor:"#c44d34",
                      boxShadow: "1px 1px 4px grey",
                      marginBottom: "10px",
                    }}
                    sx={{ mb: 1, mr: 1 }}
                  >
                    Search
                  </Button>
                </Grid>



              </Grid>
              <br />

            </Grid>
          </Form>
        )}
      </Formik>
      
      {loading ? (
        <Loader2></Loader2>
      ) : null}
      {speciesList?.length > 0 ? (
        <>
          {searchText ? (
            <Typography variant="h2" component="h2" color='text.primary' sx={{ px: 10 }} gutterBottom>
              Search result for : &quot;{searchText}&quot;
            </Typography>
          ) : null}

          <TableData speciesList={speciesList} category={pageGroups.plants}></TableData>
        </>
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
