import { Router } from "express";
import * as loginController from "../controller/login.controller.js";
import * as categorias from "../controller/categoria.controller.js";
import { temAutoridade } from "../controller/usuario.controller.js";

const categoriasRoutes = Router();

/**
 * @openapi
 * /categoria:
 *   get:
 *     tags:
 *       - Categoria
 *     summary: Lista todas as categorias
 *     description: Lista todas as categorias
 *     responses:
 *       200:
 *         description: Retorna a lista de categorias
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
 *                   example: A lista de categorias foi retornada com sucesso. 20 categorias encontradas.
 *                 data:
 *                   oneOf:
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           nome:
 *                             type: string
 *                             example: Roupas
 *                     - type: array
 *                       items:
 *                         type: object
 *                       example: []
 *                 timestamp:
 *                   type: integer
 *                   example: 1630514040000 
 *       404:
 *         description: Nenhuma categoria encontrada
 *       500:
 *         description: Erro interno na consulta de categorias
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
categoriasRoutes.get("/", categorias.listarTodasAsCategoriasController);
/**
 * @openapi
 * /categoria/criar-categoria:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categoria
 *     summary: Adiciona uma categoria pelo id.
 *     description: Adiciona uma categoria pelo id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Roupas
 *     responses:
 *       200:
 *         description: Retorna a categoria adicionada.
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
 *                   example: A categoria foi adicionada com sucesso. 
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
 *         description: Categoria não encontrada
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
 *         description: Erro interno na consulta da categoria
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
categoriasRoutes.post("/criar-categoria", loginController.verifyJWT, categorias.adicionarCategoriaController);
/**
 * @openapi
 * /categoria/atualizar-categoria/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categoria
 *     summary: Atualizar uma categoria pelo id
 *     description: Atualizar uma categoria pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id da categoria
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Roupas
 *     responses:
 *       200:
 *         description: Retorna a categoria atualizada.
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
 *                   example: A categoria foi atualizada com sucesso.
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
 *         description: Categoria não encontrada
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
 *         description: Erro interno na consulta da categoria
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
 * 
 */
categoriasRoutes.put("/atualizar-categoria/:id", loginController.verifyJWT, temAutoridade, categorias.atualizarCategoriasController);
/**
 * @openapi
 * /categoria/deletar-categoria/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categoria
 *     summary: Remover uma categoria pelo id
 *     description: Remover uma categoria pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id da categoria
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna uma mensagem de deletado com sucesso.
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
 *                   example: A categoria foi removida com sucesso. 
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
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
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro interno na consulta da categoria
 */
categoriasRoutes.delete("/deletar-categoria/:id", loginController.verifyJWT, temAutoridade, categorias.deletarCategoriaController);

export default categoriasRoutes;