/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-countup component
import CountUp from "react-countup";
import styles from "../../../../styles/Home.module.css";

// Material Kit 2 React components
import { Card, CardContent, CardActions, Typography, Grid } from "@mui/material";

function DefaultCounterCard({ color, count,backgroundColor, title, description,actionIcon, ...rest }) {
  return (
    <Grid  >
      
      <CardContent   sx={{ display: { xs: "none", lg: "flex" } }}  >
        <Grid > {actionIcon}</Grid>
       {/* <Grid><Typography></Typography></Grid> */}
        <Grid><Typography variant="h1" component="div" color="white">
        <CountUp  end={count} duration={1} {...rest} />
        </Typography>
        <Typography variant="h1" component="div" color="white">
       {title}
        </Typography>
       
        <Typography variant="body2" color="white" fontWeight={600}>
          {description}
          <br />
          {/* {'"a benevolent smile"'} */}
        </Typography></Grid>
      </CardContent>
    </Grid>
  );
}

// Setting default props for the DefaultCounterCard
DefaultCounterCard.defaultProps = {
  color: "info",
  description: "",
  title: "",
};

// Typechecking props for the DefaultCounterCard
DefaultCounterCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  count: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default DefaultCounterCard;
