import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import {
    Box,
    Typography,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Dialog,
} from "@mui/material";
import Image from "next/legacy/image";
const species1 = require("../assets/images/species5.jpg");
const species2 = require("../assets/images/species6.jpg");
const species3 = require("../assets/images/species7.jpg");
const species4 = require("../assets/images/species8.jpg");
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
const settings = {
    // customPaging: function (i) {
    //     console.log(i)
    //     return (
    //         <a>
    //             <Image src={species1} height={5000} />
    //         </a>
    //     );
    // },
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
};
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
const slideStylesWidthBackground = {
    // ...slideStyles,
    // transition: "all 1s ease-in-out",
    // backgroundImage: `url(${slides[currentIndex].url.default.src})`,
    // src: slides[currentIndex].url,
    height:"3000px",
    objectFit: "cover",
    // objectPoistion:"center",

};

const DetailsDialog = ({
    open,
    handleClose,

}) => {
    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        // style={{
        //   // width: "100%",
        //   minWidth: "500px"
        // }}
        >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                style={{
                    fontWeight: 600,
                    fontSize: 20,
                    fontFamily: "Raleway",
                    color: "#0f4c39",
                }}
            >
                <br />
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box>
                    <Slider {...settings} >
                        <Box >
                            <Image {...slideStylesWidthBackground} src={species1} alt="No Slider Image"/>
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species2} alt="No Slider Image"/>
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species3}  alt="No Slider Image"/>
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species4} alt="No Slider Image"/>
                        </Box>
                    </Slider>
                </Box>
                {/* <Image
                    src={imageSrc2}
                    // width={500}
                    height={400}
                ></Image> */}
                <Typography
                    gutterBottom
                    style={{
                        fontWeight: 600,
                        fontSize: 30,
                        fontFamily: "Raleway",
                        paddingBottom: 20,
                        paddingTop: 20,
                        color: "#0f4c39",
                    }}
                >
                    Praesent commodo cursus magna
                </Typography>
                <Typography
                    gutterBottom
                    style={{ fontWeight: 600, fontFamily: "Roboto" }}
                >
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                    auctor.
                </Typography>
                <Typography
                    gutterBottom
                    style={{ fontWeight: 300, fontFamily: "Roboto" }}
                >
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                    cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                    dui. Donec ullamcorper nulla non metus auctor fringilla. Praesent
                    commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                    cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                    dui. Donec ullamcorper nulla non metus auctor fringilla. Praesent
                    commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus
                    sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </DialogActions>
        </BootstrapDialog>
    )
}
export default DetailsDialog