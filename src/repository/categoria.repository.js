import pool from "../config/pg.config.js";
import gerarUpdateQuery from "../util/query.util.js";

async function adicionarCategoriaRepository(categoria) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO moddownloader.tipos_complementos (nome) values ($1)', [categoria]);
        await client.query('COMMIT');
        client.release();
        return true;
    } catch (error) {
        pool.query('ROLLBACK');
        console.log('Erro ao salvar registro: ', error);
        client.release();
        throw Error("Erro ao adicionar categoria");
    }
}

async function pegarTodasAsCategoriasRepository() {
    try {
        const { rows } = await pool.query("SELECT * FROM moddownloader.tipos_complementos");
        return rows;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar categorias");
    }
}

async function atualizarCategoriasRepository(idCategoria, dadosAtualizacao) {
    const querys = gerarUpdateQuery("moddownloader.tipos_complementos", "id", idCategoria, dadosAtualizacao);
    try {
        const resultado = await pool.query(querys.query, querys.queryParams);
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao atualizar categorias");
    }
}

async function deletarCategoriaRepository(idCategoria) {
    try {
        const { rows } = await pool.query(`DELETE FROM moddownloader.tipos_complementos WHERE id = $1`, [idCategoria]);
        return rows.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao deletar categoria");
    }
}

export { adicionarCategoriaRepository, pegarTodasAsCategoriasRepository, atualizarCategoriasRepository, deletarCategoriaRepository }