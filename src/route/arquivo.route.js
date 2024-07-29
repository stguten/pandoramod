import { Router } from "express";
import { verifyJWT } from "../controller/login.controller.js";
import * as arquivoController from "../controller/arquivo.controller.js";

const arquivoRoute = Router();

/**
 * @openapi
 * /arquivo/{id}:
 *  get:
 *    tags: 
 *      - Arquivo
 *    summary: Busca um arquivo pelo id
 *    description: Busca um arquivo pelo id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id do arquivo
 *        required: true
 *        type: integer
 *    responses:
 *      200:
 *        description: Retorna um arquivo relativo ao ID informado.
 *        content:
 *          application/zip:
 *            schema:
 *              type: string
 *              format: binary
 *              example: 'Um arquivo aqui :D'
 *      404: 
 *        description: Arquivo não encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  example: 404
 *                message:
 *                  type: string
 *                  example: Nenhum arquivo encontrado.
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                  example: []
 *                timestamp:
 *                  type: integer
 *                  example: 1630514040000
 *      500:
 *        description: Erro interno na consulta do arquivo
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: integer
 *                  example: 500
 *                message:
 *                  type: string
 *                  example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                data:
 *                    type: array
 *                    items:
 *                      type: object
 *                    example: []
 *                timestamp:
 *                  type: integer
 *                  example: 1630514040000 
 */
arquivoRoute.get("/:id", arquivoController.buscarArquivoPorIdController);
/**
 * @openapi
 * /arquivo/complemento/{id}:
 *   get:
 *     tags: 
 *       - Arquivo
 *     summary: Busca um arquivo pelo id do complemento
 *     description: Busca um arquivo pelo id do complemento
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do complemento
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna a lista de arquivos relacionados ao um determinado complemento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: A lista de arquivos foi retornada com sucesso. 20 arquivos encontrados.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nome:
 *                         type: string
 *                         example: Roupas
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       404: 
 *         description: Arquivo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: A lista de categorias foi retornada com sucesso. 20 categorias encontradas.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na consulta do arquivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 */
arquivoRoute.get("/complemento/:id", arquivoController.buscarArquivoPorComplementoController);
/**
 * @openapi
 * /arquivo/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags: 
 *       - Arquivo
 *     summary: Atualizar um arquivo pelo id
 *     description: Atualizar um arquivo pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do arquivo
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: Dados do arquivo
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Um nome legal para o arquivo
 *             required:
 *               - nome 
 *     responses:
 *       200:
 *         description: Metodo não implementado.
 *       401:
 *         description: Não autorizado. Token inválido ou usuário não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Não autorizado. Token inválido ou usuário não autorizado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: false
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na atualização do arquivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 */
arquivoRoute.put("/:id", verifyJWT, arquivoController.atualizarArquivoController);
/**
 * @openapi
 * /arquivo/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Arquivo
 *     summary: Remover um arquivo pelo id
 *     description: Remover um arquivo pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do arquivo
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Arquivo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: O arquivo foi removido com sucesso.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000
 *       401:
 *         description: Não autorizado. Token inválido ou usuário não autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Não autorizado. Token inválido ou usuário não autorizado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         auth:
 *                           type: boolean
 *                           example: false
 *                         token:
 *                           type: string
 *                           example: null
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       404:
 *         description: Arquivo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: O arquivo não foi encontrado na base de dados.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na remoção do arquivo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Ocorreu um erro interno. Tente novamente mais tarde.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 */
arquivoRoute.delete("/:id", verifyJWT, arquivoController.removerArquivoController);

export default arquivoRoute;