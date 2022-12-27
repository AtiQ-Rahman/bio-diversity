import Head from "next/head";
import Image from "next/legacy/image";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import Header from "../../components/Admin/Header";
import Sidebar from "../../components/Admin/Sidebar";
import Breadcrumbs from "../../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronRight } from "@tabler/icons";
import navigation from "../../components/Admin/menu-items";
import { drawerWidth } from "../../store/constant";
import { SET_MENU } from "../../store/actions";
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
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
  Dialog,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import callApi from "../../utils/callApi";
const imageSrc = require("../../assets/images/species1.jpg");

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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c44d34",
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
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);
export default function ManageRequestedSpecies() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const router = useRouter();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };
  const [requestedSpecies , setRequestedSpecies] = useState([])
  async function fetchData() {
    let response = await callApi("/get-all-requested-species", {});
    setRequestedSpecies(response.data);
  }
  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);
  return (
    <div className={styles.body}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            bgcolor: theme.palette.background.default,
            transition: leftDrawerOpened
              ? theme.transitions.create("width")
              : "none",
          }}
        >
          <Toolbar
            sx={{
              boxShadow: "1px 1px 10px #d9d5d5",
            }}
          >
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={leftDrawerOpened}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        <Main theme={theme} open={leftDrawerOpened} sx={{ mt: 8 }}>
          <Breadcrumbs
            separator={IconChevronRight}
            navigation={navigation}
            icon
            title
            rightAlign
          />
          <div className={styles.main}>
            <Box component="section" className={styles.main_box}>
              {/* Species Search */}
              <Grid container item xs={12} md={12} sx={{ mx: "auto" }}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ marginBottom: "10px" }}>
                    <Typography gutterBottom component="h2" variant="h2">
                      Species Search
                    </Typography>
                  </Card>

                  <Divider></Divider>
                  <Grid item xs={11} style={{ borderRadius: "5px" }}>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        label="Search By Name"
                        color="secondary"
                        className={styles.custom_input}
                      />
                      <TextField label="Search By  Family" color="secondary" />
                      <TextField label="Select Country" color="secondary" />
                      <TextField label="Select Area" color="secondary" />
                      <Button
                        type="button"
                        // onClick={}
                        className={styles.bg_primary}
                        style={{
                          color: "white",
                          height: "50px",
                          maxWidth: "80px",
                          maxHeight: "80px",
                          minWidth: "40px",
                          minHeight: "40px",
                        }}
                      >
                        Search
                      </Button>
                    </Box>
                  </Grid>

                  {/* TABLE */}
                  <Divider></Divider>

                  <h1>Requested Species ({requestedSpecies.length})</h1>
                  <br />
                  <Grid
                    item
                    xs={12}
                    sx={{ b: 1, mb: 3 }}
                    style={{ borderRadius: "10px" }}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 650 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>SI</StyledTableCell>
                            <StyledTableCell align="center">
                              Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Kingdom
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Locality
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Category
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Species
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Status
                            </StyledTableCell>
                            {/* <StyledTableCell align="center">GIS</StyledTableCell> */}
                            <StyledTableCell align="center">
                              Additional button
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {requestedSpecies.map((row ,index) => (
                            <StyledTableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <StyledTableCell component="th" scope="row">
                                {index + 1}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Typography component="div" variant="div">
                                  {row.bangla}
                                </Typography>
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.kingdom}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.districts[0].place_name}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.category}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {row.species}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                              {row.status == "approved" ?
                                  (<Typography component="div" variant="div" style={{ background: "green", color: "white", padding: "5px", borderRadius: "8px" }}>
                                    {row.status}
                                  </Typography>)
                                  :
                                  (
                                    <Typography component="div" variant="div" style={{ background: "red", color: "white", padding: "5px", borderRadius: "8px" }}>
                                      {row.status}
                                    </Typography>)
                                }
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <Box
                                  sx={{ flexGrow: 1, flexDirection: "column" }}
                                >
                                  <Button
                                    className={styles.bg_secondary}
                                    style={{
                                      width: "80px",
                                      maxHeight: "80px",
                                      minWidth: "40px",
                                      minHeight: "40px",
                                      color: "white",
                                      boxShadow: "1px 1px 4px grey",
                                    }}
                                    onClick={handleClickOpen}
                                    sx={{ mb: 1, mr: 0.5 }}
                                    // variant="outlined"
                                  >
                                    <Icon icon="carbon:view-filled" /> &nbsp;
                                    View
                                  </Button>
                                  <Button
                                    className={styles.bg_primary}
                                    style={{
                                      width: "80px",
                                      maxHeight: "80px",
                                      minWidth: "40px",
                                      minHeight: "40px",
                                      color: "white",
                                      boxShadow: "1px 1px 4px grey",
                                    }}
                                    onClick={handleClickOpen}
                                    sx={{ mb: 1, mr: 0.5 }}
                                    // variant="outlined"
                                  >
                                    <Icon icon="healthicons:i-documents-accepted" />
                                    &nbsp; Accept
                                  </Button>

                                  {/* =======MODAL===== */}

                                  <br />
                                  <Button
                                    style={{
                                      boxShadow: "1px 1px 4px grey",
                                      maxHeight: "80px",
                                      width: "80px",
                                      background: "red",
                                      minHeight: "40px",
                                      color: "white",
                                    }}
                                    type="button"
                                    // onClick={() => router.push("/map")}
                                  >
                                    <Icon icon="ic:twotone-leave-bags-at-home" />
                                    &nbsp;Decline
                                  </Button>
                                </Box>
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
                </Grid>
              </Grid>
            </Box>
          </div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
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
              Details
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Image
                src={imageSrc}
                // width={500}
                height={500}
                alt="species-details"
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
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </Typography>
              <Typography
                gutterBottom
                style={{ fontWeight: 300, fontFamily: "Roboto" }}
              >
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor. Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor
                fringilla. Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum
                faucibus dolor auctor.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </DialogActions>
          </BootstrapDialog>
        </Main>
      </Box>
    </div>
  );
}
