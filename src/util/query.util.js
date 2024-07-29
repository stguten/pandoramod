function gerarUpdateQuery(table, idField, idValue, fields) {
    let query = `UPDATE ${table} SET`;
    let queryParams = [];
    let paramIndex = 1;

    for (const [k, v] of Object.entries(fields)) {
        if (v !== undefined) {
            query += ` ${k} = $${paramIndex},`;
            queryParams.push(v);
            paramIndex++;
        }
    }
    
    query = query.slice(0, -1);
    query += ` WHERE ${idField} = $${paramIndex}`;
    queryParams.push(idValue);

    return { query, queryParams };
}

export default gerarUpdateQuery;