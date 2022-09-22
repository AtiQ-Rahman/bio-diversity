import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const imageSrc = require("../assets/images/species1.jpg");

import {
    AppBar,
    Box,
    CssBaseline,
    Toolbar,
    Container,
    useMediaQuery,
    Grid,
    Typography,
    TextField,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    Table,
    TableContainer,
    Button,
    Modal,
    Divider,
    Card,
    CardActions,
    CardContent,
    tableCellClasses,
    TablePagination,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Autocomplete,
    Dialog,
} from "@mui/material";
import Header from "../components/Home/Header";
import CollapseCard from "../components/Home/collapseCard";
import SearchSection from "../components/Home/Header/SearchSection";
import Paper from "@mui/material/Paper";
import { Link, Router } from "react-router-dom";
import Image from "next/image";
import Footer from "../components/Home/Footer/Footer";
import Counters from "../components/Home/counters";
import { fontSize, fontWeight, height } from "@mui/system";
import { useState } from "react";
import { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import callApi from "../utils/callApi";
import { Details } from "@mui/icons-material";
const species1 = require("../assets/images/species5.jpg");
const species2 = require("../assets/images/species6.jpg");
const species3 = require("../assets/images/species7.jpg");
const species4 = require("../assets/images/species8.jpg");
const species9 = require("../assets/images/species9.jpg");
const species10 = require("../assets/images/species10.jpg");
const species12 = require("../assets/images/species12.jpg");
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
                            <Image {...slideStylesWidthBackground} src={species1}/>
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species2} />
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species3}  />
                        </Box>
                        <Box>
                            <Image {...slideStylesWidthBackground}src={species4} />
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