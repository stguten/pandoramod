import pool from "../config/pg.config.js";
import { gerarUpdateQuery } from "../util/query.util.js";

async function adicionarUsuarioRepository(username, email, password) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query('INSERT INTO moddownloader.usuarios (login, email, senha) values ($1, $2, $3) RETURNING *', [username, email, password]);
        const perfil = await client.query(`INSERT INTO moddownloader.autores (nome, idUsuario) values ($1, $2) RETURNING *`, [username, rows[0].id]);
        await client.query('COMMIT');
        client.release();
        return perfil.rows.length > 0 ? perfil.rows : null;
    } catch (err) {
        console.log('Erro ao salvar registro: ', err);
        pool.query('ROLLBACK');
        client.release();
        throw Error(err.message);
    }
}

async function listarUsuarioPorNomeRepostiory(username) {
    try {
        const { rows } = await pool.query('SELECT * FROM moddownloader.usuarios WHERE login = $1 and deletadoEm is null', [username]);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error.message);
    }
}

async function listarUsuarioPorIdRepostiory(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM moddownloader.usuarios WHERE id = $1 and deletadoEm is null', [id]);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error.message);
    }
}

async function atualizarUsuarioRepository(idUsuario, dadosAtualizacao) {
    const { query, params } = gerarUpdateQuery("moddownloader.usuarios", "id", idUsuario, dadosAtualizacao);
    try {
        const { rows } = await pool.query(query, params);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarUsuarioRepository(idUsuario, hardDelete = false) {
    let queryText = "";
    try {
        !!process.env.PARANOID_MODE && !hardDelete
            ? queryText = "UPDATE moddownloader.usuarios SET deletadoEm = CURRENT_TIMESTAMP WHERE id = $1"
            : queryText = "DELETE FROM moddownloader.usuarios WHERE id = $1";
        const resultado = await pool.query(queryText, [idUsuario]);
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }

}

export { 
    adicionarUsuarioRepository, 
    listarUsuarioPorNomeRepostiory, 
    atualizarUsuarioRepository, 
    deletarUsuarioRepository,
    listarUsuarioPorIdRepostiory,    
};
