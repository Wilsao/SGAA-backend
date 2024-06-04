const ArrecadacaoModel = require("../model/entidades/ArrecadacaoModel");

const arrecadacaoModel = new ArrecadacaoModel()
class ArrecadacaoController {

    async obterTodos(req, res) {
        const arrecadacoes = await arrecadacaoModel.obterTodos();
        return res.status(200).json(arrecadacoes);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        const arrecadacao = await arrecadacaoModel.obterPorId(id);
        return res.status(200).json(arrecadacao);
    }

    async adicionar(req, res) {
        const { data_evento, valor_arrecadado, descricao } = req.body;
        console.log('Dados recebidos:', req.body);
        const arrecadacao = new ArrecadacaoModel(0, data_evento, valor_arrecadado, descricao);

        try {
            await arrecadacaoModel.adicionar(arrecadacao);
            return res.status(201).json({ message: 'Cadastrado com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar arrecadação:' + error);
            res.status(500).json({ error: 'Erro ao cadastrar arrecadação' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { data_evento, valor_arrecadado, descricao } = req.body;
        const arrecadacao = new ArrecadacaoModel(id, data_evento, valor_arrecadado, descricao);

        try {
            await arrecadacaoModel.atualizar(id, arrecadacao);
            return res.status(201).json({ message: 'Atualização com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar arrecadação:' + error);
            res.status(500).json({ error: 'Erro ao atualizar arrecadação' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            await arrecadacaoModel.delete(id);
            res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.log('Erro ao tentar excluir arrecadação', error);
            res.status(500).json({ error: 'Erro ao tentar excluir arrecadação' + error });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        const arrecadacoes = await arrecadacaoModel.filtrar(termobusca);
        return res.status(200).json(arrecadacoes);
    }
    
    async filtrarPorAno(req, res) {
        const ano = req.params.ano;
        const arrecadacoes = await arrecadacaoModel.filtrarPorAno(ano);
        return res.status(200).json(arrecadacoes);
    }
}

module.exports = ArrecadacaoController;