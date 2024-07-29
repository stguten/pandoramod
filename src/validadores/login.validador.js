async function validarDadosDeLogin(req, res, next) {
    const { login, senha } = req.body;
    const errors = [];

    if (typeof login !== 'string' || login.length < 5) {
        errors.push({ field: 'login', message: 'Login deve ter pelo menos 5 caracteres.' });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm
    if (typeof senha !== 'string' || senha.length < 6 || senha.match(passwordRegex) === null) {
        errors.push({ field: 'senha', message: 'A Senha não cumpre os requisitos minimos.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
}

export {
    validarDadosDeLogin,
}