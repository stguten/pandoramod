import pool from "../config/pg.config.js";

async function adicionarComplementosRepository(nome, tipo, descricao, autor) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await pool.query("INSERT INTO complementos (nome, tipo, descricao, autor) VALUES ($1, $2, $3, $4)", [nome, tipo, descricao, autor]);
        await client.query("COMMIT");
        client.release();
        return true;
    } catch (error) {
        console.log(error);
        client.release();
        return false;
    }

}

async function listarTodosOsComplementosRepository() {
    try {
        const { rows } = await pool.query(`SELECT * FROM complementos`);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar todos os complementos");
    }
}

async function listarComplementosPorAutorRepository(nomeAutor) {
    try {
        const { rows } = await pool.query(`SELECT * FROM complementos WHERE autor = $1`, [nomeAutor]);
        return rows.length > 0 ? rows : null;        
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por autor");
    }
}

async function listarComplementosPorNomeRepository(nomeComplemento) {
    try {
        const { rows } = await pool.query(`SELECT * FROM complementos WHERE nome = $1`, [nomeComplemento]);
        return rows.length > 0 ? rows : null;        
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por nome");
    }
}

async function listarComplementosPorCategoriaRepository(tipoComplemento) {
    try {
        const { rows } = await pool.query(`SELECT * FROM complementos WHERE tipo = $1`, [tipoComplemento]);
        return rows.length > 0 ? rows : null;        
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por categoria");
    }
}

async function listarComplementoPorIdRepository(idComplemento) {
    try {
        const { rows } = await pool.query(`SELECT * FROM complementos WHERE id = $1`, [idComplemento]);
        return rows.length > 0 ? rows : null;        
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complemento por id");
    }
}

async function atualizarComplementoRepository(idComplemento, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.complementos", "id", idComplemento, dadosAtualizacao);
    try {
        const resultado = await pool.query(query, params);
        if (resultado.rowCount > 1) return true;
        return false;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarComplementoRepository(idComplemento) {
    try {
        const resultado = await pool.query('DELETE FROM complementos WHERE id = $1', [idComplemento]);
        return resultado.rowCount > 1 ? true : false;
    } catch (error) {
        console.log('Erro ao buscar registro: ', error);
        throw Error(error);
    }
}

export {
    adicionarComplementosRepository,
    listarTodosOsComplementosRepository,
    listarComplementosPorAutorRepository,
    listarComplementosPorNomeRepository,
    listarComplementosPorCategoriaRepository,
    listarComplementoPorIdRepository,
    atualizarComplementoRepository,
    deletarComplementoRepository
}