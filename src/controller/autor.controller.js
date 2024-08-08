import * as autorRepository from '../repository/autor.repository.js';
import { responseBuilder } from '../util/response.util.js';

async function listarTodosOsAutoresController(_, res) {
    try {
        const autores = await autorRepository.listarTodosOsAutoresRepository();
        return autores
            ? res.status(200).json(responseBuilder(200, `Foram encontrado um total de ${autores.length} autores.`, autores))
            : res.status(404).json(responseBuilder(404, 'Nenhum autor encontrado.'));
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

async function listarAutorPorIdController(req, res) {
    const { id } = req.params;
    try {
        const autor = await autorRepository.listarAutorPorIdRepository(id);
        console.log(autor);
        return autor
            ? res.status(200).send(responseBuilder(200, `Autor Encontrado`, autor))
            : res.status(404).send(responseBuilder(404, 'Autor não encontrado.'));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A busca gerou o seguinte erro: ${error.message}`));
    }
}

async function atualizarAutorController(req, res) {
    const { id } = req.params;
    const autor = req.body;

    try {
        const resultado = await autorRepository.atualizarAutorRepository(id, autor);
        return resultado
            ? res.status(200).send(responseBuilder(200, `O autor id ${id} foi atualizado com sucesso.`, resultado))
            : res.status(404).send(responseBuilder(404, 'Autor não encontrado.'));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A atualização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarAutorController(req, res) {
    const { id } = req.params;
    try {
        if(await autorRepository.listarAutorPorIdRepository(id) === null) return res.status(409).send(responseBuilder(409, 'Autor já deletado ou não existente na base de dados!'));
        const resultado = await autorRepository.deletarAutorRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, 'Autor deletado com sucesso.'))
            : res.status(404).send(responseBuilder(404, 'Autor não encontrado.'));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A exclusão gerou o seguinte erro: ${error.message}`));
    }
}

export {
    listarTodosOsAutoresController,
    listarAutorPorIdController,
    atualizarAutorController,
    deletarAutorController
}