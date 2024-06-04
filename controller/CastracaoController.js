const CastracaoModel = require("../model/entidades/CastracaoModel");

const castracaoModel = new CastracaoModel()
class CastracaoController {

    async obterTodos(req, res) {
        const arrecadacoes = await castracaoModel.obterTodos();
        return res.status(200).json(arrecadacoes);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        const castracao = await castracaoModel.obterPorId(id);
        return res.status(200).json(castracao);
    }

    async adicionar(req, res) {
        const { data_evento, tipo_animal, sexo_animal, quantidade_castrada, local_evento, descricao } = req.body;
        console.log('Dados recebidos:', req.body);
        const castracao = new CastracaoModel(0, data_evento, tipo_animal, sexo_animal, quantidade_castrada, local_evento, descricao);

        try {
            await castracaoModel.adicionar(castracao);
            return res.status(201).json({ message: 'Cadastrado com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar arrecadação:' + error);
            res.status(500).json({ error: 'Erro ao cadastrar arrecadação' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { data_evento, tipo_animal, sexo_animal, quantidade_castrada, local_evento, descricao } = req.body;
        const castracao = new CastracaoModel(id, data_evento, tipo_animal, sexo_animal, quantidade_castrada, local_evento, descricao);

        try {
            await castracaoModel.atualizar(id, castracao);
            return res.status(201).json({ message: 'Atualização com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar arrecadação:' + error);
            res.status(500).json({ error: 'Erro ao atualizar arrecadação' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            await castracaoModel.delete(id);
            res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.log('Erro ao tentar excluir arrecadação', error);
            res.status(500).json({ error: 'Erro ao tentar excluir arrecadação' + error });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        const arrecadacoes = await castracaoModel.filtrar(termobusca);
        return res.status(200).json(arrecadacoes);
    }
    
    async filtrarPorAno(req, res) {
        const ano = req.params.ano;
        const arrecadacoes = await castracaoModel.filtrarPorAno(ano);
        return res.status(200).json(arrecadacoes);
    }
}

module.exports = CastracaoController;