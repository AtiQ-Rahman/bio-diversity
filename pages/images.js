import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "../styles/Home.module.css";
import CollapseCard from "./components/Home/collapseCard";
import Image from "next/image";
const imageSrc = require("../pages/assets/images/species1.jpg");
import { useRouter } from "next/router";
import Header from "./components/Home/Header";
import { styled } from "@mui/material/styles";
import { speciesList } from "./utils/speciesList";
import PropTypes from "prop-types";
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
} from "@mui/material";
import Footer from "./components/Home/Footer/Footer";
import Counters from "./components/Home/counters";
import CloseIcon from "@mui/icons-material/Close";
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
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
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
            <Grid item xs={12} md={12} >
              <Typography
                gutterBottom
                component="h2"
                variant="h2"
                style={{ color: "#0f4c39", fontSize: 30 ,}}
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
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField label="Search By Name" color="secondary" />
                  <TextField label="Search By  Family" color="secondary" />
                  <TextField label="Select Country" color="secondary" />
                  <TextField label="Select Area" color="secondary" />
                  <Button
                    type="button"
                    // onClick={}
                    className={styles.bg_primary}
                    style={{
                      color: "white",
                      maxWidth: "80px",
                      maxHeight: "80px",
                      minWidth: "90px",
                      minHeight: "40px",
                      marginTop: "13px",
                      fontWeight: 600,
                    }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>
              <Divider></Divider>
              <Grid container xs={12} md={12} sx={{ mt: 5, mb: 0 }}>
                {speciesList?.map((item) => {
                  return (
                    <Grid item xs={6} md={3} sx={{ mb: 3 }}>
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
                    </Grid>
                  );
                })}
              </Grid>

              <Grid item xs={12} padding="30"></Grid>
              {/* <Counters></Counters> */}
            </Grid>
          </Grid>
          {/* <ImageList
            sx={{
              width:"80%",
              mx:"auto",
              // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
              transform: "translateZ(0)",
            }}
            rowHeight={200}
            gap={1}
          >
            {itemData.map((item) => {
              const cols = 1;
              const rows = 1;

              return (
                <ImageListItem key={item.img} cols={cols} rows={rows}>
                  <img
                    {...srcset(item.img, 250, 200, rows, cols)}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    }}
                    title={item.title}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`star ${item.title}`}
                      >
                        <StarBorderIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              );
            })}
          </ImageList> */}
        </Box>
      </div>

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
