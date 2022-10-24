import { Button, Grid, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';
import callApi, { imageUrl } from "../utils/callApi";
import React from 'react';
import styles from "../styles/Home.module.css";
import Image from 'next/image';
import { useRouter } from "next/router";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#c44d34",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
        fontFamily: "Times New Roman"
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const TableData = (props) => {
    //  const [speciesList, setSpeciesList] = React.useState([]);
    //  const [searchMessage, setSearchMessage] = React.useState('');
    let imageProps = {
        height: "100px",
        width: "200px",
    }
    const imageLoader = ({ src }) => `${src}`
    const router = useRouter();
    return (
        <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={7}>
            <Grid item xs={12}>
                {/* {props.length > 0 ? ( */}
                <><Typography variant="h2" component="h2" align="center" gutterBottom>
                    Total Species Found : {props.speciesList.length}
                </Typography>
                    <br />
                    <TableContainer component={Paper}  >
                        <Table sx={{ minWidth: 700,pl: 7  }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ pl: 4 }}><b>SI</b></StyledTableCell>
                                    <StyledTableCell sx={{ pl: 7 }}><b>Images</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Species Name</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Type</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Family</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Order name</b></StyledTableCell>
                                    <StyledTableCell align="center"><b>Lng/Lat</b></StyledTableCell>
                                    <StyledTableCell  align="center"><b>Action</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody   >
                                {props.speciesList.map((row, index) => (
                                    <StyledTableRow
                                        key={row.index}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}

                                    >
                                        <StyledTableCell component="th" scope="row" sx={{ pl: 4 }}>
                                            {index + 1}
                                        </StyledTableCell >
                                        <StyledTableCell component="td" scope="row" width={200}>
                                            <Image {...imageProps} objectFit="cover" loader={imageLoader} src={imageUrl + '/' + row.profile_image} alt={row.name.commonName}></Image>
                                        </StyledTableCell >
                                        <StyledTableCell align="center">
                                            {row.name.commonName}
                                        </StyledTableCell >
                                        <StyledTableCell align="center">{row.identificationFeatures.subCategory.name}</StyledTableCell >

                                        <StyledTableCell align="center">{row.family}</StyledTableCell >
                                        <StyledTableCell align="center">{row.order_name}</StyledTableCell >
                                        <StyledTableCell align="center">{row.lng},<br />{row.lat}</StyledTableCell >
                                        <StyledTableCell sx={{ pl: 10 }}  align="center">
                                            <Grid container spacing={1}  >
                                                {/* <Grid item xs={12}> */}
                                                <Button
                                                    style={{
                                                        width: "110px",
                                                        maxHeight: "80px",
                                                        minWidth: "40px",
                                                        minHeight: "40px"
                                                    }}
                                                    type="button"
                                                    onClick={() => router.push({
                                                        pathname: "/details",
                                                        query: {
                                                            serial: row.serial,
                                                            category: props.category,
                                                            initial: false
                                                        }
                                                    })}
                                                    variant="outlined"
                                                >
                                                    Details
                                                </Button>
                                                {/* </Grid> */}
                                                {/* <Grid item xs={12}> */}

                                                <Button

                                                    className={styles.bg_primary}
                                                    style={{
                                                        width: "110px",
                                                        maxHeight: "80px",
                                                        minWidth: "40px",
                                                        minHeight: "40px",
                                                        color: "white"
                                                    }}
                                                    type="button"

                                                    onClick={() => router.push({
                                                        pathname: "/map",
                                                        query: {
                                                            serial: row.serial,
                                                            category: props.category,
                                                            initial: false

                                                        }
                                                    })}
                                                    // variant="outlined"
                                                    sx={{ ml: 1 }}
                                                >
                                                    View map
                                                </Button>
                                                {/* </Grid> */}

                                            </Grid>

                                        </StyledTableCell >
                                    </StyledTableRow >
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer></>
                {/* ) : <Typography variant="h1" component="h1" align="center" padding={25}>
                  {searchMessage ?? ''}
               </Typography>} */}

            </Grid>
        </Grid>


    );
};

export default TableData;