async function validarDadosDeCategoria(req, res, next) {
    const { nome } = req.body;
    const errors = [];

    if (typeof nome !== 'string' || nome.length < 5) {
        errors.push({ field: 'nome', message: 'Nome deve ter pelo menos 5 caracteres.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export {
    validarDadosDeCategoria,
}