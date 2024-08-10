import pool from "../config/pg.config.js";

async function adicionarComplementosRepository(nome, descricao, idAutor, categoria) {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const { rows } = await client.query("INSERT INTO moddownloader.complementos (nome, descricao, idAutor, idCategoria) VALUES ($1, $2, $3, $4) RETURNING *", [nome, descricao, idAutor, categoria]);
        await client.query("COMMIT");
        client.release();
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        client.query("ROLLBACK");
        client.release();
        throw Error("Erro ao adicionar complemento");
    }

}

async function listarTodosOsComplementosRepository() {
    try {
        const { rows } = await pool.query(
            `select c.id, c.nome, c.descricao, c.logoComplemento, a.nome, ct.nome as categoria
            from moddownloader.complementos c
            left join moddownloader.autores a on a.id = c.idAutor
            left join moddownloader.categorias ct on ct.id = c.idCategoria
            where c.status = true and c.deletadoEm is null`
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar todos os complementos");
    }
}

async function listarComplementosPorAutorRepository(idAutor) {
    try {
        const { rows } = await pool.query(
            `select c.id, c.nome, c.descricao, c.logoComplemento, a.nome, ct.nome as categoria
            from moddownloader.complementos c
            left join moddownloader.autores a on a.id = c.idAutor
            left join moddownloader.categorias ct on ct.id = c.idCategoria
            where c.idautor = $1 and c.status = true and c.deletadoEm is null `, [idAutor]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por autor");
    }
}

async function listarComplementosPorNomeRepository(nomeComplemento) {
    try {
        const { rows } = await pool.query(
            `select c.id, c.nome, c.descricao, c.logoComplemento, a.nome, ct.nome as categoria
            from moddownloader.complementos c
            left join moddownloader.autores a on a.id = c.idAutor
            left join moddownloader.categorias ct on ct.id = c.idCategoria
            where c.nome like $1 and c.status = true and c.deletadoEm is null `, [`%${nomeComplemento}%`]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por nome");
    }
}

async function listarComplementosPorCategoriaRepository(idTipoComplemento) {
    try {
        const { rows } = await pool.query(
            `select c.id, c.nome, c.descricao, c.logoComplemento, a.nome, ct.nome as categoria
            from moddownloader.complementos c
            left join moddownloader.autores a on a.id = c.idAutor
            left join moddownloader.categorias ct on ct.id = c.idCategoria
            where c.idCategoria = $1 and c.status = true and c.deletadoEm is null `, [idTipoComplemento]
        );
        console.log(rows);
        
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complementos por categoria");
    }
}

async function listarComplementoPorIdRepository(idComplemento) {
    try {
        const { rows } = await pool.query(
            `select c.id, c.nome, c.descricao, c.logoComplemento, a.nome, ct.nome as catergoria
            from moddownloader.complementos c
            left join moddownloader.autores a on a.id = c.idAutor
            left join moddownloader.categorias ct on ct.id = c.idCategoria
            where c.id = $1 and c.status = true and c.deletadoEm is null `, [idComplemento]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error("Erro ao buscar complemento por id");
    }
}

async function atualizarComplementoRepository(idComplemento, dadosAtualizacao) {
    const { query, params } = generateUpdateQuery("moddownloader.complementos", "id", idComplemento, dadosAtualizacao);
    try {
        const { rows } = await pool.query(query, params);
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.log(error);
        throw Error(error.message);
    }
}

async function deletarComplementoRepository(idComplemento, hardDelete = false) {
    let queryText = "";
    try {
        !!process.env.PARANOID_MODE && !hardDelete
            ? queryText = "UPDATE moddownloader.complementos SET status = false, deletadoEm = CURRENT_TIMESTAMP WHERE id = $1"
            : queryText = "DELETE FROM moddownloader.complementos WHERE id = $1";
        const resultado = await pool.query(queryText, [idComplemento]);
        return resultado.rowCount > 0 ? true : false;
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