import PropTypes from "prop-types";
import Link from 'next/link';
// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase, Grid } from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
// import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from "@tabler/icons";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Link href="/">
      <Box
        sx={{
          width: 228,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
       <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          {/* <LogoSection /> */}
          <h1>Bio Diversity</h1>
        </Box>
      </Box></Link>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1, flexDirection: "row" }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={3}>
          <h3> Genus</h3>

          </Grid>
          <Link href="/species">
          <Grid item xs={3}>
          <h3> Species</h3>
          </Grid></Link>

          <Link href="/images">
          <Grid item xs={3}>
          <h3> Images</h3>
          </Grid></Link>
        </Grid>

      </Box>

      {/* notification & profile */}
      {/* <NotificationSection /> */}
      {/* <ProfileSection /> */}
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
