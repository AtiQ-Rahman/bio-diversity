import Head from "next/head";
import Image from "next/image";
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Header from "../components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";
import Breadcrumbs from "../components/Home/ui-component/extended/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { IconChevronRight } from "@tabler/icons";
import navigation from "../components/Admin/menu-items";
import { drawerWidth } from "../store/constant";
import { SET_MENU } from "../store/actions";
import { Container } from "@mui/system";
import { Sales } from "../components/Sales";

import Counters from "../components/Home/counters";
import { SpecicesCounter } from "../components/SpeciesCounter";
import { ImagesCounter } from "../components/ImagesCounter";
import { RequestCounter } from "../components/RequestCounter";
import callApi from "../utils/callApi";

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
export default function Home() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const [totalImages, setTotalImages] = useState([])
  const [totalAvailable, setTotalAvailable] = useState([])
  const [totalRequested, setTotalRequested] = useState([])
  const [totalSpeciesByDivisions, setTotalSpeciesByDivisions] = useState({})
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    async function fetchData() {
      let response = await callApi("/count-all-species", {});
      if (response.data) {
        setTotalImages(response.data.totalAvailableImages)
        setTotalAvailable(response.data.totalAvailable)
        setTotalRequested(response.data.totalRequestedSpecies)
        setTotalSpeciesByDivisions(response.data.totalSpeciesByDivisions)
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);
  return (
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
          boxshadow: '1px 1px 10px #d9d5d5 !important',
          transition: leftDrawerOpened
            ? theme.transitions.create("width")
            : "none",
        }}
      >
        <Toolbar sx={{
          boxShadow: '1px 1px 10px #d9d5d5',

        }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      {/* main content */}
      <Main theme={theme} open={leftDrawerOpened} sx={{ mt: 5 }}>
        {/* breadcrumb */}
        <Breadcrumbs
          separator={IconChevronRight}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        <div>
          <Box component="section"  >
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                py: 8,

              }}
            >
              <Container maxWidth={false}>
                <Grid container spacing={3}>

                  {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid> */}
                  <Grid item lg={12} md={12} xl={12} xs={12} >
                    <Sales divisionsCounter={totalSpeciesByDivisions} />
                  </Grid>
                  {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                    <TrafficByDevice sx={{ height: "100%" }} />
                  </Grid> */}
                  <Grid

                    item
                    lg={4}
                    sm={6}
                    xl={4}
                    xs={12}
                  >
                    <SpecicesCounter className={styles.dashboard} counter={totalAvailable} />
                    {/* <Counters /> */}
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={6}
                    xs={12}
                  >
                    <ImagesCounter className={styles.dashboard} counter={totalImages} />
                  </Grid>
                  <Grid
                    item
                    xl={4}
                    lg={4}
                    sm={6}
                    xs={12}
                  >
                    <RequestCounter className={styles.dashboard} counter={totalRequested} />
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
        </div>
      </Main>
    </Box>
  );
}
