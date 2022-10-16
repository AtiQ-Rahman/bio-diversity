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
import { Icon } from '@iconify/react';
import styles from '../../styles/Home.module.css'
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader } from "../../utils/utils";
import { Box } from "@mui/system";
const StyledSlider = styled((props) => (
    <Slider
        {...props}
    />
))({
    // '& .slick-dots li': {
    //     width: "70px",
    //     height: "70px",
    //     margin: "0px 4px"
    // },
    '& .slick-dots': {
        display: "block",
        position: "relative",
        zIndex: 1000,
        top: "-20px"
    },
    '& .slick-slide div span': {
        height: '800px !important',

    },
});
let imageProps = {
    // height: "800px !important",
    layout:"fill",
    // width:"auto",
    // width:"1500px",
    objectFit: "cover"
}

const sliderStyles = {
    position: "relative",
    // height: 500,
};

const dotsContainerStyles = {
    position: 'absolute',
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
const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slider = useRef()
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentIndex(next),
        customPaging: i => (
            <div style={dotsContainerStyles}>
                {i === currentIndex ? (
                    <div
                        style={dotStyle}
                        key={i}

                    >
                        <Icon icon="ci:dot-03-m" width="30" height="30" style={{ position: "relative", top: "4px", left: "-4px" }} />
                    </div>
                ) : (
                    <div
                        style={dotStyle}
                        key={i}

                    >
                        <Icon color="gray" icon="ci:dot-03-m" />
                    </div>
                )
                }
            </div>
        )



    };
    var timer;
    // const goToNext = () => {
    //     clearTimeout(timer)
    //     const isLastSlide = currentIndex === slides.length - 1;
    //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
    //     setCurrentIndex(newIndex);
    // };
    return (
        <div style={sliderStyles}>

            {slides?.length > 0 ?
                (<div>
                    <StyledSlider {...settings} ref={slider}>
                        {slides.map((speciesImage, index) => (
                            <Image key={`slideImage${index}`}{...imageProps} loader={imageLoader} src={speciesImage.url} />
                        ))}
                    </StyledSlider>
                </div>) :

                null
            }
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
                    <Typography className={styles.font}>
                        Listing The World’s BIO Diversity
                    </Typography>{" "}
                    <Counters />
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
                    <FormControl
                        sx={{ width: "25ch" }}
                        className={styles.search}
                    >
                        <OutlinedInput placeholder="Please enter text" />
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
                    >
                        <SearchIcon /> Search
                    </Button>

                </Grid>

            </Grid>

        </div>

    );
};

export default ImageSlider;