import * as categoriaRepository from "../repository/categoria.repository.js";
import { responseBuilder } from "../util/response.util.js";

async function adicionarCategoriaController(req, res) {
    const { categoria } = req.body;
    try {
        const complemento = await categoriaRepository.adicionarCategoriaRepository(categoria);
        return complemento
            ? res.status(201).send(responseBuilder(201, "Categoria adicionada com sucesso"))
            : res.status(400).send(responseBuilder(400, "Erro ao adicionar categoria"));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A listagem gerou o seguinte erro: ${error.message}`));
    }
}

async function listarTodasAsCategoriasController(_, res) {
    try {
        const resultado = await categoriaRepository.pegarTodasAsCategoriasRepository();
        return resultado.length > 0
            ? res.status(200).send(responseBuilder(200, resultado))
            : res.status(404).send(responseBuilder(404, "Nenhuma categoria encontrada"));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A listagem gerou o seguinte erro: ${error.message}`));
    }
}

async function atualizarCategoriasController(req, res) {
    const { idCategoria } = req.params;
    const { categoria } = req.body;

    try {
        const resultado = await categoriaRepository.atualizarCategoriasRepository(idCategoria, categoria);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Categoria atualizada com sucesso"))
            : res.status(400).send(responseBuilder(400, "Erro ao atualizar categoria"));
    } catch (error) {
        res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarCategoriaController(req, res) {
    const { idCategoria } = req.params;
    try {
        const resultado = await categoriaRepository.deletarCategoriaRepository(idCategoria);
        return resultado
            ? res.status(200).send(responseBuilder(200, "Categoria deletada com sucesso"))
            : res.status(400).send(responseBuilder(400, "Erro ao deletar categoria"));
    } catch (error) {
        res.status(500).send(responseBuilder(500, `A deleção gerou o seguinte erro: ${error.message}`));
    }
}

export {
    adicionarCategoriaController,
    listarTodasAsCategoriasController,
    atualizarCategoriasController,
    deletarCategoriaController
}