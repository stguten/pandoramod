import * as autorRepository from '../repository/autor.repository.js';
import { responseBuilder } from '../util/response.util.js';

async function listarTodosOsAutoresController(_, res) {
    try {
        const autores = await autorRepository.listarTodosOsAutoresRepository();
        return autores.length > 0 
            ? res.status(200).send(responseBuilder(200, autores)) 
            : res.status(404).send({ message: 'Nenhum autor encontrado' });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

async function listarAutorPorIdController(req, res) {
    const { id } = req.params;
    try {
        const autor = await autorRepository.listarAutorPorIdRepository(id);
        return autor.length > 0 
            ? res.status(200).send(responseBuilder(200, autor)) 
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
            ? res.status(200).send(responseBuilder(200, 'Autor atualizado com sucesso.')) 
            : res.status(404).send(responseBuilder(404, 'Autor não encontrado.'));
    } catch (error) {
        console.log(error);
        res.status(500).send(responseBuilder(500, `A atualização gerou o seguinte erro: ${error.message}`));
    }
}

async function deletarAutorController(req, res) {
    const { id } = req.params;
    try {
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