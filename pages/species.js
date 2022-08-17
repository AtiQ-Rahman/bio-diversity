import React from 'react';
import styles from "../styles/Home.module.css";
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';
import Header from './components/Header';
import Paper from '@mui/material/Paper';
import {
    AppBar,
    Box,
    CssBaseline,
    Grid,
   
    Toolbar,
    useMediaQuery,
  } from "@mui/material";
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
const Species = () => {
    const classes = useStyles();
    return (
      <div>
          <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0}>
        <Toolbar>
          <Header  />
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
     
      </div>

    );
};

export default Species;