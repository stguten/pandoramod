import * as path from "node:path";

function fileDestination(req, file, cb) {
    cb(null, path.join(process.cwd(), ".data", "arquivos"));
}

function fileName(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
}

export { fileDestination, fileName };