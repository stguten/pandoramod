import pool from "../config/pg.config.js";
import { gerarUpdateQuery } from "../util/query.util.js";

async function adicionarAutorRepository(nome, id_usuario) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query('INSERT INTO moddownloader.autores (nome, id_usuario) values ($1, $2)', [nome, id_usuario]);
        await client.query('COMMIT');
        client.release();
        return rows.length > 0 ? rows : null;
    } catch (err) {
        console.log('Erro ao salvar registro: ', err);
        pool.query('ROLLBACK');
        client.release();
        throw Error(err.message);
    }
}

async function listarTodosOsAutoresRepository() {
    try {
        const { rows } = await pool.query("SELECT id, nome FROM moddownloader.autores where deletadoEm is null");
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar autores");
    }
}

async function listarAutorPorIdRepository(id) {
    try {
        const { rows } = await pool.query('SELECT id, nome FROM moddownloader.autores WHERE id = $1 and deletadoEm is null', [id]);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error);
    }
}

async function atualizarAutorRepository(idAutor, dadosAtualizacao) {
    const { query, params } = gerarUpdateQuery("moddownloader.autores", "id", idAutor, dadosAtualizacao);
    try {
        const { rows } = await pool.query(query, params);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarAutorRepository(id, hardDelete = false) {
    let queryText = "";
    try {
        !!process.env.PARANOID_MODE && !hardDelete 
            ? queryText = "UPDATE moddownloader.autores SET deletadoEm = CURRENT_TIMESTAMP WHERE id = $1"
            : queryText = "DELETE FROM moddownloader.autores WHERE id = $1";
        const resultado = await pool.query(queryText, [id]);
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

export {
    adicionarAutorRepository,
    listarTodosOsAutoresRepository,
    listarAutorPorIdRepository,
    atualizarAutorRepository,
    deletarAutorRepository
}