import * as complementoRepository from '../repository/complemento.repository.js';
import { responseBuilder } from '../util/response.util.js';

async function adicionarComplementosController(req, res) {
    const { nome, tipo, descricao, autor } = req.body;

    try {
        const complemento = await complementoRepository.adicionarComplementosRepository(nome, tipo, descricao, autor);
        return complemento
            ? res.status(201).send(responseBuilder(201, 'Complemento adicionado com sucesso!'))
            : res.status(400).send(responseBuilder(400, 'Erro ao adicionar complemento!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarTodosOsComplementosController(_, res) {
    try {
        const complementos = await complementoRepository.listarTodosOsComplementosRepository();
        return complementos.length > 0
            ? res.status(200).send(responseBuilder(200, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarComplementosPorAutorController(req, res) {
    const autor = req.params.autor;
    try {
        const complementos = await complementoRepository.listarComplementosPorAutorRepository(autor);
        return complementos.length > 0
            ? res.status(200).send(responseBuilder(200, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarComplementosPorNomeController(req, res) {
    const nome = req.params.nome;

    try {
        const complementos = await complementoRepository.listarComplementosPorNomeRepository();
        return complementos.length !== null
            ? res.status(200).send(responseBuilder(200, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarComplementosPorCategoriaController(req, res) {
    const categoria = req.params.categoria;
    try {
        const complementos = await complementoRepository.listarComplementosPorCategoriaRepository(categoria);
        return complementos !== null
            ? res.status(200).send(responseBuilder(200, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function pegarComplementoPorIdController(req, res) {
    const id = req.params.id;
    try {
        const complemento = await complementoRepository.pegarComplementoPorIdController(id);
        return complemento !== null
            ? res.status(200).send(responseBuilder(200, complemento))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function atualizarComplementoController(req, res) {
    const id = req.params.id;
    const dadosAtualizacao = req.body;
    try {
        const complemento = await complementoRepository.atualizarComplementoRepository(id, dadosAtualizacao);
        return complemento
            ? res.status(200).send(responseBuilder(200, 'Complemento atualizado com sucesso!'))
            : res.status(400).send(responseBuilder(400, 'Erro ao atualizar complemento!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarComplementoController(req, res) {
    const id = req.params.id;
    try {
        const resultado = await complementoRepository.deletarComplementoRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, 'Complemento deletado com sucesso!'))
            : res.status(400).send(responseBuilder(400, 'Erro ao deletar complemento!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

export {
    adicionarComplementosController,
    listarTodosOsComplementosController,
    listarComplementosPorAutorController,
    listarComplementosPorNomeController,
    listarComplementosPorCategoriaController,
    pegarComplementoPorIdController,
    atualizarComplementoController,
    deletarComplementoController
}
