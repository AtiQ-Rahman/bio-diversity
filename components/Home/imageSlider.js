import { useRef, useState } from "react";
import Counters from "./counters";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Container,
    useMediaQuery,
    Grid,
    Typography,
    Divider,
    TextField,
    Button,
    FormControl,
    IconButton,
    InputBase,
    Paper,
    Input,
    OutlinedInput,
    CardContent,
    Card,
    ImageList,
    ImageListItem,
    ListSubheader,
    ImageListItemBar,
} from "@mui/material";
import { Icon } from '@iconify/react';
import styles from '../../styles/Home.module.css'
import { styled, useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import blurImage from "../../assets/images/blur.jpg"
import { useRouter } from 'next/router'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageLoader } from "../../utils/utils";
import callApi, { imageUrl } from "../../utils/callApi";
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
        height: '800px !important'
    },
});
let imageProps = {
    height: "800px !important",
    // layout: "fill",
    objectFit: "cover"
}
const slideStyles = {
    width: "100%",
    height: "800px",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
};

const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
};

const sliderStyles = {
    position: "relative",
    // height: "700px",
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
        autoplay: true,
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

    function infiniteLoop() {
        timer = setTimeout(function () {
            if (currentIndex == slides.length - 1) setCurrentIndex(0)
            else setCurrentIndex(currentIndex + 1)
        }, 3000)
    }

    // infiniteLoop();
    const goToPrevious = () => {
        clearTimeout(timer)
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        clearTimeout(timer)
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        clearTimeout(timer)
        slider.current.slickGoTo(slideIndex)
        setCurrentIndex(slideIndex);
    };
    console.log(slides)
    const slideStylesWidthBackground = {
        ...slideStyles,
        transition: "all 1s ease-in-out",
        backgroundImage: `url(${slides[currentIndex].url.default.src})`,
        // src: slides[currentIndex].url,

        // objectFit: "cover",
        // objectPoistion:"center"

    };
    const [ready, setReady] = useState(false);

    const handleLoad = (event) => {
        setReady(true);

    };
    return (
        <div style={sliderStyles}>

            {slides?.length > 0 ?
                (<div>
                    <StyledSlider {...settings} ref={slider}>
                        {slides.map((speciesImage, index) => {
                            return (
                                <Image {...imageProps} loader={imageLoader} src={speciesImage.url} />
                            )
                        })}
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