import React from "react";
import styles from "../styles/Home.module.css";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";

import {
    Grid,
    TextField,
    Autocomplete,
    Dialog,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import callApi from "../utils/callApi";
const props = {
    ListboxProps: {
        sx: {
            border: "1px solid #b5b5b5",
            borderRadius: '5px'
        }
    }
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));
const CommonDropDowns = ({
    values,
    setFieldValue,
    touched,
    handleChange,
    errors,
    category

}) => {

    const [allTypesOfSpecies, setAllTypesOfSpecies] = useState(null)
    const [subCategories, setSubcategories] = useState([])
    const [subGroups, setSubGroups] = useState([])
    const [kingdoms, setKingdoms] = useState([])
    const [phylums, setPhylums] = useState([])
    const [classes, setClassNames] = useState([])
    const [orders, setOrderNames] = useState([])
    const [families, setFamilies] = useState([])
    const [genuses, setGenuses] = useState([])
    const [speciesListFromServer, setSpeciesListFromServer] = useState([])
    const [subSpeciesList, setSubSpeciesList] = useState([])
    const [varieties, setVarieties] = useState([])
    const [subVarieties, setSubVarieties] = useState([])
    const [clones, setClones] = useState([])
    const [formas, setFormas] = useState([])
    async function fetchData(cbfn) {
        let allTypesOfSpecies = await callApi("/get-unique-types-of-species", { category });
        setAllTypesOfSpecies(allTypesOfSpecies?.data)
        setSubcategories(allTypesOfSpecies?.data.categories)
        console.log({ allTypesOfSpecies })
    }
    useEffect(() => {
        // if (!map.current) return; // initialize map only once
        setSubcategories([])
        fetchData(() => null);
        // new mapboxgl.Marker()
        //    .setLngLat([lng, lat])
        //    .addTo(map.current);
    }, []);
    return (
        <>
            <Grid item xs={12} md={2} >
                <Autocomplete
                    size="small"
                    {...props}
                    disablePortal
                    id="plants"
                    name={values?.type}
                    options={subCategories || []}
                    key="plants"
                    value={values?.type}
                    getOptionLabel={(option) => option?.subCategory || option}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        console.log({ value });
                        setFieldValue("type", value?.subCategory || value);
                        let subGroups = allTypesOfSpecies?.subGroups.filter((item) => item.subCategory == (value?.subCategory || value))
                        setSubGroups(subGroups)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.type && errors?.type)}
                            helperText={touched?.type && errors?.type}
                            style={{ padding: "2px" }}
                            label="Biodiversity Group"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.type}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>

                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="subGroups"
                    name={values?.subGroup}
                    options={subGroups}
                    key="subGroups"
                    // value={values?.kingdom}
                    getOptionLabel={(option) => option?.subGroup || option}
                    value={values?.subGroup}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("subGroup", value?.subGroup || value);
                        let kingdoms = allTypesOfSpecies?.kingdoms.filter((item) => item.subGroup == (value?.subGroup || value))
                        setKingdoms(kingdoms)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.subGroup && errors?.subGroup)}
                            helperText={touched?.subGroup && errors?.subGroup}
                            style={{ padding: "2px" }}
                            label="---Sub Group---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.subGroup}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="kingdoms"
                    name={values?.kingdom}
                    options={kingdoms}
                    key="kingdoms"
                    // value={values?.kingdom}
                    getOptionLabel={(option) => option?.kingdom || option}
                    value={values?.kingdom}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("kingdom", value?.kingdom || value);
                        let phylums = allTypesOfSpecies?.phylums.filter((item) => item.kingdom == (value?.kingdom || value))
                        setPhylums(phylums)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.kingdom && errors?.kingdom)}
                            helperText={touched?.kingdom && errors?.kingdom}
                            style={{ padding: "2px" }}
                            label="---Select Kingdom---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.kingdom}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}

                    size="small"
                    disablePortal
                    id="phylums"
                    name={values?.phylum}
                    options={phylums}
                    key="phylums"
                    getOptionLabel={(option) => option?.phylum || option}
                    value={values?.phylum}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        console.log(value)
                        setFieldValue("phylum", value?.phylum || value);
                        let classes = allTypesOfSpecies?.classes.filter((item) => item.phylum == (value?.phylum || value))
                        setClassNames(classes)

                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.phylum && errors?.phylum)}
                            helperText={touched?.phylum && errors?.phylum}
                            style={{ padding: "2px" }}
                            label="---Select Phylum---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.phylum}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="classes"
                    name={values?.class_name}
                    options={classes}
                    key="classes"
                    getOptionLabel={(option) => option?.class_name || option}
                    value={values?.class_name}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("class_name", value?.class_name || value);
                        let orders = allTypesOfSpecies?.orders.filter((item) => item.class_name == (value?.class_name || value))
                        setOrderNames(orders)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(
                                touched?.class_name && errors?.class_name
                            )}
                            helperText={
                                touched?.class_name && errors?.class_name
                            }
                            style={{ padding: "2px" }}
                            label="---Select Class---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.class_name}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="orders"
                    name={values?.order_name}
                    options={orders}
                    key="orders"
                    getOptionLabel={(option) => option?.order_name || option}
                    value={values?.order_name}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("order_name", value?.order_name || value);
                        let families = allTypesOfSpecies?.families.filter((item) => item.order_name == (value?.order_name || value))
                        setFamilies(families)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(
                                touched?.order_name && errors?.order_name
                            )}
                            helperText={
                                touched?.order_name && errors?.order_name
                            }
                            style={{ padding: "2px" }}
                            label="---Select Order---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.order_name}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="families"
                    name={values?.family}
                    options={families}
                    key="families"
                    getOptionLabel={(option) => option?.family || option}
                    value={values?.family}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("family", value?.family || value);
                        let genuses = allTypesOfSpecies?.genuses.filter((item) => item.family == (value?.family || value))
                        setGenuses(genuses)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.family && errors?.family)}
                            helperText={touched?.family && errors?.family}
                            style={{ padding: "2px" }}
                            label="---Select Family---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.family}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="genuses"
                    name={values?.genus}
                    options={genuses}
                    key="genuses"
                    getOptionLabel={(option) => option?.genus || option}
                    value={values?.genus}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("genus", value?.genus || value);
                        let species = allTypesOfSpecies?.speciesListFromServer.filter((item) => item.genus == (value?.genus || value))
                        setSpeciesListFromServer(species)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.genus && errors?.genus)}
                            helperText={touched?.genus && errors?.genus}
                            style={{ padding: "2px" }}
                            label="---Select genus---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.genus}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="sub_species"
                    name={values?.sub_species}
                    options={subSpeciesList}
                    key=""
                    getOptionLabel={(option) => option?.sub_species || option}
                    value={values?.sub_species}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("sub_species", value?.sub_species || value);
                        let varieties = allTypesOfSpecies?.varieties
                        setVarieties(varieties)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(
                                touched?.sub_species && errors?.sub_species
                            )}
                            helperText={
                                touched?.sub_species && errors?.sub_species
                            }
                            style={{ padding: "2px" }}
                            label="---Select Sub Species---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.sub_species}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="variety"
                    name={values?.variety}
                    options={varieties}
                    key=""
                    getOptionLabel={(option) => option?.variety || option}
                    value={values?.variety}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("variety", value?.variety || value);
                        let subVarieties = allTypesOfSpecies?.subVarieties.filter((item) => item.variety == (value?.variety || value))
                        setSubVarieties(subVarieties)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.variety && errors?.variety)}
                            helperText={touched?.variety && errors?.variety}
                            style={{ padding: "2px" }}
                            label="---Select variety---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.variety}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="sub_variety"
                    name={values?.sub_variety}
                    options={subVarieties}
                    key=""
                    getOptionLabel={(option) => option?.sub_variety || option}
                    value={values?.sub_variety}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("sub_variety", value?.sub_variety || value);
                        let clones = allTypesOfSpecies?.clones
                        setClones(clones)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(
                                touched?.sub_variety && errors?.sub_variety
                            )}
                            helperText={
                                touched?.sub_variety && errors?.sub_variety
                            }
                            style={{ padding: "2px" }}
                            label="---Select sub-variety---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.sub_variety}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="clone"
                    name={values?.clone}
                    options={clones}
                    key="clone"
                    getOptionLabel={(option) => option?.clone || option}
                    value={values?.clone}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("clone", value?.clone || value);
                        let formas = allTypesOfSpecies?.formas.filter((item) => item.clone == (value?.clone || value))
                        setFormas(formas)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.clone && errors?.clone)}
                            helperText={touched?.clone && errors?.clone}
                            style={{ padding: "2px" }}
                            label="---Select clone---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.clone}
                        />
                    )}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Autocomplete
                    {...props}
                    size="small"
                    disablePortal
                    id="forma"
                    name={values?.forma}
                    options={formas}
                    key=""
                    getOptionLabel={(option) => option?.forma || option}
                    value={values?.forma}
                    // sx={{ width: 300 }}
                    onChange={(e, value) => {
                        setFieldValue("forma", value?.forma || value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(touched?.forma && errors?.forma)}
                            helperText={touched?.forma && errors?.forma}
                            style={{ padding: "2px" }}
                            label="---Select forma---"
                            variant="outlined"
                            placeholder="Select"
                            value={values?.forma}
                        />
                    )}
                />
            </Grid>

            <Grid item md={12} xs={12}>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12} md={2}>
                        <Autocomplete
                            freeSolo
                            {...props}
                            size="small"
                            disablePortal
                            id="species"
                            name={values?.species}
                            options={speciesListFromServer}
                            key="species"
                            getOptionLabel={(option) => option?.species || option}
                            value={values?.species}
                            // sx={{ width: 300 }}
                            onChange={(e, value) => {
                                setFieldValue("species", value?.species || value);
                                let subSpeciesList = allTypesOfSpecies?.subSpeciesList.filter((item) => item.species == (value?.species || value))
                                setSubSpeciesList(subSpeciesList)
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={Boolean(touched?.species && errors?.species)}
                                    helperText={touched?.species && errors?.species}
                                    style={{ padding: "2px" }}
                                    label="---Select species---"
                            margin="normal"
                            variant="outlined"
                                    placeholder="Select"
                                    value={values?.species}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField

                            id="Species"
                            name="nameOfSpecies.english"
                            margin="normal"
                            size="small"
                            label="English Name"
                            fullWidth
                            onChange={handleChange}
                            autoComplete="English Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField

                            id="banglaName"
                            name="nameOfSpecies.bangla"
                            margin="normal"
                            size="small"
                            label="Bangla Name"
                            fullWidth
                            onChange={handleChange}
                            autoComplete="Bangla Name"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField

                            id="commonName"
                            name="nameOfSpecies.commonName"
                            margin="normal"
                            size="small"
                            label="Common Name"
                            fullWidth
                            autoComplete="commonName"
                            onChange={handleChange}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField

                            id="synonym"
                            name="nameOfSpecies.synonym"
                            margin="normal"
                            size="small"
                            label="Synonym"
                            fullWidth
                            autoComplete="synonym"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                                    <Typography gutterBottom component="h3" variant="div">
                                       Identification Features
                                    </Typography>
                                    {values?.categories.map((category, index) => {
                                       return (
                                          <>
                                             <TextField
                                                fullWidth
                                                autoFocus
                                                label={`Category Name ${index + 1}`}
                                                margin="normal"
                                                size="small"
                                                name="category.name"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => { }}
                                                // type="number"
                                                value={category.name || ""}
                                                variant="outlined"
                                             />
                                             <TextField
                                                fullWidth
                                                autoFocus
                                                label={`Category Data ${index}`}
                                                margin="normal"
                                                size="small"
                                                name="category.name"
                                                onBlur={handleBlur}
                                                onChange={(e, value) => { }}
                                                // type="number"
                                                value={category.name || ""}
                                                variant="outlined"
                                             />
                                             <Divider />
                                          </>
                                       );
                                    })}
                                    <Button
                                       className={styles.bg_secondary}
                                       style={{
                                          width: "80px",
                                          maxHeight: "80px",
                                          minWidth: "200px",
                                          minHeight: "40px",
                                          marginBottom: "10px",
                                       }}
                                       onClick={(e) => {
                                          values.categories.push({
                                             name: "",
                                             data: "",
                                          });
                                          setFieldValue("categories", values.categories);
                                       }}
                                    >
                                       Add New Category
                                    </Button>
                                 </Grid> */}

                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Physical Identification Details"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.physical"
                            onChange={(e) => {
                                values.identificationFeatures['physical'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Habitat"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.habitat"
                            onChange={(e) => {
                                values.identificationFeatures['habitat'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Behavior"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.behavior"
                            onChange={(e) => {
                                values.identificationFeatures['behavior'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Migration"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.migration"
                            onChange={(e) => {
                                values.identificationFeatures['migration'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Breeding Behavior"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.breeding"
                            onChange={(e) => {
                                values.identificationFeatures['breeding'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Chromosome Number"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.chromosome"
                            onChange={(e) => {
                                values.identificationFeatures['chromosome'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Molecular Characteristic"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.molecular"
                            onChange={(e) => {
                                values.identificationFeatures['molecular'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.notes"
                            onChange={(e) => {
                                values.identificationFeatures['notes'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="World distribution"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.distribution"
                            onChange={(e) => {
                                values.identificationFeatures['distribution'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="IUCN status"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.iucn"
                            onChange={(e) => {
                                values.identificationFeatures['iucn'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Economic Importance"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.economic"
                            onChange={(e) => {
                                values.identificationFeatures['economic'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Medicinal use"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.medicinal"
                            onChange={(e) => {
                                values.identificationFeatures['medicinal'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Uses as Foods and Feeds"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.foods"
                            onChange={(e) => {
                                values.identificationFeatures['foods'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="As pharmaceuticals"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.pharmaceuticals"
                            onChange={(e) => {
                                values.identificationFeatures['pharmaceuticals'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="As industrial product"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.industrial"
                            onChange={(e) => {
                                values.identificationFeatures['industrial'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Other information"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.otherInfo"
                            onChange={(e) => {
                                values.identificationFeatures['otherInfo'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Other uses"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.otherUses"
                            onChange={(e) => {
                                values.identificationFeatures['otherUses'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Ecological Indicator"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.ecologicalIndicator"
                            onChange={(e) => {
                                values.identificationFeatures['ecologicalIndicator'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Exotic"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.exotic"
                            onChange={(e) => {
                                values.identificationFeatures['exotic'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Crop / fruit / industrial products/ weed etc"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.typeOfSpecies"
                            onChange={(e) => {
                                values.identificationFeatures['physical'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Fruting time"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.fruitingTime"
                            onChange={(e) => {
                                values.identificationFeatures['fruitingTime'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Scientific Research Interest"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.scientific"
                            onChange={(e) => {
                                values.identificationFeatures['scientific'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Health Resource"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.health"
                            onChange={(e) => {
                                values.identificationFeatures['health'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Growing season"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.season"
                            onChange={(e) => {
                                values.identificationFeatures['season'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Threats to the Species / Genus"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.threats"
                            onChange={(e) => {
                                values.identificationFeatures['threats'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Conservation status"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.conservation"
                            onChange={(e) => {
                                values.identificationFeatures['conservation'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Measures taken"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.measures"
                            onChange={(e) => {
                                values.identificationFeatures['physical'] = e.target.value
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            label="Miscellaneous"
                            multiline
                            rows={3}
                            margin="normal"
                            size="small"
                            placeholder="Type your Descripton here"
                            variant="outlined"
                            fullWidth

                            name="identificationFeatures.miscellaneous"
                            onChange={(e) => {
                                values.identificationFeatures['miscellaneous'] = e.target.value
                            }}
                        />
                    </Grid>


                </Grid>
            </Grid></>
    )
}
export default CommonDropDowns