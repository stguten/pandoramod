const regexSetences = {
    vehicle: [/vehicles\/(.*?)\/model\/([^\/]*)/i, /vehicles\/(.*?)\/texture\/([^\/]*)/i, /vehicles\/(.*?)\/sound\/([^\/]*)/i,
        /vehicles\/(.*?)\/script\/([^\/]*)/i],
    map: [/maps\/(.*?)\/TTData\/([^\/]*)/i, /vehicles\/(.*?)\/texture\/([^\/]*)/i, 
        /(\/vehicles\/(.*?)\/texture\/(?:ailists\.cfg|global\.cfg|drivers\.txt|humans\.txt|registrations\.txt))/i],    
}

async function regexPatterns(caminho) {
    for (let i = 0; i < regexSetences.vehicle.length; i++) return caminho.match(regexSetences.vehicle[i]) ? true : false;
}


export { regexPatterns };
