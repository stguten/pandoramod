import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
    openapi: "3.1.0",
    explorer: true,
    info: {
        title: "Omsi Complementos API",
        version: "1.0",
        description: "API para download de complementos do OMSI, com a finalidade de facilitar o compartilhamento de complementos para o jogo.",
    },
    license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor Local - Desenvolvimento",
        },
        {
            url: "https://tcc.stguten.dev.br/",
            description: "Servidor em Produção - Demostração",
        }
    ],
    tags: [
        {
            name: "Arquivo",
            description: "Endpoints relacionados aos arquivos dos complementos.",
        },
        {
            name: "Autor",
            description: "Endpoints relacionados aos autores dos complementos.",
        },
        {
            name: "Categoria",
            description: "Endpoints relacionados às categorias dos complementos.",
        },
        {
            name: "Complemento",
            description: "Endpoints relacionados aos complementos.",
        },
        {
            name: "Usuario",
            description: "Endpoints relacionados aos usuários.",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
};

const options = {
    swaggerDefinition,
    apis: ["./src/route/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
