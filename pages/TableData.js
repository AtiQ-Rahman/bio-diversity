import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
const member1 = require('../assets/images/no-image.png')
import { height, styled } from "@mui/system";
import callApi, { imageUrl } from "../utils/callApi";
import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { isValidImage } from "../utils/utils";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#c44d34",
    color: theme.palette.common.white,
    fontSize: 17,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 20,
    fontFamily: "Times New Roman",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const TableData = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //  const [speciesList, setSpeciesList] = React.useState([]);
  //  const [searchMessage, setSearchMessage] = React.useState('');
  let imageProps = {
    height: "80px",
    width: "200px",
  };
  const imageLoader = ({ src }) => `${src}`;
  const router = useRouter();
  return (
    <Grid container sx={{ borderRadius: "10px", px: 10 }} paddingBottom={7}>
      <Grid item xs={12}>
        {/* {props.length > 0 ? ( */}
        <>
          <Typography variant="h2" component="h2" gutterBottom>
            Total Species Found : {props?.speciesList?.length}
          </Typography>
          <br />
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >
                    <b>SI</b>
                  </StyledTableCell>
                  <StyledTableCell sx={{}}>
                    <b>Images</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Species Name</b>
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    <b>Sub Group</b>
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    <b>Category</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Kingdom</b>
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    <b>Phylum</b>
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    <b>Family</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Genus</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Species</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Order name</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>Action</b>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.speciesList?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((row, index) => (
                  <StyledTableRow
                    key={`details${index}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <StyledTableCell component="th" scope="row" >
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell scope="row" >
                      {/* {speciesList?.length > 0 ? (
                        <TableData
                          speciesList={speciesList}
                          category={pageGroups.plants}
                        ></TableData>
                      ) : (
                        <Typography
                          variant="h1"
                          component="h1"
                          align="center"
                          paddingBottom={20}
                          paddingTop={10}
                        >
                          {searchMessage ?? ""}
                        </Typography>
                      )} */}
                      {isValidImage(row?.profile_image) ? (
                        <Image
                          {...imageProps}
                          height="80px"
                          width="190px"
                          objectFit="cover"
                          loader={imageLoader}
                          src={imageUrl + "/" + row.profile_image}
                          alt="No_image"
                        ></Image>
                      ) : (<Image
                        height="80px"
                        width="190px"
                        objectFit="cover"
                        loader={imageLoader}
                        src={member1}
                        alt="No_image"
                      ></Image>)}
                      {/* <Image
                        {...imageProps}
                        objectFit="cover"
                        loader={imageLoader}
                        src={imageUrl + "/" + row.profile_image}
                        alt="No_image"
                      ></Image> */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.bangla}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {row.subGroup}
                    </StyledTableCell> */}
                    {/* <StyledTableCell align="center">
                      {row.identificationFeatures.subCategory?.name ||
                        row.identificationFeatures.subCategory}
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.kingdom}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">
                      {row.phylum}
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      {row.family}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.genus}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.species}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.order_name}
                    </StyledTableCell>

                    <StyledTableCell align="center" >
                      <Grid
                      // container
                      // spacing={1}
                      // sx={{
                      //   width: "fit-content",
                      //   margin: "0 auto",
                      // }}
                      >
                        {/* <Grid item xs={12}> */}
                        <Button
                          style={{
                            width: "90px",
                            maxHeight: "80px",
                            minWidth: "40px",
                            minHeight: "40px",
                          }}
                          type="button"
                          onClick={() => {
                            localStorage.setItem(
                              `initialValues${props.category}`,
                              JSON.stringify(props.values)
                            );
                            router.push({
                              pathname: "/details",

                              query: {
                                serial: row.serial,
                                category: props.category,
                                initial: false,
                              },
                            });
                          }}
                          variant="outlined"
                        >
                          Details
                        </Button>
                        {/* </Grid> */}
                        {/* <Grid item xs={12}> */}

                        <Button
                          className={styles.bg_primary}
                          style={{
                            width: "90px",
                            maxHeight: "80px",
                            minWidth: "40px",
                            minHeight: "40px",
                            color: "white",
                          }}
                          type="button"
                          onClick={() =>
                            router.push({
                              pathname: "/map",
                              query: {
                                serial: row.serial,
                                category: props.category,
                                initial: false,
                              },
                            })
                          }
                          // variant="outlined"
                          sx={{ mt: 0.1, ml: 0.1 }}
                        >
                          View map
                        </Button>
                        {/* </Grid> */}
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[100, 50]}
            component="div"
            count={props.speciesList?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
        {/* ) : <Typography variant="h1" component="h1" align="center" padding={25}>
                  {searchMessage ?? ''}
               </Typography>} */}
      </Grid>
    </Grid>
  );
};

export default TableData;
