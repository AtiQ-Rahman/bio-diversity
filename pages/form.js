import React, { useState } from "react";
// import Footer from '../components/Home/Footer/Footer';
// import Header from "../components/Home/Header";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
// import ImageUpload from "./ImageUpload";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import Footer from "../components/Home/Footer/Footer";

const map = require("../assets/images/map.png");
const RequestForm = () => {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };
  return (
    <div >
      <Header index={0} />
      <Grid
        sx={{
          // p: 2,
          margin: "auto",
          maxWidth: 1000,
          // flexGrow: 1,
          border: 0,
        }}
        style={{ backgroundColor: "rgb(225, 253, 249)" }}
      >
        <Grid sx={{ m: 15 }}>
          <Typography gutterBottom variant="h3" align="center" sx={{p:2}}>
            Enter Your Form
          </Typography>
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
              marginBottom:"10px"
            }}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      <br />
      <Footer sx={{ m: 10 }} />
    </div>
  );
};

export default RequestForm;
