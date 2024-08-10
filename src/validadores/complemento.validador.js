async function validarDadosDeComplemento(req, res, next) {
    const { nome, descricao, categoriaId } = req.body;
    const errors = [];

    if (typeof nome !== 'string' || nome.length < 3) {
        errors.push({ field: 'nome', message: 'Nome deve ter pelo menos 3 caracteres.' });
    }

    if (typeof descricao !== 'string' || descricao.length < 3) {
        errors.push({ field: 'descricao', message: 'Descrição deve ter pelo menos 3 caracteres.' });
    }

    if (typeof categoriaId !== 'number') {
        errors.push({ field: 'categoriaId', message: 'CategoriaId deve ser um número.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export {
    validarDadosDeComplemento,
}