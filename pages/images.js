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
  Button,Paper,
  Modal,
} from "@mui/material";
import Footer from "./components/Home/Footer/Footer";
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
const rows = [
  createData(
    1,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),
  createData(
    2,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    3,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    4,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),

  createData(
    5,
    "Bryopsis indica Gepp & Gepp",
    "Bryopsidaceae",
    "St Martin’s Island (SMI)",
    "rocks, corals",
    "2-3",
    "20.622990,92.320325"
  ),
];
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
  const handleClose = () => setOpen(false);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Header index={2}></Header>
      <div className={styles.main}>
        <Box component="section">
        <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
            <Grid item xs={12} md={8}>
              <h1>Species Search</h1>
              <Grid item xs={12}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField label="Search By Name" color="secondary"  />
                  <TextField label="Search By  Family" color="secondary"  />
                  <TextField label="Select Country" color="secondary"  />
                  <TextField label="Select Area" color="secondary"  />
                </Box>
              </Grid>

              {/* TABLE */}

              <h1>Table</h1>
              <Grid item xs={12} padding="30">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>SI</TableCell>
                        <TableCell align="right">Species</TableCell>
                        <TableCell align="right">Family</TableCell>
                        <TableCell align="right">Locality</TableCell>
                        <TableCell align="right">Habitat</TableCell>
                        <TableCell align="right">Size &nbsp;(cm)</TableCell>
                        <TableCell align="right">GIS</TableCell>
                        <TableCell align="right">Additional button</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.number}
                          </TableCell>
                          <TableCell align="right">{row.Species}</TableCell>
                          <TableCell align="right">{row.Family}</TableCell>
                          <TableCell align="right">{row.Locality}</TableCell>
                          <TableCell align="right">{row.Habitat}</TableCell>
                          <TableCell align="right">{row.Size}</TableCell>
                          <TableCell align="right">{row.GIS}</TableCell>
                          <TableCell align="right">
                            <Button onClick={handleOpen} variant="outlined">
                              Details
                            </Button>

                            {/* =======MODAL===== */}

                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style} className="modal-size">
                                <Typography
                                  id="modal-modal-title"
                                  justifyContent="center"
                                  variant="h6"
                                  component="h2"
                                >
                                  <Image
                                    src={imageSrc}
                                    width={500}
                                    height={300}
                                  ></Image>
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  Duis mollis, est non commodo luctus, nisi erat
                                  porttitor ligula. Duis mollis, est non commodo
                                  luctus, nisi erat porttitor ligula. Duis
                                  mollis, est non commodo luctus, nisi erat
                                  porttitor ligula. Duis mollis, est non commodo
                                  luctus, nisi erat porttitor ligula. Duis
                                  mollis, est non commodo luctus, nisi erat
                                  porttitor ligula. Duis mollis, est non commodo
                                  luctus, nisi erat porttitor ligula. Duis
                                  mollis, est non commodo luctus, nisi erat
                                  porttitor ligul a. Duis mollis, est non c
                                  ommodo luctus, nisi era t porttitor ligula.
                                  Duis mollis, est non commodo luctus, nisi erat
                                  porttitor ligula.
                                </Typography>
                              </Box>
                            </Modal>
                            <br />
                            <Button
                              type="button"
                              onClick={() => router.push("/map")}
                              variant="outlined"
                            >
                              View&nbsp;map
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}style={{paddingLeft: "20px"}} className={styles.side_bar}>
              <Typography gutterBottom variant="h2" component="div">
                Latest Additions
              </Typography>
              <CollapseCard />
            </Grid>
          </Grid>
          <ImageList
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
          </ImageList>
        </Box>
      </div>
      <footer className={styles.footer}>
     <Footer/>
      </footer>
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
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
