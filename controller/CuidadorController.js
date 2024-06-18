const CuidadorModel = require("../model/entidades/CuidadorModel");

const cuidadorModel = new CuidadorModel()
class CuidadorController {

    async obterTodos(req, res) {
        const cuidadores = await cuidadorModel.obterTodos();
        return res.status(200).json(cuidadores);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        const cuidador = await cuidadorModel.obterPorId(id);
        return res.status(200).json(cuidador);
    }

    async adicionar(req, res) {
        const { nome, endereco, email, telefone, tipo_pessoa, identificacao } = req.body;
        console.log('Dados recebidos:', req.body);
        const cuidador = new CuidadorModel(0, nome, endereco, email, telefone, tipo_pessoa, identificacao);

        try {
            await cuidadorModel.adicionar(cuidador);
            return res.status(201).json({ message: 'Cadastrado com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar cuidador:' + error);
            res.status(500).json({ error: 'Erro ao cadastrar cuidador' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome, endereco, email, telefone, tipo_pessoa, identificacao } = req.body;
        const cuidador = new CuidadorModel(id, nome, endereco, email, telefone, tipo_pessoa, identificacao);

        try {
            await cuidadorModel.atualizar(id, cuidador);
            return res.status(201).json({ message: 'Atualização com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar cuidador:' + error);
            res.status(500).json({ error: 'Erro ao atualizar cuidador' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            await cuidadorModel.delete(id);
            res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.log('Erro ao tentar excluir cuidador', error);
            res.status(500).json({ error: 'Erro ao tentar excluir cuidador' + error });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        const cuidadores = await cuidadorModel.filtrar(termobusca);
        return res.status(200).json(cuidadores);
    }
    
    async filtrarPorAno(req, res) {
        const ano = req.params.ano;
        const cuidadores = await cuidadorModel.filtrarPorAno(ano);
        return res.status(200).json(cuidadores);
    }
}

module.exports = CuidadorController;