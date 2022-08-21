import { Grid } from '@mui/material';
import { makeStyles } from "@mui/styles";
import React from 'react';
import styles from "../../../../styles/Home.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "30px",

    // [theme.breakpoints.down("xs")]: {
    //   width: "25px",
    //   height: "25px",
    // },
    // "&:hover": {
    //   color: theme.palette.info.main,
    // },
  },
}));
const Footer = ({ color }) => {
  const classes = useStyles();
    return (
        <div>
          <Grid item container spacing={2} justify="center">
      <Grid
        item
   
      >
        {/* <HomeIcon
          className={classes.snsIcon}
         
        /> */}
      </Grid>
      <Grid
        item
      
       
      >
        <FacebookIcon
           className={classes.snsIcon}
        
        />
      </Grid>
      <Grid
        item
      
      >
        <InstagramIcon
         className={classes.snsIcon}
        
        />
      </Grid>
      <Grid
        item
       
      >
        <GitHubIcon
         className={classes.snsIcon}
        
        />
      </Grid>
      {/* add social media*/}
    </Grid>
                <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>H-Tech</span>
        </a>
        </div>
    );
};

export default Footer;