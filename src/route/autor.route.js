import { Router } from "express";
import * as loginController from "../controller/login.controller.js";
import * as autorController from "../controller/autor.controller.js";
import { temAutoridade } from "../controller/usuario.controller.js";

const autorRoutes = Router();

/**
 * @openapi
 * /autor:
 *   get:
 *     tags:
 *       - Autor
 *     summary: Lista todos os autores
 *     description: Lista todos os autores
 *     responses:
 *       200:
 *         description: Retorna a lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  nome:
 *                    type: string
 *                    example: José da Silva
 *       404:
 *         description: Nenhum autor encontrado
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
 *         description: Erro interno na consulta de autores
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
autorRoutes.get("/", autorController.listarTodosOsAutoresController);
/**
 * @openapi
 * /autor/{id}:
 *   get:
 *     tags:
 *       - Autor
 *     summary: Busca um autor pelo id
 *     description: Busca um autor pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do autor
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna a lista de autores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  nome:
 *                    type: string
 *                    example: José da Silva
 *       404:
 *         description: Nenhum autor encontrado
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
 *                   example: Nenhuma autor encontrado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na consulta de autores
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
autorRoutes.get("/:id", autorController.listarAutorPorIdController);
/**
 * @openapi
 * /autor/atualizar-autor/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autor
 *     summary: Atualizar um autor pelo id
 *     description: Atualizar um autor pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do autor
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna o autor atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: José da Silva
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
 *         description: Nenhuma autor encontrado.
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
 *                   example: Nenhuma autor encontrado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na atualização do autor
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
autorRoutes.put("/atualizar-autor/:id", loginController.verifyJWT, temAutoridade, autorController.atualizarAutorController);
/**
 * @openapi
 * /autor/deletar-autor/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Autor
 *     summary: Deletar um autor pelo id
 *     description: Deletar um autor pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do autor
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna o resultado da exclusão
 *         content:
 *           plain/text:
 *             schema:
 *               type: string
 *               example: Autor deletado com sucesso.
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
 *         description: Autor não encontrado.
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
 *                   example: Autor não encontrado.
 *                 data:
 *                     type: array
 *                     items:
 *                       type: object
 *                     example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       500:
 *         description: Erro interno na exclusão do autor
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
autorRoutes.delete("/deletar-autor/:id", loginController.verifyJWT, temAutoridade, autorController.deletarAutorController);

export default autorRoutes;