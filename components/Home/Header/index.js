import * as React from "react";
import { AppBar, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";
import LogoSection from '../LogoSection';
import { useRouter } from "next/router";

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
    url: "/request-new-species"
  },
  {
    name: "Team",
    url: "/teams"
  },
  {
    name: "Links",
    url: "/links"
  },
  {
    name: "Contact & help",
    url: "/contact"
  },
  {
    name: "About",
    url: "/about"
  },
  // {
  //   name:"Team",
  //   url:"/comingSoon"
  //  },
  {
    name: "Content",
    url: "/content"
  },
  {
    name: "Mapping and Zoning",
    url: "/distribution"
  },
  {
    name: "Database",
    url: "/database"
  },
  {
    name: "Biodiversity Policy Acts",
    url: "/BiodiversityPolicyActs"
  },
  {
    name: "FAQ",
    url: "/faq"
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
  const router = useRouter()
  const [navBg, setNavBg] = React.useState("rgba(0,0,0)");
  // const location = useLocation();
  React.useEffect(() => {
    // if (typeof window !== 'undefined') {
    //     console.log('You are on the browser')
    //   } else {
    //     console.log('You are on the server')
    //   }

    if (router.pathname === "/") {
      setNavBg("rgba(0,0,0,.5)");
    } else {
      setNavBg("black");
    }
    //   alert('Finished loading');
  }, []);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorel1, setAnchorEl1] = React.useState(null);
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
          // maxHeight: ITEM_HEIGHT * 4.5,
          maxHeight: "80ch",
          width: "30ch",
        },
      }}
    >
      {options.map((option, index) => (
        <Link key={`option${index}`} href={option.url}>
          <MenuItem
            onClick={(e) => {
              handleClose(e)
            }}
          >
            <a>{option.name}</a>
          </MenuItem>
        </Link>
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


      // icon: <HomeIcon style={{ fontSize: 19 }}></HomeIcon>,
    },
    {
      name: "Plants",
      path: "/plants",
      color: "white",
      // background: "white",
      border: "none",
      // icon: <YardIcon style={{ fontSize: 19 }}></YardIcon>,
    },
    {
      name: "Animals",
      path: "/animals",
      color: "white",

      // background: "white",
      border: "none",
      // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
    },
    {
      name: "Fungi",
      path: "/fungi",
      color: "white",

      // background: "white",
      border: "none",
      // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
    },
    {
      name: "Micro-organism",
      path: "/microOrgansim",
      color: "white",

      // background: "white",
      border: "none",
      // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
    },
    {
      name: "Ecosystem Diversity",
      path: "/ecosystemDiversity",
      color: "white",

      // background: "white",
      border: "none",
      // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
    },
    // {
    //   name: "content",
    //   path: "/",
    //   color: "white",

    //   // background: "white",
    //   border: "none",
    //   // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
    // },
    {
      name: "Genetic & Sub-cellular Diversity ",
      path: "/geneticSubCellularDiversity",
      color: "white",

      // background: "white",
      border: "none",
      // icon: <PetsIcon style={{ fontSize: 19 }}></PetsIcon>,
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
            <Typography sx={{ color: "white" }}>
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
  // pages[props.index].color = "white";
  // pages[props.index].border = "1px solid #c44d34";

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
  const isMenuOpen = Boolean(anchorel1);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [pages, setPages] = React.useState([])
  const [force, setForce] = React.useState(false);

  // React.useEffect(() => {

  //     setPages(pages);
  //     setForce(!force)
  // }, [])

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
      anchorel1={anchorel1}
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
      anchorel1={mobileMoreAnchorEl}
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
    <Box sx={{ flexGrow: 1, zIndex: 1301 }}>
      <AppBar
        enableColorOnDark
        position="absolute"
        color=""
        style={{
          // borderBottom: "1px solid #e5e5e5",
          // boxShadow: "none",
          height: "auto",
          // backgroundColor: "rgba(0,0,0,.5)",
          backgroundColor: navBg,
          // zIndex: 1301
          // opacity: 0.5,
          // backgroundColor: "transparent"
        }}
      >
        <Toolbar>
          <Link href="/">
            <Box
              component="span" sx={{ display: { md: 'block' }, flexGrow: 1, cursor: "pointer" }}
            >

              <Grid
                container
                direction="row"
                // justifyContent="center"
                alignItems="center"

              >
                <Box> <LogoSection /></Box>
                <Box
                  direction="column"
                // justifyContent="center"
                >
                  <Box>
                    <Typography variant="body" component="h2" style={{
                      fontFamily: "Comic Sans MS",
                      // fontSize: "25px",
                      color: "white",
                      padding: "10px"
                    }}>

                      Biodiversity of
                      <span style={{
                        fontWeight: '600',
                        color: "#c44d34",

                      }}>Bangladesh
                      </span>

                    </Typography>
                  </Box>
                  <Box ><span style={{
                    fontFamily: "Gabriola",
                    fontSize: "20px",
                    color: "white",
                    padding: "10px"
                  }}>Database and Mapping
                  </span>

                  </Box>
                </Box>
              </Grid>



            </Box>
          </Link>


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
                  {/* <Typography style={{ fontSize: 0.1 }}>{page.icon}</Typography> */}

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
