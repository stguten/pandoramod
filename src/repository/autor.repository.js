import pool from "../config/pg.config.js";

async function adicionarAutorRepository(nome, id_usuario) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO autores (nome, id_usuario) values ($1, $2)', [nome, id_usuario]);
        await client.query('COMMIT');
        client.release();
        return true;
    } catch (err) {
        pool.query('ROLLBACK');
        console.log('Erro ao salvar registro: ', err);
        client.release();
        return false;
    }
}

async function listarTodosOsAutoresRepository() {
    try {
        const { rows } = await pool.query("SELECT id, nome FROM moddownloader.autores");
        return rows;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar autores");
    }
}

async function listarAutorPorIdRepository(id) {
    try {
        const { rows } = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        return rows;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error);
    }
}

async function atualizarAutorRepository(idAutor, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.autores", "id", idAutor, dadosAtualizacao);
    try {
        const resultado = await pool.query(query, params);
        if (resultado.rowCount > 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarAutorRepository(id) {
    try {
        const resultado = await pool.query('DELETE FROM autores WHERE id = $1', [id]);
        resultado.rowCount > 1 ? true : false;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error);
    }
}

export {
    adicionarAutorRepository,
    listarTodosOsAutoresRepository,
    listarAutorPorIdRepository,
    atualizarAutorRepository,
    deletarAutorRepository
}