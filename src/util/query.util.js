function gerarUpdateQuery(table, idField, idValue, fields) {
    let query = `UPDATE ${table} SET atualizadoEm = CURRENT_TIMESTAMP,`;
    let params = [];
    let paramIndex = 1;

    for (const [k, v] of Object.entries(fields)) {
        if (v !== undefined) {
            query += ` ${k} = $${paramIndex},`;
            params.push(v);
            paramIndex++;
        }
    }

    query = query.slice(0, -1);
    query += ` WHERE ${idField} = $${paramIndex} RETURNING *`;
    params.push(idValue);
    
    return { query, params };
}

export { gerarUpdateQuery };