import * as complementoRepository from '../repository/complemento.repository.js';
import { fileProcessing } from '../util/fileProcessing.util.js';
import { responseBuilder } from '../util/response.util.js';

async function adicionarComplementosController(req, res) {
    const { nome, descricao, autor, categoria } = req.body;

    try {
        const complemento = await complementoRepository.adicionarComplementosRepository(nome, descricao, autor, categoria);
        fileProcessing(req.files, complemento[0].id);

        return complemento
            ? res.status(201).send(responseBuilder(201, 'Complemento adicionado com sucesso!', complemento))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarTodosOsComplementosController(_, res) {
    try {
        const complementos = await complementoRepository.listarTodosOsComplementosRepository();
        return complementos
            ? res.status(200).send(responseBuilder(200, `Foram encontrados ${complementos.length} complementos.`, complementos))
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
        return complementos
            ? res.status(200).send(responseBuilder(200, `O autor possui ${complementos.length} complementos.`, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarComplementosPorNomeController(req, res) {
    const nome = req.params.nome;

    try {
        const complementos = await complementoRepository.listarComplementosPorNomeRepository(nome);
        return complementos
            ? res.status(200).send(responseBuilder(200, `Existem ${complementos.length} com esse nome.`, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function listarComplementosPorCategoriaController(req, res) {
    const categoria = req.params.id;
    try {
        const complementos = await complementoRepository.listarComplementosPorCategoriaRepository(categoria);
        return complementos !== null
            ? res.status(200).send(responseBuilder(200, `Existem ${complementos.length} nessa categoria.`, complementos))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function pegarComplementoPorIdController(req, res) {
    const id = req.params.id;
    try {
        const complemento = await complementoRepository.listarComplementoPorIdRepository(id);
        return complemento
            ? res.status(200).send(responseBuilder(200, `Complemento Encontrado.`, complemento))
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
            ? res.status(200).send(responseBuilder(200, 'Complemento atualizado com sucesso!', complemento))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A atulização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarComplementoController(req, res) {
    const id = req.params.id;
    try {
        if (await complementoRepository.listarComplementoPorIdRepository(id) === null) return res.status(409).send(responseBuilder(409, 'Complemento já deletado ou não existente na base de dados!'));
        const resultado = await complementoRepository.deletarComplementoRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, 'Complemento deletado com sucesso!'))
            : res.status(404).send(responseBuilder(404, 'Nenhum complemento encontrado!'));
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
