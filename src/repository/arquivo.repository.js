import pool from "../config/pg.config.js";

async function inserirArquivoRepository(nome, hash, versao, id_complemento) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const idArquivo = await client.query("INSERT INTO arquivos (nome, hash, versao, id_complemento) VALUES($1, $2, $3, $4)", [nome, hash, versao, id_complemento]);
        await client.query("COMMIT");
        return idArquivo.rowCount > 0 ? true : false;
    } catch (error) {
        client.query("ROLLBACK");
        console.error(error.message);
        throw Error(error.message);
    }
}

async function buscarArquivoPorIdRepository(id) {
    try {
        const { rows } = await pool.query("SELECT nome, hash, versao, status FROM moddownloader.arquivos WHERE id = $1", [id]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log(error.message);
        throw Error(error.message);
    }
}

async function buscarArquivoPorComplementoRepository(idComplemento) {
    try{
        const { rows } = await pool.query("SELECT nome, hash, versao, status FROM moddownloader.arquivos WHERE id_complemento = $1", [idComplemento]);
        return rows.length > 0 ? rows : null;
    }catch(error){
        console.log(error.message);
        throw Error(error.message);
    }

}

async function atualizarArquivoRepository(id, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.usuario", "id", idUsuario, dadosAtualizacao);
    try {
        const resultado = await pool.query(query, params);
        return resultado.rowCount > 1 ? true : false;
    } catch (error) {
        console.log(error.message);
        throw Error(error.message);
    }
}

async function removerArquivoRepository(id) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const resultado = await pool.query("DELETE FROM arquivos WHERE id = $1", [id]);
        await client.query("COMMIT");
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

export {
    inserirArquivoRepository,
    buscarArquivoPorIdRepository,
    buscarArquivoPorComplementoRepository,
    atualizarArquivoRepository,
    removerArquivoRepository
};