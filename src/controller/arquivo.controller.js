import * as path from 'node:path';
import * as arquivoRepository from '../repository/arquivo.repository.js';
import { responseBuilder } from '../util/response.util.js';

async function inserirArquivoController(nome, hash, versao, id_complemento) {
    try {
        const resultado = await arquivoRepository.inserirArquivoRepository(nome, hash, versao, id_complemento);
        return resultado
            ? res.status(201).json(responseBuilder(201, 'Arquivo inserido com sucesso.'))
            : res.status(400).json(responseBuilder(400, 'Erro ao inserir arquivo.'));
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseBuilder(500, `A inserção gerou o seguinte erro: ${error.message}`));
    }
}

async function buscarArquivoPorIdController(req, res) {
    const { id } = req.params;
    try {
        const resultado = await arquivoRepository.buscarArquivoPorIdRepository(id);
        
        if (resultado) {
            res.set({
                'Content-Disposition': `attachment; filename="${resultado[0].nomeoriginal}"`,
            });
            return res.status(200).sendFile(path.resolve(process.cwd(), '.data', 'arquivos', resultado[0].nomelocal));
        }
        return res.status(404).json(responseBuilder(404, 'Arquivo não encontrado.'));
    } catch (e) {
        console.log(e);
        return res.status(500).json(responseBuilder(500, `A busca gerou o seguinte erro: ${error.message}`));
    }
}

async function buscarArquivoPorComplementoController(req, res) {
    const { id } = req.params;
    try {
        const resultado = await arquivoRepository.buscarArquivoPorComplementoRepository(id);
        return resultado
            ? res.status(200).send(responseBuilder(200, `Foram encontrados ${resultado.length} arquivos relacionados ao complemento.`, resultado))
            : res.status(404).send(responseBuilder(404, 'Arquivo não encontrado.'));
    } catch (e) {
        console.log(e);
        return res.status(500).send(responseBuilder(500, `A busca gerou o seguinte erro: ${error.message}`));
    }
}

async function atualizarArquivoController(req, res) {
    /* const { id } = req.params;
    const { dadosAtualizacao } = req.body; */
    try {
        /* const resultado = await arquivoRepository.atualizarArquivo(id, );
        return resultado 
            ? res.status(200).json({ message: 'Arquivo atualizado com sucesso.' }) 
            : res.status(404).json({ message: 'Arquivo não encontrado.' }); */
        return res.status(200).send({ message: 'Not implemented yet' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Erro Interno.' });
    }
}

async function removerArquivoController(req, res) {
    const { id } = req.params;
    const { hardDelete } = req.query;
    try {
        if(await arquivoRepository.buscarArquivoPorIdRepository(id) === null) return res.status(409).send(responseBuilder(409, 'Arquivo já deletado ou não existente na base de dados.'));
        const resultado = await arquivoRepository.removerArquivoRepository(id, hardDelete);
        return resultado
            ? res.status(200).send(responseBuilder(200, 'Arquivo removido com sucesso.'))
            : res.status(404).send(responseBuilder(404, 'Arquivo não encontrado.'));
    } catch (error) {
        console.log(error);
        return res.status(500).send(responseBuilder(500, `A remoção gerou o seguinte erro: ${error.message}`));
    }
}

export {
    inserirArquivoController,
    buscarArquivoPorIdController,
    buscarArquivoPorComplementoController,
    atualizarArquivoController,
    removerArquivoController
};