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
import styles from "../../../styles/Home.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import ContactsIcon from "@mui/icons-material/Contacts";
import ForestIcon from "@mui/icons-material/Forest";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import LogoSection from '../LogoSection';

// const {

//   Button,
//   makeStyles,

// } = MaterialUI
const useStyles = makeStyles({
  // flexGrow: {
  //   flex: '1',
  // },

  button: {
    // color: '#fff',
    "&:hover": {
      // backgroundColor: '#c44d34',
      borderBottom: "2px solid #c44d34",

      // outline:" 3px solid black"
      // color: '#3c52b2',
      // bottom: "-4px"
      // transition:" width .3s"
    },
  },
});

const options = [
  {
    name: "Contribute",
    url: "/add-new-species"
  },
  {
    name: "Team",
    url: "/"
  },
  {
    name: "Links",
    url: "/"
  },
  {
    name: "Contact",
    url: "/contact"
  },
  {
    name: "About",
    url: "/"
  },
  {
    name: "FAQ",
    url: "/"
  },

  // {
  //     name: "Contact",
  //     path: "/contact",
  //     color: "white",
  //     // background: "white",
  //     border: "none",
  //     icon: <ContactsIcon style={{ fontSize: 19 }}></ContactsIcon>,
  // },
];

const ITEM_HEIGHT = 48;
export default function PrimarySearchAppBar(props) {
  const [navBg, setNavBg] = React.useState("black");
  // const location = useLocation();
  React.useEffect(() => {
    // if (typeof window !== 'undefined') {
    //     console.log('You are on the browser')
    //   } else {
    //     console.log('You are on the server')
    //   }

    if (window.location.pathname === "/") {
      setNavBg("rgba(0,0,0,.5)");
    } else {
      setNavBg("black");
    }
    //   alert('Finished loading');
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderContribute = (
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
          <Link href={option.url}>
            {option.name}

          </Link>
        </MenuItem>
      ))}
    </Menu>
  );
  let pages = [
    {
      name: "Home",
      path: "/",
      // background: "white",
      color: "white",
      border: "none",

      icon: <HomeIcon style={{ fontSize: 19 }}></HomeIcon>,
    },
    {
      name: "Species",
      path: "/species",
      color: "white",
      // background: "white",
      border: "none",
      icon: <ForestIcon style={{ fontSize: 19 }}></ForestIcon>,
    },
    {
      name: "Images",
      path: "/images",
      color: "white",

      // background: "white",
      border: "none",
      icon: <ImageIcon style={{ fontSize: 19 }}></ImageIcon>,
    },
    // {
    //     name: "Contact",
    //     path: "/contact",
    //     color: "white",
    //     // background: "white",
    //     border: "none",
    //     icon: <ContactsIcon style={{ fontSize: 19 }}></ContactsIcon>,
    // },
    {
      // name: "Contribute",
      path: "",
      color: "white",
      // background: "white",
      border: "none",

      name: (
        <Box>
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
              More
            </Typography>{" "}
            <ArrowDropDownIcon sx={{ color: "white" }} />
          </IconButton>
          {renderContribute}
        </Box>
      ),
    },
  ];
  pages[props.index].background = "#c44d34";
  pages[props.index].color = "white";
  pages[props.index].border = "10px solid #c44d34";

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
  // const [pages, setPages] = React.useState([])
  const [force, setForce] = React.useState(false);

  // React.useEffect(() => {

  //     setPages(pages);
  //     setForce(!force)
  // }, [])

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
      <MenuItem onClick={handleMenuClose}>Share Your DataSet</MenuItem>
      <MenuItem onClick={handleMenuClose}>Upload Species List</MenuItem>
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
        <Link key={`page${index}`} href={page.path}>
          <MenuItem key={page} onClick={handleCloseNavMenu}>
            <Box textAlign="center">{page.name}</Box>
          </MenuItem>
        </Link>
      ))}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color=""
        style={{
          // borderBottom: "1px solid #e5e5e5",
          // boxShadow: "none",
          height: 90,
          // backgroundColor: "rgba(0,0,0,.5)",
          backgroundColor: navBg,
          // opacity: 0.5,
          // backgroundColor: "transparent"
        }}
      >
        <Toolbar>
          <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
            <LogoSection />
            <span style={{
              fontSize: "30px",
              color: "white",
              padding: "10px"
            }}> Bio diversity</span>


          </Box>

          <Box sx={{ flexGrow: 1 }} />
          {/* <SearchSection /> */}

          <Box
            className={classes.flexGrow}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page, index) => (
              <Link key={`pages${index}`} href={page.path}>
                <MenuItem
                  className={styles.navbar}
                  key={page}
                  style={{
                    color: page.color,
                    border: page.border,
                    background: page.background,
                  }}
                  // className={page.background}
                  onClick={handleCloseNavMenu}
                >
                  <Typography style={{ fontSize: 0.1 }}>{page.icon}</Typography>

                  <Box textAlign="center">{page.name}</Box>

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
