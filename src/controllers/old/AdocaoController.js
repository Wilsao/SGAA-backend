const AdocaoModel = require("../../database/models/old/entidades/AdocaoModel");
const path = require('path');


const adocaoModel = new AdocaoModel();

class AdocaoController {
  async adicionar(req, res) {
    const dadosAdocao = req.body;
    try {
      const id = await adocaoModel.adicionarFormularioAdocao(dadosAdocao);
      return res.status(201).json({ message: 'Formulário de adoção cadastrado com sucesso', id });
    } catch (error) {
      console.error('Erro ao cadastrar formulário de adoção:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar formulário de adoção' });
    }
  }

  async obterTodos(req, res) {
    try {
      const formularios = await adocaoModel.obterTodosFormulariosAdocao();
      return res.status(200).json(formularios);
    } catch (error) {
      console.error('Erro ao obter formulários de adoção:', error);
      return res.status(500).json({ error: 'Erro ao obter formulários de adoção' });
    }
  }

  async obterPorId(req, res) {
    const { id } = req.params;

    try {
      const formulario = await adocaoModel.obterFormularioAdocaoPorId(id);
      if (!formulario) {
        return res.status(404).json({ error: 'Formulário de adoção não encontrado' });
      }
      return res.status(200).json(formulario);
    } catch (error) {
      console.error('Erro ao obter formulário de adoção por ID:', error);
      return res.status(500).json({ error: 'Erro ao obter formulário de adoção por ID' });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const dadosAdocao = req.body;

    try {
      await adocaoModel.atualizarFormularioAdocao(id, dadosAdocao);
      return res.status(200).json({ message: 'Formulário de adoção atualizado com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar formulário de adoção:', error);
      return res.status(500).json({ error: 'Erro ao atualizar formulário de adoção' });
    }
  }

  async excluir(req, res) {
    const { id } = req.params;

    try {
      await adocaoModel.deletarFormularioAdocao(id);
      return res.status(200).json({ message: 'Formulário de adoção excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir formulário de adoção:', error);
      return res.status(500).json({ error: 'Erro ao excluir formulário de adoção' });
    }
  }
}

module.exports = AdocaoController;