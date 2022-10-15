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

import { useRouter } from "next/router";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader, processKeys, processSpeciesObject } from "../utils/utils";
import callApi, { imageUrl } from "../utils/callApi";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

let imageProps = {
  height: "300px",
  width: "1000px",
  objectFit: "cover",
  borderRadius: "0px 0px 40px 40px"
}
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
  "& .slick-slide span": {
    // display: "block",
    width: "100% !important",
    height: "400px !important"
  },
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 30,


  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,

  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 1,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData("Kindom", "Viruses"),
  createData("class", "Viruses"),
  createData("family", "Viruses"),
  createData("Specis", "Viruses"),
  createData("forma", "Viruses"),
];
const AllDetailsPage = () => {
  const [speciesDetails, setSpeciesData] = useState({});
  const [modifiedSpeciesDetails, setModifiedSpeciesDetails] = useState({});
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
    arrows: false
  };
  useEffect(() => {
    if (!query) return;
    fetchData(query, async (speciesDetails) => {
      let modifiedSpeciesDetails = await processSpeciesObject(speciesDetails)
      setModifiedSpeciesDetails(modifiedSpeciesDetails)
    });
  }, [query]);

  return (
    <>
      <Grid container sx={{ mt: 10 }} >
        <Grid item xs={2}></Grid>
        <Grid item xs={8} style={{ background: "white", margin: '0 auto' }}>
          <Item>
            {speciesDetails?.additionalFiles?.length > 0 ? (
              <div>
                <StyledSlider {...settings} >
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
                // width="345"
                // height={200}
                layout='fill'
              ></Image>
            )}
          </Item>


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

          <TableContainer component={Paper}>
            <Table style={{ width: 1000 }} className={styles.table} aria-label="customized table">
              <TableBody>
                {Object.keys(modifiedSpeciesDetails).map((row) => {
                  if (typeof modifiedSpeciesDetails[row] === 'object' && modifiedSpeciesDetails[row]) {

                    Object?.keys(modifiedSpeciesDetails[row])?.map((objKey) => {
                      let title = processKeys(`${modifiedSpeciesDetails[row]}.${objKey}`)
                      console.log(modifiedSpeciesDetails[row][objKey])

                      return (
                        <StyledTableRow key={row}>
                          <StyledTableCell component="th" scope="row">
                            <b> {title}</b>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {modifiedSpeciesDetails[row][objKey]?.name || modifiedSpeciesDetails[row][objKey]}
                          </StyledTableCell>

                        </StyledTableRow>
                      )
                    })

                  }
                  else {
                    let title = processKeys(row)
                    return (
                      <StyledTableRow key={row}>
                        <StyledTableCell component="th" scope="row">
                          <b> {title}</b>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {modifiedSpeciesDetails[row]}
                        </StyledTableCell>

                      </StyledTableRow>
                    )
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <Grid item xs={6}>
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
                  </Grid> */}

        </Grid>

        <Grid item xs={2}></Grid>


      </Grid>


    </>
  );
};

AllDetailsPage.getInitialProps = ({ query }) => {
  return { query };
};
export default AllDetailsPage;
