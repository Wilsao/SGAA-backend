const EspecieModel = require("../model/entidades/EspecieModel");

const especieModel = new EspecieModel()
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
        const { nome, endereco, email, telefone, tipo_pessoa, identificacao } = req.body;
    
        try {
            const existe = await especieModel.verificarExistenciaPorIdentificacao(identificacao);
            if (existe) {
                return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
            }
    
            const especie = new EspecieModel(0, nome, endereco, email, telefone, tipo_pessoa, identificacao);
            await especieModel.adicionar(especie);
            
            return res.status(201).json({ message: 'Cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao cadastrar espécie:', error);
            res.status(500).json({ error: 'Erro ao cadastrar espécie' });
        }
    }
    

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome, endereco, email, telefone, tipo_pessoa, identificacao } = req.body;
        const especie = new EspecieModel(id, nome, endereco, email, telefone, tipo_pessoa, identificacao);

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