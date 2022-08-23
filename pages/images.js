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
  CardContent,
  tableCellClasses,
} from "@mui/material";
import Footer from "./components/Home/Footer/Footer";
import Counters from "./components/Home/counters";
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
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
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

      <Header index={3}></Header>
      <div className={styles.main_box}  >
        <Box component="section" sx={{ mt: 10,}}>

        <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
            <Grid item xs={12} md={8}>
            <Typography gutterBottom component="h2" variant="h2">
                  Species Search
                </Typography>
                <Typography gutterBottom component="description" variant="div">
                The images remain the property of the copyright owners who give permission for non-commercial use for teaching purposes in lectures and on meetings presentations and posters, provided their 
                copyright and the source is acknowledged, but are NOT free for publication in any format or manner.
                </Typography>
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
                  <Button
                    type="button"
                    // onClick={}
                    style={{color: "white" , background:"purple" ,          maxWidth: "80px",
                    maxHeight: "80px",
                    minWidth: "40px",
                    minHeight: "40px"
           }}
                  >
                    Search
                  </Button>
                </Box>
              </Grid>
                    
              <h1>Table</h1>
              <Grid item xs={12}  sx={{boxShadow: 4,p:4}}    style={{ borderRadius: "10px", }} >
                <TableContainer component={Paper}    >
                  <Table sx={{ minWidth: 650 }} aria-label="customized table" >
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>SI</StyledTableCell>
                        <StyledTableCell align="center">Species</StyledTableCell>
                        <StyledTableCell align="center">Family</StyledTableCell>
                        <StyledTableCell align="center">Locality</StyledTableCell>
                        <StyledTableCell align="center">Habitat</StyledTableCell>
                        <StyledTableCell align="center">Size &nbsp;(cm)</StyledTableCell>
                        <StyledTableCell align="center">GIS</StyledTableCell>
                        <StyledTableCell align="center">Additional button</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody   >
                      {rows.map((row) => (
                        <StyledTableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.number}
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.Species}</StyledTableCell>
                          <StyledTableCell align="center">{row.Family}</StyledTableCell>
                          <StyledTableCell align="center">{row.Locality}</StyledTableCell>
                          <StyledTableCell align="center">{row.Habitat}</StyledTableCell>
                          <StyledTableCell align="center">{row.Size}</StyledTableCell>
                          <StyledTableCell align="center">{row.GIS}</StyledTableCell>
                          <StyledTableCell align="center">
                            <Button style={{    maxWidth: "80px",
                             maxHeight: "80px",
                             minWidth: "40px",
                             minHeight: "40px"}} onClick={handleOpen} sx={{ mb: 1, mr:0.5 }} variant="outlined"  >
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
                            
                              <Grid sx={{ maxWidth: 345 }}    >    <Image src={imageSrc} 
                                    // width={500}
                                    // height={300}
                                  
                                  ></Image></Grid>
                              
                                <CardContent>
        <Typography gutterBottom variant = "h5" component = "div">
          Lizard
        </Typography>
        <Typography variant   = "body2" color  = "text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
                                {/* <CardActions>
                                <Button size="small">Share</Button>
                                <Button size="small">Learn More</Button>
                               </CardActions> */}
                              </Box>
                            </Modal>
                            <br />
                            <Button
                             style={{ maxWidth: "80px",
                             maxHeight: "80px",
                             minWidth: "40px",
                             minHeight: "40px"
                    }}
                              type="button"
                              onClick={() => router.push("/map")}
                              variant="outlined"
                            >
                              View&nbsp;map
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
              </Grid>

              <Grid item xs={12} padding="30">
              <ImageList
            sx={{
              width:"50%",
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
              </Grid>
              <Counters ></Counters>
            </Grid>
            <Grid  item
              xs={12}
              md={3}
              className={styles.side_bar}
              m={2}
              sx={{boxShadow: 4,p:4}} >
              <Typography gutterBottom variant="h2" component="div">
                Latest Additions
              </Typography>
              <CollapseCard />
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
