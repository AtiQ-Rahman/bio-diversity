const { isValidValueOrKey } = require("./common");

exports.processKeys = async (label) => {
    let list = await this.matchKey()
    for (let item of list) {
        let matchRule = new RegExp(label.trim().toLowerCase());
        if (item.label.trim().toLowerCase() == label.trim().toLowerCase() || item.label.trim().toLowerCase().match(matchRule, 'i')) {
            return item.key
        }
    }
    return label


}

exports.getColumnsAndValues = async (object) => {
    let queryColumns = '('
    let queryValues = 'VALUES ('
    let keys = Object.keys(object)
    for (let idx = 0; idx < keys.length; idx++) {
        let key = keys[idx]
        if (idx !== keys.length - 1) {
            if (isValidValueOrKey(object[key])) {
                queryColumns += `${key},`
                queryValues += `'${object[key]}',`
            }
        }
        else {
            if (isValidValueOrKey(object[key])) {
                queryColumns += `${key})`
                queryValues += `'${object[key]}')`
            }
            else {
                queryColumns += `)`
                queryValues += `)`
            }
        }
    }
    return queryColumns + queryValues
}
exports.matchKey = async () => {
    let list = [
        {
            label: 'Major Bio-diversity Components',
            key: 'category'
        },
        {
            label: 'Category Data',
            key: 'addtionalCategories'
        },
        {
            label: 'Bio-Diversity Group',
            key: 'subCategory'
        },
        {
            label: 'SubGroup',
            key: 'subGroup'
        },
        {
            label: 'types / Types',
            key: 'types'
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
            label: 'Species',
            key: 'species'
        },
        {
            label: 'Sub Species',
            key: 'sub_species'
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
        // {
        //     label: 'Thumbnail(Image)',
        //     key: 'profile_image'
        // },
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
        {
            label: 'c-sequestration',
            key: 'csequestration'
        },
        {
            label: 'c-production',
            key: 'cproduction'
        },
        {
            label: 'o2-production',
            key: 'o2production'
        },
        {
            label: 'ecosystem status',
            key: 'ecosystemstatus'
        },
        {
            label: 'ecosystem value',
            key: 'ecosystemvalue'
        },


    ]
    return list
}