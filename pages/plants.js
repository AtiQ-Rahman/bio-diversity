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
} from "@mui/material";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import styles from "../styles/Home.module.css";
import callApi, { imageUrl } from "../utils/callApi";

import CommonDropDowns from "../components/CommonDropDowns";
import TableData from "./TableData";
import { useRouter } from "next/router";
import { initialValues, pageGroups } from "../utils/utils";
import Loader from "../components/loader";

const Plants = () => {
  const router = useRouter();
  const [category, setCatgory] = React.useState();
  const [speciesList, setSpeciesList] = React.useState([]);
  const [searchMessage, setSearchMessage] = React.useState("");
  const [searchValues, setSearchValues] = React.useState(null)
  React.useEffect(() => {
    async function fetchData() {
      let localData = localStorage.getItem(pageGroups.plants)
      let isAllowed = localStorage.getItem(`allowed${pageGroups.plants}`)
      if (localData && isAllowed) {
        let searchParameters = JSON.parse(localData)
        let res = await callApi("/search-species-by-field", {
          searchParameters,
        });
        setSpeciesList(res?.data);
        setSearchValues(searchParameters)
        console.log({ searchParameters })
        localStorage.removeItem(`allowed${pageGroups.plants}`)
      }
      else {
        setSearchValues(initialValues)
        localStorage.removeItem(pageGroups.plants)
      }

    }
    fetchData();
  }, []);
  // Handle left drawer

  return (
    <Box height={800}>
      {/* header */}

      <Header index={1} />

      {/* drawer */}

      {/* breadcrumb */}

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
              values.category = pageGroups.plants;

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
                  <CommonDropDowns
                    values={values}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    handleChange={handleChange}
                    errors={errors}
                    category={pageGroups.plants}
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
        null
      )
      }



      {
        speciesList?.length > 0 ? (
          <TableData speciesList={speciesList} category={pageGroups.plants}></TableData>
        ) : (
          <Typography variant="h1" component="h1" align="center" paddingBottom={20} paddingTop={10}>
            {searchMessage ?? ""}
          </Typography>
        )
      }

      <Footer />
    </Box >
  );
};
Plants.getInitialProps = ({ query }) => {
  return query;
}
export default Plants;
