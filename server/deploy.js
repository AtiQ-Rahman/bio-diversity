

const fetch = require("node-fetch");
let url = `http://66.29.151.71:8080/update-LEQpNz2GB6PRh5uM`
let response = await fetch(url, {method: 'POST', body: JSON.stringify({})})
console.log({response})