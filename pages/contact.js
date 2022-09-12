import {
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import Header from "../components/Home/Header";
import styles from "../styles/Home.module.css";
import Footer from "../components/Home/Footer/Footer";
// import './App.css';
// import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';

const contact = () => {
  return (
    <div >
      <Header index={3} />

      <div>
        <Grid sx={{ m: 15 }}>
          <Grid>
            <Card
              style={{
                maxWidth: 450,
                padding: "20px 5px",
                margin: "0 auto",
                backgroundColor: "rgb(225, 253, 249)",
              }}
            >
              <Typography gutterBottom variant="h3" align="center" pt={2}>
                Contact Us
              </Typography>
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  Fill up the form and our team will get back to you within 24
                  hours.
                </Typography>
                <form>
                  <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        placeholder="Enter first name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid xs={12} sm={6} item>
                      <TextField
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="email"
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        type="number"
                        placeholder="Enter phone number"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Message"
                        multiline
                        rows={4}
                        placeholder="Type your message here"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        style={{
                       
                          backgroundColor: "#c44d34",
                        }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <Footer />
    </div>
  );
};

export default contact;
