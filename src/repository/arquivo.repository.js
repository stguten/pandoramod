import pool from "../config/pg.config.js";

async function inserirArquivoRepository(nomeOriginal, nomeLocal, hash, idComplemento, idTipoArquivo, status) {    
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const { rows } = await client.query("INSERT INTO moddownloader.arquivos (nomeOriginal, nomeLocal, hash, idComplemento, idTipoArquivo, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [nomeOriginal, nomeLocal, hash, idComplemento, idTipoArquivo, status]);
        await client.query("COMMIT");
        return rows.length > 0 ? rows : false;
    } catch (error) {
        client.query("ROLLBACK");
        console.error(error);
        throw Error(error.message);
    }
}

async function buscarArquivoPorIdRepository(id) {
    try {
        const { rows } = await pool.query("SELECT id, nomeOriginal, nomeLocal, hash, idTipoArquivo FROM moddownloader.arquivos WHERE id = $1 AND deletadoEm IS null", [id]);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function buscarArquivoPorComplementoRepository(idComplemento) {
    try {
        const { rows } = await pool.query("SELECT id, nomeOriginal, hash, idTipoArquivo FROM moddownloader.arquivos WHERE idComplemento = $1 and status = true and deletadoEm IS null", [idComplemento]);
        return rows.length > 0 ? rows : null;        
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }

}

async function atualizarArquivoRepository(idUsuario, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.usuarios", "id", idUsuario, dadosAtualizacao);
    try {
        const { rows } = await pool.query(query, params);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function removerArquivoRepository(id, hardDelete = false) {
    let queryText = "";
    try {
        !!process.env.PARANOID_MODE && !hardDelete 
            ? queryText = "UPDATE moddownloader.arquivos SET deletadoEm = CURRENT_TIMESTAMP WHERE id = $1" 
            : queryText = "DELETE FROM moddownloader.arquivos WHERE id = $1";
        const resultado = await pool.query(queryText, [id]);
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

export {
    inserirArquivoRepository,
    buscarArquivoPorIdRepository,
    buscarArquivoPorComplementoRepository,
    atualizarArquivoRepository,
    removerArquivoRepository
};