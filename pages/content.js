import { Card, Grid, Typography } from "@mui/material";
import { Box, padding, textAlign } from "@mui/system";
import React from "react";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

theme.typography.h1 = {
  paddingBottom: "50px",
  fontSize: "1.8rem",
  paddingLeft: "10px",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "4rem",
  },
};
const content = () => {
  return (
    <Box>
      <Header index={8} />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <ThemeProvider theme={theme}>
            <Box>
              <Typography variant="h1" textAlign="center">
              content
              </Typography>
              <Typography variant="h1">Under Development</Typography>
            </Box>
            {/* <Typography >Responsive h3</Typography> */}
          </ThemeProvider>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default content;
