import { Router } from "express";
import upload from "../config/multer.config.js";
import * as loginController from "../controller/login.controller.js";
import * as complementoController from "../controller/complemento.controller.js";
import { temAutoridade } from "../controller/usuario.controller.js";

const complementoFields = new Array({ name: "logo", maxCount: 1 }, { name: "arquivo", maxCount: 1 });

const complementoRoutes = Router();

/**
 * @openapi
 * /complemento/criar-complemento:
 *   post:
 *     tags:
 *       - Complemento
 *     summary: Adiciona uma categoria pelo id
 *     description: Adiciona uma categoria pelo id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [nome, autor, categoria, logo, arquivo]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Complemento de mapa real do brasil
 *               descricao:
 *                 type: string
 *                 example: Complemento atualizado do brasil colonia
 *               autor:
 *                 type: string
 *                 example: Joaozinho
 *               categoria:
 *                 type: string
 *                 example: Mapa
 *               logo:
 *                 type: string
 *                 format: binary
 *               arquivo:
 *                 type: string
 *                 format: binary               
 *     responses:
 *       200:
 *         description: Retorna o complemento adicionado
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
complementoRoutes.post("/criar-complemento", loginController.verifyJWT, upload.fields(complementoFields), complementoController.adicionarComplementosController);
/**
 * @openapi
 * /complemento:
 *   get:
 *     tags:
 *       - Complemento
 *     summary: Lista todos os complementos
 *     description: Lista todos os complementos
 *     responses:
 *       200:
 *         description: Retorna a lista de complementos
 *       404:
 *         description: Nenhum complemento encontrado
 *       500:
 *         description: Erro interno na consulta de complementos
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
complementoRoutes.get("/", complementoController.listarTodosOsComplementosController);
/**
 * @openapi
 * /complemento/{id}:
 *   get:
 *     tags:
 *       - Complemento
 *     summary: Busca um complemento pelo id
 *     description: Busca um complemento pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do complemento
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna a lista de complementos
 *       404:
 *         description: Nenhum complemento encontrado
 *       500:
 *         description: Erro interno na consulta de complementos
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
complementoRoutes.get("/:id", complementoController.pegarComplementoPorIdController);
/**
 * @openapi
 * /complemento/autor/{id}:
 *   get:
 *     tags:
 *       - Complemento
 *     summary: Busca um complemento pelo autor
 *     description: Busca um complemento pelo autor
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do autor do complemento
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna a lista de complementos
 *       404:
 *         description: Nenhum complemento encontrado
 *       500:
 *         description: Erro interno na consulta de complementos
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
complementoRoutes.get("/autor/:id", complementoController.listarComplementosPorAutorController);
/**
 * @openapi
 * /complemento/nome/{nome}:
 *   get:
 *     tags:
 *       - Complemento
 *     summary: Busca um complemento pelo nome
 *     description: Busca um complemento pelo nome
 *     parameters:
 *       - name: nome
 *         in: path
 *         description: nome do complemento
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna a lista de complementos
 *       404:
 *         description: Nenhum complemento encontrado
 *       500:
 *         description: Erro interno na consulta de complementos
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
complementoRoutes.get("/nome/:nome", complementoController.listarComplementosPorNomeController);
/**
 * @openapi
 * /complemento/categoria/{id}:
 *   get:
 *     tags:
 *       - Complemento
 *     summary: Busca um complemento pela categoria
 *     description: Busca um complemento pela categoria
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id da categoria do complemento
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Retorna a lista de complementos
 *       404:
 *         description: Nenhum complemento encontrado
 *       500:
 *         description: Erro interno na consulta de complementos
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
complementoRoutes.get("/categoria/:id",  complementoController.listarComplementosPorCategoriaController);
/**
 * @openapi
 * /complemento/atualizar-complemento/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Complemento
 *     summary: Atualizar um complemento pelo id
 *     description: Atualizar um complemento pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do complemento
 *         required: true
 *         type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Complemento de mapa real do brasil
 *               descricao:
 *                 type: string
 *                 example: Complemento atualizado do brasil colonia
 *               autor:
 *                 type: string
 *                 example: Joaozinho
 *               categoria:
 *                 type: string
 *                 example: Mapa
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Retorna o complemento atualizado
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
complementoRoutes.put("/atualizar-complemento/:id", loginController.verifyJWT, temAutoridade, upload.fields(complementoFields), complementoController.atualizarComplementoController);
/**
 * @openapi
 * /complemento/deletar-complemento/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Complemento
 *     summary: Deletar um complemento pelo id
 *     description: Deletar um complemento pelo id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: id do complemento
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Retorna o complemento deletado
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
complementoRoutes.delete("/deletar-complemento/:id", loginController.verifyJWT, temAutoridade, complementoController.deletarComplementoController);

export default complementoRoutes;