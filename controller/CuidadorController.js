const CuidadorModel = require("../model/entidades/CuidadorModel");
const AnimalModel = require("../model/entidades/AnimalModel");

const cuidadorModel = new CuidadorModel();
const animalModel = new AnimalModel();

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
            const identificacaoExistente = await cuidadorModel.verificarIdentificacaoExistente(identificacao);
            if (identificacaoExistente) {
                return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
            }

            await cuidadorModel.adicionar(cuidador);
            return res.status(201).json({ message: 'Cadastrado com sucesso' });
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
            return res.status(201).json({ message: 'Atualização com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar cuidador:' + error);
            res.status(500).json({ error: 'Erro ao atualizar cuidador' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            const animais = await animalModel.obterPorCuidadorId(id);
            if (animais.length > 0) {
                const nomesAnimais = animais.map(animal => animal.nome);
                return res.status(400).json({
                    error: 'Não é possível excluir o cuidador, pois existem animais vinculados a ele.',
                    animais: nomesAnimais
                });
            }
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
