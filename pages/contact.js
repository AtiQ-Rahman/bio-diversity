import { Card, Grid } from '@mui/material';
import { Box, padding, textAlign } from '@mui/system';
import React from 'react';
import Footer from '../components/Home/Footer/Footer';
import Header from "../components/Home/Header";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Icon } from '@iconify/react';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>

  </React.Fragment>
);
const contact = () => {
  return (
    <Box>
      <Header index={8} />
      <Box sx={{ m: 15 }}>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          Contact & Help
        </Typography>
        <Grid container spacing={4} sx={{ mb: 5 }}>

          <Grid item xs={12} md={12}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                    Professor Dr. Mohammad Azmal Hossain Bhuiyan
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Icon icon="dashicons:email-alt" color="red" height={20} />
                    <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                      <a href="mailto:bhuiyan.azmal@du.ac.bd" style={{ paddingLeft: "2px" }}>bhuiyan.azmal@du.ac.bd</a>
                    </Typography>
                  </Box>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
                    Dr. MoniruzzamanKhondker, Supernumerary Professor
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Icon icon="dashicons:email-alt" color="red" height={20} />

                    <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                      <a href="mailto:mkhondker@du.ac.bd" style={{ paddingLeft: "2px" }}>mkhondker@du.ac.bd</a>
                    </Typography>
                  </Box>

                </CardContent>
                {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Card variant="outlined" sx={{
          background: "#e7e7e7"
        }}>
          <CardContent>
            <Box sx={{ display: "flex" }} color="#20acb3">
              <Icon icon="carbon:warning-filled" height={25}/>
              <Typography sx={{ fontSize: 25, ml: 1 }} gutterBottom>
                For Help
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 20 }} component="div">
              The project’s domain has been thought to create a help line to all types of users of the components of the Biodiversity of Bangladesh. To know the geographical distribution of a particular species on the geo-political map of Bangladesh including its various other features
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Footer />
    </Box>
  );
};

export default contact;