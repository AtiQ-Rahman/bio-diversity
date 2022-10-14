import {
    Button,
    Card,
    CardContent,
    Grid,
    Paper,
    Typography,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import Image from "next/image";
  import React, { useEffect, useState } from "react";
  import Carousel from "react-material-ui-carousel";
  import Footer from "../components/Home/Footer/Footer";
  import Header from "../components/Home/Header";
  import styles from "../styles/Home.module.css";
  import { styled } from "@mui/material/styles";
  import { useRouter } from "next/router";
  
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { imageLoader } from "../utils/utils";
  import callApi, { imageUrl } from "../utils/callApi";
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  let imageProps = {
    height: "300px",
    width: "800px",
  };
  const StyledSlider = styled((props) => <Slider {...props} />)({
    "& .slick-dots li": {
      width: "100px",
      height: "70px",
      margin: "0px 4px",
    },
    "& .slick-dots": {
      // display: "block",
      position: "relative",
    },
  });
  // import { Paper, Button } from '@material-ui/core';
  // const species8 = require("../assets/images/species8.jpg");
  // const species9 = require("../assets/images/species9.jpg");
  // const species10 = require("../assets/images/species10.jpg");
  const AllDetailsPage = () => {
    const [speciesDetails, setSpeciesData] = useState({});
    const [popupInfo, setPopUpInfo] = useState(null);
    const router = useRouter();
    const [query, setQuery] = useState(router.query);
    const fetchData = async (query, cbfn) => {
      let searchParameters = query;
      let response = await callApi("/get-species-by-serial", {
        searchParameters,
      });
      if (response?.data?.length > 0) {
        setSpeciesData(response.data[0]);
        cbfn(response.data[0]);
      } else {
        cbfn({});
      }
    };
    const settings = {
      customPaging: function (i) {
        return (
          <Box height={400}>
            <Image
              layout="fill"
              objectFit="cover"
              loader={imageLoader}
              src={`${imageUrl + "/" + speciesDetails?.additionalFiles[i]}`}
            />
          </Box>
        );
      },
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    useEffect(() => {
      if (!query) return;
      fetchData(query, (speciesDetails) => {
        null;
      });
    }, [query]);
  
    return (
      <>
        <Box className={styles.bgDetails}>
          
          <Box className={styles.bgBox}>
            <Grid container>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={16}>
                  <Item>
                    <Grid className={styles.detailsSlider}>
                      {speciesDetails?.additionalFiles?.length > 0 ? (
                        <div>
                          <StyledSlider {...settings}>
                            {speciesDetails.additionalFiles.map(
                              (speciesImage, index) => {
                                return (
                                  <Image
                                    key={`speciesAdditiona;${index}`}
                                    {...imageProps}
                                    loader={imageLoader}
                                    src={imageUrl + "/" + speciesImage}
                                  />
                                );
                              }
                            )}
                          </StyledSlider>
                        </div>
                      ) : (
                        <Image
                          loader={imageLoader}
                          src={imageUrl + "/" + speciesDetails?.profile_image}
                          alt="species-image"
                          width="345"
                          height={200}
                        ></Image>
                      )}
                    </Grid>
                  </Item>
                </Grid>
                <br />
                <Grid
                  item
                  xs={16}
                  sx={{
                    backgroundColor: "white",
                    paddingBottom: "70px",
                    marginTop: "20px",
                    marginLeft: "17px",
                  }}
                >
                  <Grid item>
                    <Typography
                      gutterBottom
                      component="h2"
                      variant="h2"
                      // className={styles.title1}
                      sx={{
                        paddingTop: "70px",
                        paddingBottom: "50px",
                        textAlign: "center",
                        color: "#c44d34",
                      }}
                    >
                      {speciesDetails?.name?.commonName}
                    </Typography>
                  </Grid>
  
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    pl={50}
                  >
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Kindom</b>: {speciesDetails.kindom}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Phylum</b>:{speciesDetails.phylum}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>class</b>:{speciesDetails.class}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>order</b>:{speciesDetails.order}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>family</b>:{speciesDetails.family}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Genus</b>:{speciesDetails.genus}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Specis</b>:{speciesDetails.specis}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Variety</b>:{speciesDetails.variety}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>Sub Variety</b>:{speciesDetails.subVariety}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>clone</b>:{speciesDetails.clone}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        gutterBottom
                        component="description"
                        variant="div"
                        fontSize={20}
                      >
                        <b>forma</b>:{speciesDetails.forma}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </>
    );
  };
  
  AllDetailsPage.getInitialProps = ({ query }) => {
    return { query };
  };
  export default AllDetailsPage;
  