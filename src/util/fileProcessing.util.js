import * as fs from 'node:fs';
import * as crypto from 'node:crypto';
import * as path from 'node:path';
import AdmZip from "adm-zip";
import * as arquivoRepository from '../repository/arquivo.repository.js';
import { regexPatterns } from "./fileHeat.util.js";
import { atualizarComplementoRepository } from '../repository/complemento.repository.js';

async function hashGenerator(filePath) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('sha256');
        const rs = fs.createReadStream(path.resolve(filePath));
        rs.on('error', err => reject(err));
        rs.on('data', chunk => hash.update(chunk));
        rs.on('end', () => resolve(hash.digest('hex')));
    });
}

async function heatchecker(filePath) {    
    let num = 0;
    try {
        const zip = new AdmZip(filePath);
        let pastas = zip.getEntries().filter((zipEntry) => zipEntry.isDirectory);
        let total = zip.getEntries().filter((zipEntry) => zipEntry.isDirectory).length;

        for (const zipEntry of pastas) {
            if (await regexPatterns(zipEntry.entryName) === true) {
                num++;
            }
        }

        const fileHeat = num / total * 100 >= 80 ? true : false;        
        return fileHeat;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao verificar a integralidade do arquivo");
    }
}

async function fileProcessing(files, idComplemento) {
    const { logo, arquivo } = files;   

    const arquivoResult = await arquivoRepository.inserirArquivoRepository(arquivo[0].originalname, arquivo[0].filename, await hashGenerator(arquivo[0].path), idComplemento, 1, await heatchecker(arquivo[0].path));
    const logoResult = await arquivoRepository.inserirArquivoRepository(logo[0].originalname, logo[0].filename, await hashGenerator(logo[0].path), idComplemento, 2, true); 

    await atualizarComplementoRepository(idComplemento, { ultimaVersao: arquivoResult.id, logoComplemento: logoResult.id });

}

export { fileProcessing };