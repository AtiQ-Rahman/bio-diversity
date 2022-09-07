import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Grid } from "@mui/material";
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
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import ContactsIcon from "@mui/icons-material/Contacts";
import ForestIcon from "@mui/icons-material/Forest";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;
export default function PrimarySearchAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const isMenuOpen = Boolean(anchorEl1);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  let pages = [
    {
      name: "Home",
      path: "/",
      background: "white",
      color: "white",
      border: "none",

      icon: <HomeIcon style={{ fontSize: 19 }}></HomeIcon>,
    },
    {
      name: "Species",
      path: "/species",
      color: "white",
      background: "white",
      border: "none",
      icon: <ForestIcon style={{ fontSize: 19 }}></ForestIcon>,
    },
    {
      name: "Images",
      path: "/images",
      color: "white",
      background: "white",
      border: "none",
      icon: <ImageIcon style={{ fontSize: 19 }}></ImageIcon>,
    },
    {
      name: "Contact",
      path: "/contact",
      color: "white",
      background: "white",
      border: "none",
      icon: <ContactsIcon style={{ fontSize: 19 }}></ContactsIcon>,
    },
    {
      // name: "Contribute",
      path: "",
      color: "white",
      background: "white",
      border: "none",

      name: (
        <div>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AddIcon style={{ fontSize: 19 }} sx={{ color: "white" }}></AddIcon>
            <Typography sx={{ color: "white" }} style={{ fontWeight: 600 }}>
              Contribute
            </Typography>{" "}
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === "Pyxis"}
                onClick={handleClose}
              
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ),
    },
  ];
  pages[props.index].background = styles.bg_primary;
  pages[props.index].color = "white";
  pages[props.index].border = "10px solid #0f4c39";

  const handleProfileMenuOpen = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl1(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
  
    anchorEl1={anchorEl1}
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
     <Grid > <MenuItem onClick={handleMenuClose}>Share Your DataSet</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upload Species List</MenuItem></Grid>
      {/* <MenuItem onClick={handleMenuClose}>Upload Species List</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
    anchorEl1={mobileMoreAnchorEl}
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
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, height: 10 }}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color=""
        style={{
          // borderBottom: "1px solid #e5e5e5",
          boxShadow: "none",
          height: 90,
          backgroundColor: "black",
        }}
      >
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
          {/* <SearchSection /> */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Link href={page.path}>
                <MenuItem
                  key={page}
                  style={{ color: page.color, border: page.border }}
                  className={page.background}
                  onClick={handleCloseNavMenu}
                >
                  <Typography style={{ fontSize: 0.1 }}>{page.icon}</Typography>

                  <Typography
                    style={{ fontWeight: 600, paddingTop: 1 }}
                    textAlign="center"
                  >
                    {page.name}
                  </Typography>
                  {/* <Typography>{page.menu}</Typography> */}
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
