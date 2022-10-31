export const isMarker = (marker) => {
    if (marker == '' || marker == 'N/A') {
        return false
    }
    else {
        return true
    }
}
export const isValidImage = (marker) => {
    if (marker == '' || marker == 'N/A' || marker == 'null') {
        return false
    }
    else {
        return true
    }
}
export const createMapboxMarkerForDistribution = async (el, mapboxgl, imageUrl, speciesData, map) => {
    new mapboxgl.Marker(isMarker(speciesData.marker) ? el : "")
        .setLngLat([speciesData.districts[0].center[0], speciesData.districts[0].center[1]])
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(`
        <div >
        ${speciesData.profile_image !== '' ? ` <div style="height: 150px; width:200px;margin:8px; background-image: url('${imageUrl + '/' + speciesData.profile_image}'); background-size : cover ; background-repeat : no-repeat"></div>
        `: ''}
        <div className="popup">
            <h3 className="route-name">${speciesData.bangla}</h3>
            <div className="route-metric-row">
                <h4 className="row-title">Kingdom #</h4>
                <div className="row-value">${speciesData.kingdom}</div>
            </div>
            <div className="route-metric-row">
                <h4 className="row-title">species</h4>
                <div className="row-value">${speciesData.species}</div>
            </div>
            <p className="route-speciesData">Lng/Lat ${twoDecimal(speciesData.districts[0].center[0])},${twoDecimal(speciesData.districts[0].center[1])}</p>
        </div>
    </div>`


        ))
        .addTo(map.current);
}
export const createMapboxMarker = async (el, mapboxgl, marker, district, map) => {
    new mapboxgl.Marker(isMarker(marker) ? el : "")
        .setLngLat([district.center[0], district.center[1]])
        .addTo(map.current)
        .setPopup(new mapboxgl.Popup({ offset: 30 }).setHTML(`
        <div >
            <div className="popup">
                <h3 className="route-name">${district.place_name}</h3>
                <div className="route-metric-row">
                    <h4 className="row-title">Lng:</h4>
                    <div className="row-value">${twoDecimal(district.center[1])}</div>
                </div>
                <div className="route-metric-row">
                    <h4 className="row-title">Lat :</h4>
                    <div className="row-value">${twoDecimal(district.center[1])}</div>
                </div>
            </div>
        </div>`

        ))
}
export const createMarkerElement = async (el, styles, elements, marker, map) => {
    el.className = styles.marker;
    el.style.backgroundImage = `url('${marker}')`;
    el.style.backgroundStyle = 'cover'
    el.style.backgroundRepeat = 'no-repeat'
    el.style.backgroundPosition = 'center top'
    const zoom = map.current.getZoom();
    const scalePercent = 1 + (zoom - 6) * 0.4;
    let top = scalePercent * 40
    let height = scalePercent * 70
    let width = scalePercent * 70
    el.style.height = `${height}px`
    el.style.width = `${width}px`
    el.style.top = `-${top}px`;
    el.style.backgroundSize = 'contain';
    elements.push(el)
}

export const imageLoader = ({ src }) => `${src}`


export const pageGroups = {
    plants: 'Plants',
    animals: 'Animals',
    fungi: 'Fungi',
    micro: 'Microorganisms',
    eco: 'Ecosystem Diversity',
    genetic: 'Genetic & Sub-Cellular Diversity'
}

