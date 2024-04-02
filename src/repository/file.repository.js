import db from "../config/sqlite.config.js";

async function setFile(file) {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO files (name, status) VALUES (?, ?)`,
            [file.originalname, "Pendente"],
            function (err) {
                if (err) {
                    reject(err);
                }
                resolve(this.lastID);
            }
        );
    });
}

async function getFile(file){
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM files WHERE id = ?`,
            [file],
            (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    });
}

async function changeFileStatus(status){
    return new Promise((resolve, reject) => {
        db.run(
            `UPDATE files SET status = ? WHERE id = ?`,
            [status.status, status.id],
            function (err) {
                if (err) {
                    reject(err);
                }
                resolve({ changes: this.changes });
            }
        );
    });
}

export { setFile, getFile, changeFileStatus }