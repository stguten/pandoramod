import app from "./src/app.js";

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


/* 
import AdmZip from "adm-zip";
import { regexPatterns } from "./src/util/fileHeat.util.js";

let num = 0;
try {
    const zip = new AdmZip("./AMD Alamo e Solum.zip");
    let pastas = zip.getEntries().filter((zipEntry) => zipEntry.isDirectory);
    let total = zip.getEntries().filter((zipEntry) => zipEntry.isDirectory).length;
    console.log("Total:", total);

    for (const zipEntry of pastas) {
        if (await regexPatterns(zipEntry.entryName) === true) {
            num++;
        }
    }
    console.log("Regex total: ", num);
    const fileHeat = num/total*100 >= 80 ? "Alto" : num/total*100 >= 60 ? "Médio" : num/total*100 >= 40 ? "Baixo" : "Muito Baixo"; 
    console.log("File Heat:", fileHeat , "->", (num/total*100).toFixed(2) + "%");
} catch (err) {
    console.log(err.message);
}  */