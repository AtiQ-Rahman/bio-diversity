import { useRef, useState } from "react";
import Counters from "./counters";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  filledInputClasses,
} from "@mui/material";
import { Icon } from "@iconify/react";
import styles from "../../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/legacy/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader } from "../../utils/utils";
import { Box } from "@mui/system";
import callApi from "../../utils/callApi";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

theme.typography.h1 = {
  paddingBottom: "50px",
  fontSize: "1.8rem",
  paddingLeft:"10px",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
};
const StyledSlider = styled((props) => <Slider {...props} />)({
  // '& .slick-dots li': {
  //     width: "70px",
  //     height: "70px",
  //     margin: "0px 4px"
  // },
  "& .slick-dots": {
    display: "block",
    position: "relative",
    zIndex: 1000,
    top: "-20px",
  },
  "& .slick-slide div span": {
    height: "800px !important",
    width: "100% !important",
  },
});
let imageProps = {
  objectFit: "cover",

  height: 800,
  // layout:"fill",
  // width:"auto",
  width: 100,
};

const sliderStyles = {
  position: "relative",
  // height: 500,
};

const dotsContainerStyles = {
  position: "absolute",
  marginBottom: "10px",
  bottom: 0,
  display: "flex",
  justifyContent: "center",
};

const dotStyle = {
  margin: "0 1px",
  cursor: "pointer",
  fontSize: "20px",
};
theme.typography.h3 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.4rem",
  },
};
const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  let searchText;
  const slider = useRef();
  const router = useRouter();
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentIndex(next),
    customPaging: (i) => (
      <div style={dotsContainerStyles}>
        {i === currentIndex ? (
          <div style={dotStyle} key={i}>
            <Icon
              icon="ci:dot-03-m"
              width="30"
              height="30"
              style={{ position: "relative", top: "4px", left: "-4px" }}
            />
          </div>
        ) : (
          <div style={dotStyle} key={i}>
            <Icon color="gray" icon="ci:dot-03-m" />
          </div>
        )}
      </div>
    ),
  };
  var timer;
  // const goToNext = () => {
  //     clearTimeout(timer)
  //     const isLastSlide = currentIndex === slides.length - 1;
  //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //     setCurrentIndex(newIndex);
  // };
  return (
    <Box style={sliderStyles}>
      {slides?.length > 0 ? (
        <div>
          <StyledSlider {...settings} ref={slider}>
            {slides.map((speciesImage, index) => (
              <Image
                key={`slideImage${index}`}
                alt="No Slider Image"
                {...imageProps}
                loader={imageLoader}
                src={speciesImage.url}
              />
            ))}
          </StyledSlider>
        </div>
      ) : null}
      <Grid
        className={styles.image_container}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"

      // style={{ minHeight: "50vh" }}
      >
        {/* <div>
                    <div onClick={goToPrevious} style={leftArrowStyles}>
                        <ArrowBackIosIcon />
                    </div>
                    <div onClick={goToNext} style={rightArrowStyles}>
                        <ArrowForwardIosIcon />
                    </div>
                </div> */}

        <Grid>
          <ThemeProvider theme={theme}>
            <Box>
              <Typography
                variant="h1"
                style={{
                  fontFamily: "Comic Sans MS",
                  // fontSize: "25px",
                  color: "white",
                  // padding: "10px",
                }}
              >
                Biodiversity of
                <span
                  style={{
                    fontWeight: "600",
                    color: "#c44d34",
                  }}
                >
                  {" "}
                  Bangladesh
                </span>
              </Typography>
            </Box>
            {/* <Typography >Responsive h3</Typography> */}
          </ThemeProvider>

          <Grid sx={{ ml: 8 }}> <Counters /></Grid>
        </Grid>
        <Grid
          className={styles.searchField}
          component="form"
          sx={{
            // p: "2px 4px",
            display: "flex",
            alignItems: "center",
            // width: 400,
            height: 55,
            // pr: "25px",
          }}
        >
          <FormControl sx={{
            width: "25ch",
          }} className={styles.search}>
            <OutlinedInput
              sx={{
                // focused color for input with variant='outlined'
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                }
              }}
              placeholder="Please enter text"
              onKeyPress={(e, value) => {
                // searchText = e.target.value;
                if (e.key === 'Enter' && searchText && searchText !== '') {
                  e.preventDefault()
                  router.push({
                    pathname: "/searchSpecies",
                    query: {
                      searchText,
                    },
                  });
                }

              }}
              onChange={(e, value) => {
                searchText = e.target.value;
              }}
            />
          </FormControl>
          <Button
            type="button"
            sx={{ p: "14.2px" }}
            aria-label="search"
            style={{
              color: "white",
              borderRadius: 0,
              fontWeight: 600,
              backgroundColor: "#c44d34",
              width: "140px",
            }}
            onClick={async (e) => {
              router.push({
                pathname: "/searchSpecies",
                query: {
                  searchText,
                },
              });
            }}
          >
            <SearchIcon /> Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageSlider;