export const initialValues = {
    kingdom: null,
    phylum: null,
    class_name: null,
    order_name: null,
    family: null,
    genus: null,
    species: null,
    plants: null,
    subSpecies: null,
    subGroup: null,
    variety: null,
    subVariety: null,
    clone: null,
    forma: null,
    type: null,
    nameOfSpecies: {
        bangla: null,
        english: null,
        commonName: null,
        synonym: null,
    },
    identificationFeatures: {},
    categories: [],
    additionalFiles: [],
    profileImage: null,
    csequestration: null,
    cproductions: null,
    ecosystemstatus: null,
    ecosystemvalue: null,
    geneticdata: null,
    speciestaxa: null,
}
export const twoDecimal = (num) => {
    return (Math.round(parseFloat(num) * 100000) / 100000).toFixed(5);
}
export const processNames = (name)=>{
    return name?.toLowerCase()?.replaceAll('-','').replaceAll(' ','').replaceAll('/','')
}
export const processSpeciesObject = (speciesDetails) => {
    let mainObject = {}
    let skippedObject = speciesDetails
    let priorityKeys = ['kingdom', 'phylum', 'class_name', 'order_name', 'species', 'family', 'genus', 'clone', 'forma', 'sub_species', 'variety', 'sub_variety']
    priorityKeys.map((key) => {
        mainObject[key] = speciesDetails[key]
    })
    let skippedKeys = ['id', 'additional_files', 'additionaL_files', 'marker', 'serial', 'idenitificationFeatures', 'profile_image', 'createdDatetimeStamp', 'district']
    skippedKeys = skippedKeys.concat(priorityKeys)
    skippedKeys.map((key) => {
        delete skippedObject[key]
    })
    Object.assign(mainObject, skippedObject)
    return mainObject
}
export const processKeys = (key) => {
    let list = matchKey()
    for (let item of list) {
        if (key.trim() == item.key.trim()) {
            return item.label
        }
    }
    return key
}
function matchKey() {
    let list = [
        {
            label: 'Category Name',
            key: 'category'
        },
        {
            label: 'Category Data',
            key: 'addtionalCategories.category'
        },
        {
            label: 'Sub Category',
            key: 'identificationFeatures.subCategory'
        },
        {
            label: 'Kingdom',
            key: 'kingdom'
        },
        {
            label: "Division / Phylum",
            key: 'phylum'
        },
        {
            label: 'Class',
            key: 'class_name'
        },
        {
            label: 'Order',
            key: 'order_name'
        },
        {
            label: 'Family',
            key: 'family'
        },
        {
            label: 'Genus',
            key: 'genus'
        },
        {
            label: 'Sub Species',
            key: 'sub_species'
        },
        {
            label: 'Species',
            key: 'species'
        },
        {
            label: 'Variety',
            key: 'variety'
        },
        {
            label: 'Sub Variety',
            key: 'sub_variety'
        },
        {
            label: 'Clone',
            key: 'clone'
        },
        {
            label: 'Forma',
            key: 'forma'
        },
        {
            label: 'English Name',
            key: 'english'
        },
        {
            label: 'Bangla/Local Name',
            key: 'bangla'
        },
        {
            label: 'Synonym',
            key: 'synonym'
        },
        {
            label: 'Common Name',
            key: 'common'
        },
        {
            label: 'Thumbnail(Image)',
            key: 'profile_image'
        },
        {
            label: 'Feature Image',
            key: 'additional_files'
        },
        {
            label: 'Marker (wxh) image',
            key: 'marker'
        },
        {
            label: 'District',
            key: 'district'
        },
        {
            label: 'Locality',
            key: 'identificationFeatures.locality'
        },
        {
            label: 'GIS',
            key: 'gis'
        },
        {
            label: 'Size(cm)',
            key: 'identificationFeatures.size'
        },
        {
            label: 'Physical Identification Details',
            key: 'identificationFeatures.physical'
        },
        {
            label: 'Habitat',
            key: 'identificationFeatures.habitat'
        },
        {
            label: 'Behavior/Habit',
            key: 'identificationFeatures.behavior'
        },
        {
            label: 'Migration/Resident Status',
            key: 'identificationFeatures.migration'
        },
        {
            label: 'Breeding Behavior',
            key: 'identificationFeatures.breeding'
        },
        {
            label: 'Chromosome Number',
            key: 'identificationFeatures.chromosome'
        },
        {
            label: 'Moleculer Characteristic',
            key: 'identificationFeatures.molecular'
        },
        {
            label: 'Notes',
            key: 'identificationFeatures.notes'
        },
        {
            label: 'Ecological Role',
            key: 'identificationFeatures.role'
        },
        {
            label: 'World Distribution',
            key: 'identificationFeatures.distribution'
        },
        {
            label: 'IUCN Status',
            key: 'identificationFeatures.iucn'
        },
        {
            label: 'Economic Importance',
            key: 'identificationFeatures.economic'
        },
        {
            label: 'Medicinal Use',
            key: 'identificationFeatures.medicinal'
        },
        {
            label: 'Uses as Foods and Feeds',
            key: 'identificationFeatures.foods'
        },
        {
            label: 'As Pharmaceuticals',
            key: 'identificationFeatures.pharmaceuticals'
        },
        {
            label: 'As Industrial Product',
            key: 'identificationFeatures.industrial'
        },
        {
            label: 'Significance/Other Information',
            key: 'identificationFeatures.significance'
        },
        {
            label: 'Other Uses',
            key: 'identificationFeatures.otherUses'
        },
        {
            label: 'Ecological Indicator',
            key: 'identificationFeatures.ecologicalIndicator'
        },
        {
            label: 'types of plant',
            key: 'identificationFeatures.typeOfPlant'
        },
        {
            label: 'Exotic/Indegenous',
            key: 'identificationFeatures.exotic'
        },
        {
            label: 'Crop/Fruit/ Industrial Products/Weed etc',
            key: 'identificationFeatures.typeOfSpecies'
        },
        {
            label: 'Fruting Time',
            key: 'identificationFeatures.fruitingTime'
        },
        {
            label: 'Scientific Research Interest',
            key: 'identificationFeatures.scientific'
        },
        {
            label: 'Value C-Sequester',
            key: 'identificationFeatures.sequester'
        },
        {
            label: 'Health Hazard',
            key: 'identificationFeatures.health_hazard'
        },
        {
            label: 'Eco System Benefit',
            key: 'identificationFeatures.eco_benefit'
        },
        {
            label: 'Growing Season',
            key: 'identificationFeatures.season'
        },
        {
            label: 'Threats to The Species/Genus',
            key: 'identificationFeatures.threats'
        },
        {
            label: 'Conservation Status',
            key: 'identificationFeatures.conservation'
        },
        {
            label: 'Measures Taken',
            key: 'identificationFeatures.measures'
        },
        {
            label: 'Miscellaneous',
            key: 'identificationFeatures.miscellaneous'
        },

    ]
    return list
}