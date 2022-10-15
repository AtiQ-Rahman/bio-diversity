export const imageLoader = ({ src }) => `${src}`
export const twoDecimal = (num) => {
    console.log(parseFloat(num))
    return (Math.round(parseFloat(num) * 100000) / 100000).toFixed(5);
}
export const processSpeciesObject = (speciesDetails) => {
    let mainObject = {}
    let skippedObject = speciesDetails
    let priorityKeys = ['kingdom', 'phylum', 'class_name', 'order_name', 'species', 'family', 'genus', 'clone', 'forma', 'sub_species', 'variety', 'sub_variety']
    priorityKeys.map((key) => {
        mainObject[key] = speciesDetails[key]
    })
    let skippedKeys = ['id', 'additional_files', 'additionaL_files','marker', 'serial', 'idenitificationFeatures' ,'profile_image','createdDatetimeStamp']
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