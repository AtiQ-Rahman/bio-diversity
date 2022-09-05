import Head from "next/head";
import Image from "next/image";


import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";
import Header from "./components/Admin/Header";
import Sidebar from './components/Admin/Sidebar';
import Breadcrumbs from './components/Home/ui-component/extended/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { IconChevronRight } from '@tabler/icons';
import navigation from './components/Admin/menu-items';
import { drawerWidth } from './store/constant';
import { SET_MENU } from './store/actions';
import React from "react";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
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
const imageSrc = require("../pages/assets/images/species1.jpg");

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
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
                        position: 'absolute',
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
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));
export default function ManageSpecies() {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
  
        setImage(i);
        setCreateObjectURL(URL.createObjectURL(i));
      }
    };
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

    useEffect(() => {
        dispatch({ type: SET_MENU, opened: !matchDownMd });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);
    return (
        <div className={styles.body} >
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.background.default,
                        transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                    }}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

                {/* main content */}
                <Main theme={theme} open={leftDrawerOpened}>

                    <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                    <div className={styles.main} sx={{ height: "100%" }}>
                        <Box component="section" className={styles.main_box} >
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
                                            <TextField label="Search By Name" color="secondary" className={styles.custom_input} />
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

                                    <h1>Total Species Found (5)</h1>
                                    <br />
                                    <Grid
                                        item
                                        xs={12}
                                        sx={{ b: 1, mb: 3 }}
                                        style={{ borderRadius: "10px" }}
                                    >
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                                                {/* <TableHead>
                      <TableRow>
                        <StyledTableCell>SI</StyledTableCell>
                        <StyledTableCell>Image</StyledTableCell>

                        <StyledTableCell align="center">
                          Species
                        </StyledTableCell>
                        <StyledTableCell align="center">Family</StyledTableCell>
                        <StyledTableCell align="center">
                          Locality
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Habitat
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Size &nbsp;(cm)
                        </StyledTableCell>
                        <StyledTableCell align="center">GIS</StyledTableCell>
                        <StyledTableCell align="center">
                          Additional button
                        </StyledTableCell>
                      </TableRow>
                    </TableHead> */}
                                                <TableBody>
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
                                                            <StyledTableCell align="center">
                                                                <Typography component="div" variant="div">{row.Species}</Typography>
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.Family}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.Locality}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.Habitat}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.Size}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {row.GIS}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Box sx={{ flexGrow: 1, flexDirection: 'row' }}>
                                                                    <Button
                                                                        className={styles.bg_primary}
                                                                        style={{
                                                                            width: "80px",
                                                                            maxHeight: "80px",
                                                                            minWidth: "40px",
                                                                            minHeight: "40px",
                                                                            color: 'white',
                                                                            boxShadow: '1px 1px 4px grey'
                                                                        }}
                                                                        onClick={handleClickOpen}
                                                                        sx={{ mb: 1, mr: 0.5 }}
                                                                    // variant="outlined"
                                                                    >
                                                                        <Icon icon="dashicons:edit-large" />&nbsp; Edit
                                                                    </Button>

                                                                    {/* =======MODAL===== */}

                                                                    <br />
                                                                    <Button
                                                                        style={{
                                                                            boxShadow: '1px 1px 4px grey',
                                                                            maxHeight: "80px",
                                                                            width: "80px",
                                                                            background: 'white',
                                                                            minHeight: "40px",
                                                                            color: '#0f4c39'
                                                                        }}
                                                                        type="button"
                                                                        // onClick={() => router.push("/map")}

                                                                    >
                                                                        <Icon icon="fluent:delete-16-filled" />&nbsp; Delete
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
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} style={{ fontWeight: 600, fontSize: 20, fontFamily: 'Raleway', color: '#0f4c39' }}>
                        Species Details
                        </BootstrapDialogTitle>
                        <DialogContent dividers>

                                <Grid >

                                    <Grid container spacing={3} >
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="Species"
                                                name="Species"
                                                label="Species Name"
                                                fullWidth
                                                autoComplete="Species Name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="Family"
                                                name="Family"
                                                label="Family"
                                                fullWidth
                                                autoComplete="Family"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="Locality"
                                                name="Locality"
                                                label="Locality"
                                                fullWidth
                                                autoComplete="Locality"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="Habitat"
                                                name="Habitat"
                                                label="Habitat"
                                                fullWidth
                                                autoComplete="Habitat"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="Size (cm)"
                                                name="Size (cm)"
                                                label="Size (cm)"
                                                fullWidth
                                                autoComplete="Size (cm)"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="latitude(GIS)"
                                                name="latitude(GIS)"
                                                label="latitude(GIS)"
                                                fullWidth
                                                autoComplete="latitude(GIS)"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="longitude(GIS)"
                                                name="longitude(GIS)"
                                                label="longitude(GIS)"
                                                fullWidth
                                                autoComplete="longitude(GIS)"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label="Descripton"
                                                multiline
                                                rows={4}
                                                placeholder="Type your Descripton here"
                                                variant="outlined"
                                                fullWidth
                                                required
                                            />
                                        </Grid>

                                        <Grid>
                                            <TextField
                                                sx={{
                                                    flexGrow: 1,

                                                    mt: 2,
                                                    ml: 3,
                                                }}
                                                type="file"
                                                name="myImage"
                                                onChange={uploadToClient}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Button
                                        className={styles.bg_primary}

                                        style={{
                                            width: "80px",
                                            maxHeight: "80px",
                                            minWidth: "40px",
                                            minHeight: "40px",
                                            color: "white",
                                            boxShadow: "1px 1px 4px grey",
                                            marginBottom: "10px"
                                        }}
                                    >
                                        Upload
                                    </Button>
                                </Grid>
                           
                        </DialogContent>
                        <DialogActions>
                            <Button size="small" className={styles.bg_primary} sx ={{color:"white"}}>Save</Button>
                            <Button size="small" className={styles.bg_primary} sx ={{color:"white"}}>Cancel</Button>
                        </DialogActions>
                    </BootstrapDialog>
                </Main>



            </Box>

        </div>

    );
}
