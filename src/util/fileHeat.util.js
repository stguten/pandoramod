const regexSetences = {
    vehicle: [/vehicles\/(.*?)\/model\/([^\/]*)/i, /vehicles\/(.*?)\/texture\/([^\/]*)/i, /vehicles\/(.*?)\/sound\/([^\/]*)/i,
        /vehicles\/(.*?)\/script\/([^\/]*)/i],
    map: []
}

async function regexPatterns(caminho) {
    for (let i = 0; i < regexSetences.vehicle.length; i++) return caminho.match(regexSetences.vehicle[i]) ? true : false;
}


export { regexPatterns };
