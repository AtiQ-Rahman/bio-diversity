import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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
  height: "600px",
  width: "1300px",
  objectFit: "cover",
  borderRadius: "0px 0px 40px 40px"
}
const StyledSlider = styled((props) => <Slider {...props} />)({
  "& .slick-dots li": {
    width: "200px",
    height: "100px",
    margin: "0px 4px",
  },
  "& .slick-dots": {
    // display: "block",
    position: "relative",
  },
  "& .slick-slider span": {
    // display: "block",
    width: "150% !important",
    height: "400px !important"
  },
  '& ul .slick-active': {
    border: "3px solid #d76d2e !important",
    filter: " drop-shadow(2px 4px 6px grey) !important"
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
const AllDetailsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speciesDetails, setSpeciesData] = useState({});
  const [modifiedSpeciesDetails, setModifiedSpeciesDetails] = useState({});
  // const [popupInfo, setPopUpInfo] = useState(null);
  const router = useRouter();
  const [query, setQuery] = useState(router.query);
  const fetchData = async (query, cbfn) => {
    let searchParameters = query;
    if (!query.initial) {
      localStorage.setItem(`allowed${query.category}`, true)
    }
    delete searchParameters.initial
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
    beforeChange: (current, next) => setCurrentIndex(next),

    customPaging: function (i) {
      return (
        <div>
          {i === currentIndex ? (
            <Box height={400}>
              <Image
                style={{
                  border: "1px solid black"
                }}
                alt="Additonal Image"
                layout="fill"
                objectFit="cover"
                loader={imageLoader}
                src={`${imageUrl + "/" + speciesDetails?.additionalFiles[i]}`}
              />
            </Box>
          ) : (
            <Box height={400}>
              <Image
                layout="fill"
                objectFit="cover"
                alt="Additonal Image"
                loader={imageLoader}
                src={`${imageUrl + "/" + speciesDetails?.additionalFiles[i]}`}
              />
            </Box>
          )
          }
        </div>

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

    <Grid container  >
      <Grid item xs={2}></Grid>
      <Grid item xs={8} style={{ background: "white", margin: '0 auto' }}>
        <Item sx={{ pt: 10 }}>
          {speciesDetails?.additionalFiles?.length > 0 ? (
            <div>
              <StyledSlider {...settings} >
                {speciesDetails.additionalFiles.map(
                  (speciesImage, index) => {
                    return (
                      <Image
                        key={`speciesAdditional;${index}`}
                        alt="Additonal Image"
                        {...imageProps}
                        loader={imageLoader}
                        src={imageUrl + "/" + speciesImage}

                      />
                    );
                  }
                )}
              </StyledSlider>
            </div>
          ) :
            speciesDetails?.profile_image ?
              (
                <Image
                  loader={imageLoader}
                  src={imageUrl + "/" + speciesDetails?.profile_image}
                  alt="species-image"
                  // width="345"
                  // height={200}
                  layout='fill'
                ></Image>
              ) : null}
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
          <Table style={{ width: '100%' }} className={styles.table} aria-label="customized table">
            <TableBody>
              {Object.keys(modifiedSpeciesDetails).map((row) => {
                if (typeof modifiedSpeciesDetails[row] === 'object' && modifiedSpeciesDetails[row]) {

                  Object?.keys(modifiedSpeciesDetails[row])?.map((objKey) => {
                    let title = processKeys(`${modifiedSpeciesDetails[row]}.${objKey}`)
                    console.log(modifiedSpeciesDetails[row][objKey])

                    return (
                      <StyledTableRow key={row}>
                        <StyledTableCell component="th" scope="row" >
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
                      <StyledTableCell component="th" scope="row" sx={{ pl: 10 }} >
                        <b> {title} :</b>
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ pr: 15 }}>
                        {modifiedSpeciesDetails[row]}
                      </StyledTableCell>

                    </StyledTableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>


      </Grid>

      <Grid item xs={2}></Grid>


    </Grid>


  );
};

AllDetailsPage.getInitialProps = ({ query }) => {
  return { query };
};
export default AllDetailsPage;
