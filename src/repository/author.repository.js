import db from "../config/sqlite.config.js";

async function setAuthor(nome, idUsuario) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO authors (name) VALUES (?)`, [nome, idUsuario], 
            function (err) {
                if (err) return reject(err);                
                return resolve(this.lastID);
            });
    });
}

async function getAuthor(){
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT name FROM authors`,
            (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
            }
        );
    });
}

export {setAuthor, getAuthor}