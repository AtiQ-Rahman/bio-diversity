import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader, isValidImage, isValidValueOrKey, processKeys, processSpeciesObject } from "../utils/utils";
import callApi, { imageUrl } from "../utils/callApi";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { style } from "@mui/system/Stack/createStack";
const member1 = require('../assets/images/no-image.png')

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
  borderRadius: "0px 0px 40px 40px",
};
let imageProps2 = {
  height: "100px",
  width: "200px",
  objectFit: "cover",
  // border: "3px solid #d76d2e !important",
  // filter: " drop-shadow(2px 4px 6px grey) !important",

};
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
    height: "400px !important",

  },
  "& ul .slick-active": {
    border: "3px solid #d76d2e !important",
    filter: " drop-shadow(2px 4px 6px grey) !important",
  },
});
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 70,
    textAlign: "end"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
  "&.MuiTableCell-root": {
    border: "1px solid black"
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

}));
const AllDetailsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [speciesDetails, setSpeciesData] = useState({});
  const [modifiedSpeciesDetails, setModifiedSpeciesDetails] = useState({});
  const [slider, setSlider] = useState(null)
  // const [popupInfo, setPopUpInfo] = useState(null);
  const router = useRouter();
  const [query, setQuery] = useState(router.query);
  const fetchData = async (query, cbfn) => {
    let searchParameters = query;
    if (!query.initial) {
      localStorage.setItem(`allowed${query.category}`, true);
    }
    delete searchParameters.initial;
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
                  border: "1px solid black",
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
          )}
        </div>
      );
    },
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const settingsForAddition = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false

        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false

        }
      }
    ]
  };
  useEffect(() => {
    if (!query) return;
    fetchData(query, async (speciesDetails) => {
      let modifiedSpeciesDetails = await processSpeciesObject(speciesDetails);
      setModifiedSpeciesDetails(modifiedSpeciesDetails);
    });
  }, [query]);

  return (
    <Grid container>
      <Grid item xs={2}></Grid>

      <Grid item xs={10} md={8} style={{ background: "white", margin: "0 auto", paddingTop: "100px" }}>
        <Item sx={{ pt: 10 }}>
          {speciesDetails.additionalFiles?.length > 0 ? (
            <div>
              <Slider ref={slider => setSlider(slider)} {...settings} >
                {speciesDetails.additionalFiles.map((speciesImage, index) => {
                  return (
                    <Image

                      key={`speciesAdditional${index}`}
                      {...imageProps}
                      loader={imageLoader}
                      alt="Additional Image"
                      src={imageUrl + "/" + speciesImage}
                    />
                  );
                })}
              </Slider>
            </div>
          ) :
            isValidImage(speciesDetails?.profile_image) ? (
              <Image
                loader={imageLoader}
                src={imageUrl + "/" + speciesDetails?.profile_image}
                alt="species-image"
                width="345"
                height={200}
              ></Image>
            ) : (<Image
              height="170px"
              objectFit="cover"
              loader={imageLoader}
              src={member1}
              alt="No_image"
            ></Image>)}
          {speciesDetails?.additionalFiles?.length > 0 ? (
            <div>
              <Slider {...settingsForAddition}>
                {speciesDetails.additionalFiles.map((speciesImage, index) => (
                  <Image key={`slideImage2${index}`} alt="No Slider Image" {...imageProps2} loader={imageLoader} src={imageUrl + "/" + speciesImage} onClick={(e) => {
                    slider?.slickGoTo(index)
                    setCurrentIndex(index)
                  }} />
                ))}
              </Slider>
            </div>
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
          {speciesDetails?.bangla}
        </Typography>

        <TableContainer component={Paper}>
          <Table
            style={{ width: "100%" }}
            className={styles.table}
            aria-label="customized table"
          >
            <TableBody>
              {Object.keys(modifiedSpeciesDetails).map((row) => {
                if (
                  typeof modifiedSpeciesDetails[row] === "object" &&
                  modifiedSpeciesDetails[row] && row == 'identificationFeatures'
                ) {

                  let renderObject = Object?.keys(modifiedSpeciesDetails[row])?.map((objKey) => {
                    let title = processKeys(
                      `${row}.${objKey}`
                    );
                    console.log(modifiedSpeciesDetails[row][objKey])
                    if (isValidValueOrKey(modifiedSpeciesDetails[row][objKey])) {
                      return (
                        <StyledTableRow key={row} className={styles.table}>
                          <StyledTableCell component="th" scope="row" sx={{
                            textAlign: "end",
                            width: 250
                          }}>
                            <b> {title} :</b>
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {modifiedSpeciesDetails[row][objKey]?.name ||
                              modifiedSpeciesDetails[row][objKey]}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  });
                  return renderObject
                } else if (isValidValueOrKey(modifiedSpeciesDetails[row])) {
                  let title = processKeys(row);
                  let value = modifiedSpeciesDetails[row]
                  let parsedDistrict
                  if (title == 'District') {
                    parsedDistrict = JSON.parse(modifiedSpeciesDetails[row])
                    value = ""
                    for (let index = 0; index < parsedDistrict.length; index++) {
                      let district = parsedDistrict[index]
                      value += index + 1 + '. ' + district.place_name + '. '
                    }
                  }

                  return (
                    <StyledTableRow key={row} className={styles.table}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        sx={{
                          textAlign: "end",
                          width: 250
                        }}
                      >
                        <b> {title} :</b>
                      </StyledTableCell>
                      <StyledTableCell align="left" >
                        {value}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
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
