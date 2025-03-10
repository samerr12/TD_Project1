const bcrypt = require('bcrypt');
const express = require('express');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//para fazer o login
app.post('/skibidiAPI/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM Utilizador WHERE Nome = ?', [username]);
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.Password);

            if (match) {
                res.status(200).json({ message: 'Inicio de sessão efetuado com sussesso' });
            } else {
                res.status(401).json({ message: 'Creedenciais inválidas' });
            }
        } else {
            res.status(404).json({ message: 'Utilizador não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
});

//para fazer o registo
app.post('/skibidiAPI/registo', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM Utilizador WHERE Nome = ?', [username]);
        if (rows.length == 0) {
            const saltRounds = 11;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const [result] = await db.query(
                'INSERT INTO Utilizador (Nome, Password) VALUES (?, ?)',
                [username, hashedPassword]
            );

            res.status(201).json({ message: 'ok' });
        }
        else {
            res.status(401).json({ message: 'Este nome já foi criado' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

//listar todos os funcionarios
app.get('/skibidiAPI/funcionarios', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Funcionario');
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//listar funcionarios filtrados por linha
app.get('/skibidiAPI/funcionariosFilter/:linhaID', async (req, res) => {
    const { linhaID } = req.params;
    try {
        const [rows] = await db.query(
            "Select * " +
            "From funcionario f " +
            "Inner Join equipa e on f.Equipa_idEquipa = r.dEquipa " +
            "Inner Join turno t on e.Turno_idTurno = t.idTurno " +
            "Inner Join linha l on t.linha_idLinha = l.idLinha " +
            "Where l.idLinha = ?", [ linhaID ]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//listar funcionarios filtrados por linha e equipa
app.get('/skibidiAPI/funcionariosFilter/:linhaID/:EquipaID', async (req, res) => {
    const { linhaID, EquipaID } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From funcionario " +
            "Inner Join equipa on funcionario.Equipa_idEquipa = equipa.idEquipa " +
            "Inner Join turno on equipa.Turno_idTurno = turno.idTurno " +
            "Inner Join linha on turno.linha_idLinha = linha.idLinha " +
            "Where linha.idLinha = ? AND equipa.idEquipa = ?", [linhaID, EquipaID]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//selecionar um funcionario por ID
app.get('/skibidiAPI/funcionarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From funcionario " +
            "Left Join equipa on funcionario.Equipa_idEquipa = equipa.idEquipa " +
            "Left Join turno on equipa.Turno_idTurno = turno.idTurno " +
            "Left Join linha on turno.linha_idLinha = linha.idLinha " +
            "Where funcionario.idFuncionario = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//selecionar um funcionario por nome, idade, e contacto
app.get('/skibidiAPI/funcionarios/addSelect/:valNome/:valIdade/:valContacto', async (req, res) => {
    const { valNome, valIdade, valContacto } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From funcionario " +
            "Where NomeFuncionario = ? " +
            "AND IdadeFuncionario = ? " +
            "AND ContactoFuncionario = ?", [valNome, valIdade, valContacto]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//adicionar um funcionario
app.get('/skibidiAPI/funcionarios/add/:valNome/:valIdade/:valContacto', async (req, res) => {
    const { valNome, valIdade, valContacto } = req.params;
    try {
        const [rows] = await db.query(
            "INSERT INTO funcionario " +
            "(`NomeFuncionario`, `IdadeFuncionario`, `ContactoFuncionario`) " +
            "VALUES (?, ?, ?);", [valNome, valIdade, valContacto]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//atualizar um funcionário
app.get('/skibidiAPI/funcionarios/update/:nome/:idade/:contacto/:equipa/:id', async (req, res) => {
    const {nome, idade, contacto, equipa, id } = req.params;
    try {
        const [rows] = await db.query(
            "Update funcionario SET " +
            "NomeFuncionario = ?, " +
            "IdadeFuncionario = ?, " +
            "ContactoFuncionario = ?, " +
            "Equipa_idEquipa = ?" +
            "where idFuncionario = ?", [nome, idade, contacto, equipa, id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

app.get('/skibidiAPI/funcionarios/update_NEquipa/:nome/:idade/:contacto/:id', async (req, res) => {
    const {nome, idade, contacto, id } = req.params;
    try {
        const [rows] = await db.query(
            "Update funcionario SET " +
            "NomeFuncionario = ?, " +
            "IdadeFuncionario = ?, " +
            "ContactoFuncionario = ? " +
            "where idFuncionario = ?", [nome, idade, contacto, id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//eliminar um funcionário
app.get('/skibidiAPI/funcionarios/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Delete From funcionario Where idFuncionario = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//selecionar um turno por id da equipa
app.get('/skibidiAPI/turno_equipa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From equipa " +
            "Inner Join turno On equipa.Turno_idTurno = turno.idTurno " +
            "where equipa.idEquipa = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

app.get('/skibidiAPI/equipas_linhas', async (req, res) => {
    try {
        const [rows] = await db.query(
            "select * from linha " +
            "LEFT Join turno On linha.idLinha = turno.linha_idLinha " +
            "LEFT Join equipa On turno.idTurno = equipa.idEquipa " +
            "ORDER BY linha.idLinha ASC, equipa.idEquipa");
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//listar as equipas todos atualmente em produção
app.get('/skibidiAPI/linhaProd/:tempS/:tempE', async (req, res) => {
    const { tempS, tempE } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From funcionario " +
            "Inner Join equipa on funcionario.Equipa_idEquipa = equipa.idEquipa " +
            "Inner Join turno on equipa.Turno_idTurno = turno.idTurno " +
            "Inner Join linha on turno.linha_idLinha = linha.idLinha " +
            "where turno.DataInicio >= ? " +
            "and turno.DataFim <= ? " +
            "Order by linha.NomeLinha", [tempS, tempE]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//================================
//Parte dedidcada para as opções
//================================
app.get('/skibidiAPI/search_info/linha/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "Left Join equipa On turno.idTurno = equipa.Turno_idTurno " +
            "Left Join funcionario On equipa.idEquipa = funcionario.Equipa_idEquipa " +
            "where linha.idLinha = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/skibidiAPI/search_info/turno/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "Left Join equipa On turno.idTurno = equipa.Turno_idTurno " +
            "Left Join funcionario On equipa.idEquipa = funcionario.Equipa_idEquipa " +
            "where turno.idTurno = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/skibidiAPI/search_info/equipa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "Left Join equipa On turno.idTurno = equipa.Turno_idTurno " +
            "Left Join funcionario On equipa.idEquipa = funcionario.Equipa_idEquipa " +
            "where equipa.idEquipa = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

//================================
//Parte dedidcada para as opções
//================================
app.get('/skibidiAPI/search_related/linha/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "where linha.idLinha = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/skibidiAPI/search_related/turno/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "Left Join equipa On turno.idTurno = equipa.Turno_idTurno " +
            "where turno.idTurno = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});
app.get('/skibidiAPI/search_related/equipa/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(
            "Select * From linha " +
            "Left Join turno On linha.idLinha = turno.linha_idLinha " +
            "Left Join equipa On turno.idTurno = equipa.Turno_idTurno " +
            "Left Join funcionario On equipa.idEquipa = funcionario.Equipa_idEquipa " +
            "where equipa.idEquipa = ?", [id]);
        res.json(rows);
    }
    catch (e) {
        console.log(e);
    }
});

app.listen(PORT, () => {
    console.log(`oki doki, se n te lembras tens aki o endereço: http://localhost:${PORT}`);
});