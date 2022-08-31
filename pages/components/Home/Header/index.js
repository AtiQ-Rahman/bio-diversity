import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {AppBar} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchSection from "./SearchSection";
import styles from "../../../../styles/Home.module.css";

import Link from "next/link";


export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let pages = [
    {
      name: "Home",
      path: "/",
      background:'white',
      color:'black',
      border:"none"
    },
    {
      name: "Species",
      path: "/species",
      color:'black',
      background:'white',
      border:"none"

    },
    {
      name: "Images",
      path: "/images",
      color:'black',
      background:'white',
      border:"none"

    },
    {
      name: "Contact",
      path: "/contact",
      color:'black',
      background:'white',
      border:"none"

    },
  ];
  pages[props.index].background = styles.bg_primary
  pages[props.index].color = "white"
  pages[props.index].border = "9px solid rgb(94, 53, 177)"

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {pages.map((page, index) => (
        <Link href={page.path}>
        <MenuItem key={page} onClick={handleCloseNavMenu}>
          <Typography textAlign="center">{page.name}</Typography>
        </MenuItem></Link>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 , height:10}}>
      <AppBar enableColorOnDark position="fixed" color="" style={{ borderBottom:"1px solid #e5e5e5" ,boxShadow:"none", height:50} }>
        <Toolbar>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Bio diversity
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchSection />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            
            {pages.map((page, index) => (
              <Link href={page.path}>
                <MenuItem key={page} style={{ color: page.color ,border: page.border}} className={page.background} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
