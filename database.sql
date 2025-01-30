CREATE SCHEMA IF NOT EXISTS moddownloader;

CREATE TABLE IF NOT EXISTS moddownloader.arquivos (
	id serial4 NOT NULL,
	nomeoriginal text NOT NULL,
	nomelocal text NOT NULL,
	hash text NOT NULL,
	idcomplemento int4 NOT NULL,
	idtipoarquivo int2 NOT NULL,
	status bool DEFAULT true NOT NULL,
	criadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	atualizadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deletadoem timestamp NULL,
	CONSTRAINT arquivos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS moddownloader.autores (
	id serial4 NOT NULL,
	nome text NOT NULL,
	idusuario int4 NOT NULL,
	criadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	atualizadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deletadoem timestamp NULL,
	CONSTRAINT autores_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS moddownloader.categorias (
	id serial4 NOT NULL,
	nome text NOT NULL,
	status bool DEFAULT true NOT NULL,
	criadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	atualizadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deletadoem timestamp NULL,
	CONSTRAINT categorias_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS moddownloader.complementos (
	id serial4 NOT NULL,
	nome text NOT NULL,
	descricao text NULL,
	logocomplemento int4 DEFAULT 1 NOT NULL,
	idcategoria int2 NOT NULL,
	idautor int4 NOT NULL,
	ultimaversao int4 DEFAULT 0 NOT NULL,
	status bool DEFAULT true NOT NULL,
	criadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	atualizadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deletadoem timestamp NULL,
	CONSTRAINT complementos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS moddownloader.tipo_arquivos (
	id serial4 NOT NULL,
	descricao text NOT NULL,
	CONSTRAINT tipo_arquivos_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS moddownloader.usuarios (
	id serial4 NOT NULL,
	usuario text NOT NULL,
	senha text NOT NULL,
	email text NOT NULL,
	status bool DEFAULT true NOT NULL,
	adminstrador bool DEFAULT false NOT NULL,
	criadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	atualizadoem timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	deletadoem timestamp NULL,
	CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);