const regexSetences = {
    vehicle: [/vehicles\/(.*?)\/model\/([^\/]*)/i, /vehicles\/(.*?)\/texture\/([^\/]*)/i, /vehicles\/(.*?)\/sound\/([^\/]*)/i,
        /vehicles\/(.*?)\/script\/([^\/]*)/i],
    map: []
}

async function regexPatterns(caminho, regexType) {
    for (let i = 0; i < vehicleRegex.length; i++) return caminho.match(vehicleRegex[regexType][i]) ? true : false;
}


export { regexPatterns };
