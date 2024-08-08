import pool from "../config/pg.config.js";
import { gerarUpdateQuery } from "../util/query.util.js";

async function adicionarCategoriaRepository(categoria) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query('INSERT INTO moddownloader.categorias (nome) values ($1) RETURNING id, nome', [categoria]);
        await client.query('COMMIT');
        client.release();
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log('Erro ao salvar registro: ', error);
        pool.query('ROLLBACK');
        client.release();
        throw Error("Erro ao adicionar categoria");
    }
}

async function pegarTodasAsCategoriasRepository() {
    try {
        const { rows } = await pool.query("SELECT id, nome FROM moddownloader.categorias where status = true AND deletadoEm IS NULL");
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar categorias");
    }
}

async function listarPorIdCategoriaRepository(idCategoria) {
    try {
        const { rows } = await pool.query("SELECT id, nome FROM moddownloader.categorias where id = $1 AND status = true AND deletadoEm IS NULL", [idCategoria]);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar categoria por id");
    }
}

async function atualizarCategoriasRepository(idCategoria, dadosAtualizacao) {
    const { query, params } = gerarUpdateQuery("moddownloader.categorias", "id", idCategoria, dadosAtualizacao);

    try {
        const { rows } = await pool.query(query, params);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao atualizar categorias");
    }
}

async function deletarCategoriaRepository(idCategoria, hardDelete = false) {
    let queryText = "";
    try {
        !!process.env.PARANOID_MODE && !hardDelete
            ? queryText = "UPDATE moddownloader.categorias SET status = false, deletadoEm = CURRENT_TIMESTAMP WHERE id = $1"
            : queryText = "DELETE FROM moddownloader.categorias WHERE id = $1";
        const resultado = await pool.query(queryText, [idCategoria]);
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao deletar categoria");
    }
}

export { adicionarCategoriaRepository, pegarTodasAsCategoriasRepository, atualizarCategoriasRepository, deletarCategoriaRepository, listarPorIdCategoriaRepository }