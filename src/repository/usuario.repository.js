import pool from "../config/pg.config.js";

async function adicionarUsuarioRepository(username, email, password) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO moddownloader.usuario (login, email, senha) values ($1, $2, $3)', [username, email, password]);
        await client.query(`INSERT INTO moddownloader.autores (nome, id_usuario) values ($1, (SELECT id FROM moddownloader.usuario WHERE login = $2))`, [username, username]);
        await client.query('COMMIT');
        client.release();
        return true;
    } catch (err) {
        pool.query('ROLLBACK');
        client.release();
        console.log('Erro ao salvar registro: ', err);
        throw Error(err);
    }
}

async function pegarUsuarioRepostiory(username) {
    try {
        const { rows } = await pool.query('SELECT id, login, senha FROM moddownloader.usuario WHERE login = $1', [username]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error);
    }
}

async function atualizarUsuarioRepository(idUsuario, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.usuario", "id", idUsuario, dadosAtualizacao);
    try {
        const resultado = await pool.query(query, params);
        if (resultado.rowCount > 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarUsuarioRepository(idUsuario) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const resultado = await pool.query('DELETE FROM moddownloader.usuario WHERE id = $1', [idUsuario]);
        await client.query('COMMIT');
        return resultado.rowCount > 0 ? true : false;
    } catch (error) {
        client.query('ROLLBACK');
        console.log('Erro ao deletar registro: ', error);
        throw Error(error);
    }

}

export { adicionarUsuarioRepository, pegarUsuarioRepostiory, atualizarUsuarioRepository, deletarUsuarioRepository };
