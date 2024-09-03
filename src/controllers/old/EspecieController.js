const EspecieModel = require("../../models/model/entidades/EspecieModel");
const AnimalModel = require("../../models/model/entidades/AnimalModel");

const especieModel = new EspecieModel();
const animalModel = new AnimalModel();

class EspecieController {

    async obterTodos(req, res) {
        const especies = await especieModel.obterTodos();
        return res.status(200).json(especies);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        const especie = await especieModel.obterPorId(id);
        return res.status(200).json(especie);
    }

    async adicionar(req, res) {
        const { nome } = req.body;
        console.log('Dados recebidos:', req.body);
        const especie = new EspecieModel(0, nome);

        try {
            await especieModel.adicionar(especie);
            return res.status(201).json({ message: 'Cadastrado com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar arrecadação:' + error);
            res.status(500).json({ error: 'Erro ao cadastrar arrecadação' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome } = req.body;
        const especie = new EspecieModel(id, nome);

        try {
            await especieModel.atualizar(id, especie);
            return res.status(201).json({ message: 'Atualização com successo' });
        } catch (error) {
            console.log('Erro ao cadastrar espécie:' + error);
            res.status(500).json({ error: 'Erro ao atualizar espécie' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            const count = await animalModel.contarPorEspecie(id);
            if (count > 0) {
                return res.status(400).json({ error: 'Não é possível excluir a espécie, pois há animais associados a ela.' });
            }
            await especieModel.delete(id);
            res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.log('Erro ao tentar excluir espécie', error);
            res.status(500).json({ error: 'Erro ao tentar excluir espécie' + error });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        const especies = await especieModel.filtrar(termobusca);
        return res.status(200).json(especies);
    }

    async filtrarPorAno(req, res) {
        const ano = req.params.ano;
        const especies = await especieModel.filtrarPorAno(ano);
        return res.status(200).json(especies);
    }
}

module.exports = EspecieController;
