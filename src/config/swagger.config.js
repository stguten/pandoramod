import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
    openapi: "3.1.0",
    explorer: true,
    info: {
        title: "Pandora Addon Downloader Api",
        version: "1.0",
        description: "API para download de addons do OMSI, com a finalidade de facilitar o compartilhamento de addons para o jogo.",
    },
    license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
    },
    servers: [
        {
            url: "https://demo.stguten.duckdns.org/",
            description: "Servidor em Produção - Demostração",
        },
        {
            url: "http://localhost:3000",
            description: "Servidor Local - Desenvolvimento",
        },
        {
            url: "http://192.168.100.119:3000",
            description: "Servidor em Rede - Desenvolvimento",
        },
    ],
    tags: [
        {
            name: "Arquivo",
            description: "Pontos da API relacionados aos arquivos dos complementos.",
        },
        {
            name: "Autor",
            description: "Pontos de API relacionados aos autores dos complementos.",
        },
        {
            name: "Categoria",
            description: "Pontos de API relacionados às categorias dos complementos.",
        },
        {
            name: "Complemento",
            description: "Pontos de API relacionados aos complementos.",
        },
        {
            name: "Usuario",
            description: "Pontos de API relacionados aos usuários.",
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
