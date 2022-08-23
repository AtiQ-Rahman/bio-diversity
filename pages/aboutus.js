import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
const imageSrc = require("../pages/assets/images/species1.jpg");

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
} from "@mui/material";
import Header from "./components/Home/Header";
import CollapseCard from "./components/Home/collapseCard";
import SearchSection from "./components/Home/Header/SearchSection";
import Paper from "@mui/material/Paper";
import { Link, Router } from "react-router-dom";
import Image from "next/image";
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
const Species = () => {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  return (
    <div className={styles.body}>
      <Header index={3}/>

      <div className={styles.main}>
        <Box
          component="section"
          className={styles.main_box}
        >
          {/* Species Search */}
          <Grid container item xs={12} sx={{ mx: "auto" }}>
            <Grid item xs={8}>
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
                  <TextField label="Species Search" color="secondary" focused />
                  <TextField label="Species Search" color="secondary" focused />
                  <TextField label="Species Search" color="secondary" focused />
                  <TextField label="Species Search" color="secondary" focused />
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
            <Grid item xs={4} style={{paddingLeft: "20px"}} className={styles.side_bar}>
              <Typography gutterBottom variant="h2" component="div">
                Latest Additions
              </Typography>
              <CollapseCard />
            </Grid>
          </Grid>
        </Box>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>H-Tech</span>
        </a>
      </footer>
    </div>
  );
};

export default Species;
