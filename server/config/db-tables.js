const requestSpeciesTable = (table) => {
    return `CREATE TABLE ${table} (
            id int NOT NULL AUTO_INCREMENT,
            serial varchar(10),
            status varchar(20),
            requested_by varchar(1000),
            bangla varchar(255),
            english varchar(255),
            common varchar(255),
            synonym varchar(255),
            subGroup varchar(255),
            district varchar(1000),
            profile_image longtext,
            category varchar(255),
            subCategory varchar(255),
            identificationFeatures longtext,
            additional_files longtext,
            kingdom varchar(255),
            phylum varchar(255),
            class_name varchar(255),
            order_name varchar(255),
            family varchar(255),
            genus varchar(255),
            species varchar(255),
            addtionalCategories longtext,
            sub_species varchar(255),
            address varchar(255),
            clone varchar(255),
            variety varchar(255),
            sub_variety varchar(255),
            forma varchar(255),
            lastModified datetime,
            createdDatetimeStamp datetime,
            lng varchar(255),
            lat varchar(255),
            marker longtext,
            markerColor varchar(100),
            PRIMARY KEY (id)
        );`

}

const speciesTable = (table) => {
    return `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        serial varchar(10),
        bangla varchar(255),
        english varchar(255),
        common varchar(255),
        synonym varchar(255),
        district varchar(1000),
        subGroup varchar(255),
        profile_image longtext,
        category varchar(255),
        subCategory varchar(255),
        identificationFeatures longtext,
        additional_files longtext,
        kingdom varchar(255),
        phylum varchar(255),
        class_name varchar(255),
        order_name varchar(255),
        family varchar(255),
        genus varchar(255),
        species varchar(255),
        addtionalCategories longtext,
        sub_species varchar(255),
        address varchar(255),
        clone varchar(255),
        variety varchar(255),
        sub_variety varchar(255),
        forma varchar(255),
        createdDatetimeStamp datetime,
        lastModified datetime,
        lng varchar(255),
        lat varchar(255),
        marker longtext,
        markerColor varchar(100),
        PRIMARY KEY (id)
    );`
}
const categoryTable = (table) => {
    return `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        serial varchar(10),
        name varchar(255),
        type varchar(20),
        meta longtext,
        createdBy varchar(255),
        createdDatetimeStamp datetime,
        lastModified datetime,
        PRIMARY KEY (id)
    );`
}
const homepageTable = (table) => {
    return `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        serial varchar(10),
        name varchar(255),
        selected boolean,
        sliderImages longtext,
        meta longtext,
        recentSighting varchar(255),
        createdDatetimeStamp datetime,
        lastModified datetime,
        PRIMARY KEY (id)
    );`
}
const subcategoriesTable = (table) => {
    let createQuery = `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        name varchar(1000) NOT NULL,
        linkID varchar(255),
        createdDatetimeStamp datetime,
        lastModified datetime,
        PRIMARY KEY (id),
        FOREIGN KEY (linkID) REFERENCES bio_diversity_${this.tableTypes.categories}(serial)
    )`
    return createQuery
}
const deletedSpeciesTable = (table) => {
    let createQuery = `CREATE TABLE ${table} (
        id int NOT NULL AUTO_INCREMENT,
        table_name varchar(255) NOT NULL,
        data longtext,
        createdDatetimeStamp datetime,
        lastModified datetime,
        PRIMARY KEY (id)
    )`
    return createQuery
}
module.exports = {
    categoryTable,
    subcategoriesTable,
    requestSpeciesTable,
    homepageTable,
    speciesTable,
    deletedSpeciesTable
}