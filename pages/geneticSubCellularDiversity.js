import React, { useState, useEffect } from "react";

// import Footer from '../components/Home/Footer/Footer';
// import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer/Footer";
import Header from "../components/Home/Header";
import {
   Typography,
   Grid,
   TextField,
   Button,
   Box,
   useMediaQuery,
   TableContainer,
   Paper,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Autocomplete,
   TablePagination,
   tableCellClasses,
   Card,
   CardContent,
} from "@mui/material";
// import ImageUpload from "./ImageUpload";

import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { SET_MENU } from "../store/actions";
import styles from "../styles/Home.module.css";
import { styled, useTheme } from "@mui/material/styles";
import callApi, { imageUrl } from "../utils/callApi";
import { imageLoader, initialValues, pageGroups, processNames } from "../utils/utils";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import Loader2 from "../components/Loader2";
import { Icon } from "@iconify/react";
const genetiticData = require('../utils/geneticData')
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
let imageProps = {
   height: "100px",
   width: "200px",
}
const GeneticSubCellularDiversity = () => {
   const [loading, setLoading] = React.useState(false);
   const [category, setCatgory] = React.useState()
   const [searchMessage, setSearchMessage] = React.useState('')
   const theme = useTheme();
   const [speciesList, setSpeciesList] = React.useState()
   const router = useRouter();
   const [allTypesOfSpecies, setAllTypesOfSpecies] = useState([])
   const [subGroups, setSubGroups] = useState([])
   const [subValues, setSubValues] = useState({})
   const [searchValues, setSearchValues] = React.useState(null)
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };
   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };
   useEffect(() => {
      async function fetchData() {
         let allTypesOfSpecies = await callApi("/get-unique-types-of-species", { category: pageGroups.genetic });
         console.log({ allTypesOfSpecies })
         setAllTypesOfSpecies(allTypesOfSpecies.data)
         setSubGroups(allTypesOfSpecies.data.subGroups)
         subValues.geneticdatas = allTypesOfSpecies.data.genticdatas ? allTypesOfSpecies.data.geneticdatas : []
         subValues.speciestaxas = allTypesOfSpecies.data.speciestaxas ? allTypesOfSpecies.data.speciestaxas : []
         let response = await callApi("/get-categories-by-name", { name: pageGroups.genetic });
         let localData = localStorage.getItem(pageGroups.genetic)
         let isAllowed = localStorage.getItem(`allowed${pageGroups.genetic}`)
         console.log(router.query, localData)
         // if (router?.query?.initial) {
         //   localStorage.removeItem(category)
         // }
         if (localData && isAllowed) {
            let searchParameters = JSON.parse(localData)
            let res = await callApi("/search-species-by-field", {
               searchParameters,
            });
            setLoading(false);
            console.log("response", res);
            setSearchValues(searchParameters)
            setSpeciesList(res?.data);
            localStorage.removeItem(`allowed${pageGroups.genetic}`)
         }
         else {
            setSearchValues(initialValues)
            localStorage.removeItem(pageGroups.genetic)
         }
         if (response.data.length > 0) {
            console.log(response.data)
            setCatgory(response.data[0])
         }
         else {
            setCatgory({})
         }
      }
      fetchData()

   }, [router.pathname, router.query])
   return (
      <Box>

         {/* header */}

         <Header index={6} relative={true} />
         <Box sx={{ p: 10, background: "white" }}>
            <Typography
               gutterBottom
               variant="h2"
            >
               Name : <span style={{ color: "#20acb3" }}>Algae</span>
            </Typography>
            <Typography
               gutterBottom
               variant="h3"
            >
               <span style={{ color: "#20acb3" }}>{genetiticData.length}</span> Genetic Data
            </Typography>
            {genetiticData.map((data, index) => {
               return (<Card variant="outlined" key={`geneticData${index}`} sx={{ mb: 1 }}>
                  <CardContent>
                     <Box sx={{ display: "flex" }} color="#20acb3">
                        <Icon icon="fluent:number-symbol-square-24-filled" height={20} />
                        <Typography sx={{ fontSize: 20, ml: 1 }} gutterBottom>
                           {data.title}
                        </Typography>
                     </Box>
                     <p style={{ wordWrap: 'break-word', fontSize: 10 }}>
                        {data.value}
                     </p>
                  </CardContent>
               </Card>)
            })}


         </Box>

         {/* drawer */}


         <Footer style={{ padding: "100px" }} />
      </Box>
   );
};

export default GeneticSubCellularDiversity;



