import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "../styles/Home.module.css";
import CollapseCard from "../components/Home/collapseCard";
import Image from "next/image";
const imageSrc = require("../assets/images/species1.jpg");
import { useRouter } from "next/router";
import Header from "../components/Home/Header";
import { createTheme, styled } from "@mui/material/styles";
import { speciesList } from "../utils/speciesList";
import PropTypes from "prop-types";
import * as Yup from "yup";
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
    Paper,
    Modal,
    Card,
    CardActions,
    CardContent,
    tableCellClasses,
    Divider,
    DialogTitle,
    Dialog,
    DialogContent,
    DialogActions,
    Autocomplete,
} from "@mui/material";
import Footer from "../components/Home/Footer/Footer";

import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
const kingdoms = require("../utils/kingdoms");
const phylums = require("../utils/kingdoms");
const classes = require("../utils/kingdoms");
const orders = require("../utils/kingdoms");
const families = require("../utils/kingdoms");
const genuses = require("../utils/kingdoms");
const species = require("../utils/kingdoms");

const initialValues = {
    kingdom: "",
    phylum: "",
    class: "",
    order: "",
    family: "",
    genus: "",
  };
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));


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

function createData(
    number,
    Species,
    Family,
    Locality,
    Habitat,
    Size,
    GIS,
    Additional
) {
    return { number, Species, Family, Locality, Habitat, Size, GIS, Additional };
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function Images() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={styles.main}>
            <Header index={2}></Header>
            <div className={styles.main_box}>
                <Box component="section">
                    <Grid container item xs={12} md={12} sx={{ mx: "auto", mt: 10 }}>
                        <Grid item xs={12} md={12}>
                            <Typography
                                gutterBottom
                                component="h2"
                                variant="h2"
                                style={{ color: "#c44d34", fontSize: 30 }}
                            >
                                Images Search
                            </Typography>
                            <Typography
                                gutterBottom
                                component="description"
                                variant="div"
                                style={{ fontSize: 20 }}
                            >
                                The images remain the property of the copyright owners who give
                                permission for non-commercial use for teaching purposes in
                                lectures <br /> and on meetings presentations and posters,
                                provided their copyright and the source is acknowledged, but are
                                NOT free for publication <br /> in any format or manner.
                            </Typography>
                            <Divider></Divider>
                            <Grid item xs={12} style={{ borderRadius: "5px", marginTop: 15 }}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object().shape({
                    species: Yup.object().shape({
                      english: Yup.string().required(
                        "Patient english name is required"
                      ),
                      bangla: Yup.string().required(
                        "patient bangla is required"
                      ),

                      // gender: Yup.string().required("patient gender is required"),
                      // address: Yup.string().required("patient adressis required"),
                    }),

                    kingdom: Yup.string("Add Remarks").required("Add Remark"),
                    phylum: Yup.string("Add filmType").required("Add filmType"),
                    class: Yup.string("Add priority").required("Add priority"),
                    order: Yup.string("Add priority").required("Add priority"),
                    genus: Yup.string("Add priority").required("Add priority"),
                  })}
                  onSubmit={async (
                    values,
                    {
                      resetForm,
                      setErrors,
                      setStatus,
                      setSubmitting,
                      setFieldValue,
                    }
                  ) => {
                    try {
                      // console.log({ values });
                      // // console.log(values.reportfile.name);
                      // let xrayData = values;
                      // xrayData.createdBy = {
                      //   name: loggedUser.name,
                      //   userId: loggedUser.userId,
                      // };
                      // xrayData.createdAt = new Date().getTime();
                      // console.log({ loggedUser: loggedUser.userId });
                      // const data = new FormData();
                      // data.append("data", JSON.stringify(xrayData));
                      // let files = values.reportfile;
                      // if (files.length != 0) {
                      //   for (const single_file of files) {
                      //     data.append('reportfile', single_file)
                      //   }
                      // }
                      // // data.append("reportfile", values.reportfile);
                      // callApi.post("/xray/new", data, {
                      //   headers: {
                      //     "Content-Type": "multipart/form-data"
                      //   }
                      // }).then((res) => {\
                      //   console.log("response", res);
                      //   enqueueSnackbar("Report  Uploaded Successfully", {
                      //     variant: "success",
                      //     // action: <Button>See all</Button>
                      //   });
                      //   setErrors(false);
                      // });
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
                      <Grid container xs={12} spacing={2}>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="genuses"
                                name={values?.genus}
                                options={genuses}
                                key="genuses"
                                getOptionLabel={(option) => option.name}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("genus", value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.genus && errors?.genus
                                    )}
                                    helperText={touched?.genus && errors?.genus}
                                    style={{ padding: "2px" }}
                                    label="---Select genus---"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.genus}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Autocomplete
                                size="small"
                                disablePortal
                                id="kingdoms"
                                name={values?.kingdom}
                                options={kingdoms}
                                key="kingdoms"
                                getOptionLabel={(option) => option.name}
                                // sx={{ width: 300 }}
                                onChange={(e, value) => {
                                  setFieldValue("kingdom", value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    error={Boolean(
                                      touched?.species && errors?.species
                                    )}
                                    helperText={
                                      touched?.species && errors?.species
                                    }
                                    style={{ padding: "2px" }}
                                    label="---Select Species---"
                                    variant="outlined"
                                    placeholder="Select"
                                    value={values?.kingdom}
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.commonName && errors?.commonName
                                )}
                                helperText={
                                  touched?.commonName && errors?.commonName
                                }
                                label="Common Name"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.commonName}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.taxonomy && errors?.taxonomy
                                )}
                                helperText={
                                  touched?.taxonomy && errors?.taxonomy
                                }
                                label="Higher Taxonomy"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.taxonomy}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <TextField
                                size="small"
                                error={Boolean(
                                  touched?.distribution && errors?.distribution
                                )}
                                helperText={
                                  touched?.distribution && errors?.distribution
                                }
                                label="Distribution"
                                variant="outlined"
                                placeholder="Select"
                                value={values?.distribution}
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Button
                                className={styles.bg_primary}
                                style={{
                                  width: "80px",
                                  maxHeight: "80px",
                                  minWidth: "40px",
                                  minHeight: "40px",
                                  color: "white",
                                  boxShadow: "1px 1px 4px grey",
                                  marginBottom: "10px",
                                }}
                              >
                                Search
                              </Button>
                            </Grid>
                          </Grid>

                      <br />
                    </Form>
                  )}
                </Formik>
              </Grid>

                            <Divider></Divider>
                            <Grid container xs={12} md={12} sx={{ mt: 5, mb: 0 }}>
                                {speciesList?.map((item, index) => {
                                    return (
                                        <Grid
                                            key={`species${index}`}
                                            item
                                            xs={6}
                                            md={3}
                                            sx={{ mb: 3 }}
                                        >
                                            <Card
                                                sx={{
                                                    maxWidth: 345,
                                                    border: "1px solid #e9e9e9",
                                                    boxShadow: "1px 1px 5px #efefef",
                                                    borderRadius: 3,
                                                }}
                                            >
                                                <Image
                                                    component="img"
                                                    height="700"
                                                    src={imageSrc}
                                                    alt="green iguana"
                                                />
                                                <CardContent sx={{ height: 100 }}>
                                                    <Typography gutterBottom variant="h4" component="div">
                                                        {item.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {item.description.slice(0, 50)}......
                                                    </Typography>
                                                </CardContent>
                                                <Grid container xs={12}>
                                                    <Grid xs={4}></Grid>
                                                    <Grid xs={4}></Grid>
                                                    <Grid xs={4} className={styles.card_button}>
                                                        <Button
                                                            size="small"
                                                            sx={{ color: "white" }}
                                                            onClick={handleClickOpen}
                                                        >
                                                            See Details
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Card>

                                        </Grid>
                                    );
                                })}
                            </Grid>


                        </Grid>
                    </Grid>

                </Box>
            </div>
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
                    <Image
                        src={imageSrc}
                        // width={500}
                        height={400}
                    ></Image>
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
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography
                        gutterBottom
                        style={{ fontWeight: 300, fontFamily: "Roboto" }}
                    >
                        Aenean lacinia bibendum nulla sed consectetur.
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue
                        laoreet rutrum faucibus dolor auctor. Aenean lacinia
                        bibendum nulla sed consectetur. Praesent commodo
                        cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non
                        metus auctor fringilla. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Vivamus
                        sagittis lacus vel augue laoreet rutrum faucibus
                        dolor auctor.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                </DialogActions>
            </BootstrapDialog>
            <Footer />
        </div>
    );
}

const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
        author: "@bkristastucchio",
        featured: true,
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
        author: "@rollelflex_graphy726",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
        author: "@helloimnik",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
        author: "@nolanissac",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
        author: "@hjrc33",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
        author: "@arwinneil",
        featured: true,
    },
    // {
    //   img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    //   title: "Basketball",
    //   author: "@tjdragotta",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    //   title: "Fern",
    //   author: "@katie_wasserman",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    //   title: "Mushrooms",
    //   author: "@silverdalex",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    //   title: "Tomato basil",
    //   author: "@shelleypauls",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    //   title: "Sea star",
    //   author: "@peterlaster",
    // },
    // {
    //   img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    //   title: "Bike",
    //   author: "@southside_customs",
    // },
];
