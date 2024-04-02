import db from "../config/sqlite.config.js";

async function addUserRepository(dados){
    return new Promise((resolve,reject)=>{
        try{
            db.serialize(function(){
                db.run('BEGIN');
                db.run('INSERT INTO usuario (login, senha) values (?, ?)', dados);
                db.run('INSERT INTO autor (nome, usuario_id) values (?, (SELECT id FROM usuario WHERE login = ?))', [dados[0], dados[0]]);
                db.run('COMMIT');
                return resolve(true);
            })
        } catch(err) {
            db.run('ROLLBACK');
            console.error('Erro ao salvar registro: ', err);
            return resolve(false);
        }
    });
      
}

async function getUserRepository(dados){
    return new Promise((resolve,reject)=>{
        db.get(`SELECT u.id, u.login as username, a.nome, u.senha 
        FROM usuario as u JOIN autor as a WHERE login = ? and u.id = a.usuario_id`, dados, (err,row)=>{
            console.log(err || row);
            if(err) return reject(err);
            if(row === undefined) return resolve({});
            return resolve(row);
        });
    });
}




export {addUserRepository, getUserRepository}