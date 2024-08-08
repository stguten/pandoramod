import * as categoriaRepository from "../repository/categoria.repository.js";
import { responseBuilder } from "../util/response.util.js";

async function adicionarCategoriaController(req, res) {
    const { categoria } = req.body;
    try {
        const complemento = await categoriaRepository.adicionarCategoriaRepository(categoria);
        return complemento
            ? res.status(201).send(responseBuilder(201, "Categoria adicionada com sucesso", complemento))
            : res.status(400).send(responseBuilder(400, "Erro ao adicionar categoria"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A listagem gerou o seguinte erro: ${error.message}`));
    }
}

async function listarTodasAsCategoriasController(_, res) {
    try {
        const resultado = await categoriaRepository.pegarTodasAsCategoriasRepository();
        return resultado
            ? res.status(200).send(responseBuilder(200, `Foram encontrado um total de ${resultado.length} categorias.`, resultado))
            : res.status(404).send(responseBuilder(404, "Nenhuma categoria encontrada"));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A listagem gerou o seguinte erro: ${error.message}`));
    }
}

async function listarPorIdCategoriaController(id) {
    try {
        const resultado = await categoriaRepository.listarPorIdCategoriaRepository(id);
        return resultado ? resultado : null;
    } catch (error) {
        throw new Error("Erro ao buscar categoria por id");
    }
}

async function atualizarCategoriasController(req, res) {
    const { id } = req.params;
    try {
        const resultado = await categoriaRepository.atualizarCategoriasRepository(id, req.body);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Categoria atualizada com sucesso.", resultado))
            : res.status(404).send(responseBuilder(404, "Categoria não encontrada."));
    } catch (error) {
        console.log(error);        
        res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarCategoriaController(req, res) {
    const { id } = req.params;
    try {
        if (await listarPorIdCategoriaController(id) === null) return res.status(409).send(responseBuilder(409, "Categoria já deletada ou não existente na base de dados!"));
        const resultado = await categoriaRepository.deletarCategoriaRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Categoria deletada com sucesso."))
            : res.status(404).send(responseBuilder(404, "Categoria não encontrada."));
    } catch (error) {
        console.log(error);        
        res.status(500).send(responseBuilder(500, `A deleção gerou o seguinte erro: ${error.message}`));
    }
}

export {
    adicionarCategoriaController,
    listarTodasAsCategoriasController,
    atualizarCategoriasController,
    deletarCategoriaController
}