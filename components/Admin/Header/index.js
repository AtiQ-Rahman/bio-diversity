import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import { useRouter } from "next/router";
// project imports
import LogoSection from '../../Home/LogoSection';

// assets
import { IconMenu2 } from '@tabler/icons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const router = useRouter();
    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
                onClick={() => {
                    router.push("/");
                  }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />

                </Box>

                <Box>
                    <Typography variant="body" component="h2" style={{
                        fontFamily: "Comic Sans MS",
                        // fontSize: "25px",
                        color: "black",
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

                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            height: "fit-content",
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection />
            <ProfileSection /> */}
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
