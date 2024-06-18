const AnimalModel = require("../model/entidades/AnimalModel");
const path = require('path');
const fs = require('fs');

const animalModel = new AnimalModel();

class AnimalController {
    async obterTodos(req, res) {
        const animais = await animalModel.obterTodos();
        return res.status(200).json(animais);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        const animal = await animalModel.obterPorId(id);
        return res.status(200).json(animal);
    }

    async adicionar(req, res) {
        const { numero_baia, nome, especie, sexo, castracao, adocao, cuidador } = req.body;
        let foto_url = null;

        if (req.files && req.files.photo) {
            const photo = req.files.photo;
            const uploadPath = path.join(__dirname, '../../uploads', photo.name);

            photo.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao salvar a foto' });
                }
            });

            foto_url = `/uploads/${photo.name}`;
        }

        const animal = new AnimalModel(0, numero_baia, nome, especie, sexo, castracao, adocao, cuidador, foto_url);

        try {
            await animalModel.adicionar(animal);
            return res.status(201).json({ message: 'Cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao cadastrar animal:', error);
            res.status(500).json({ error: 'Erro ao cadastrar animal' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { numero_baia, nome, especie, sexo, castracao, adocao, cuidador } = req.body;
        let foto_url = null;

        if (req.files && req.files.photo) {
            const photo = req.files.photo;
            const uploadPath = path.join(__dirname, '../../uploads', photo.name);

            photo.mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Erro ao salvar a foto' });
                }
            });

            foto_url = `/uploads/${photo.name}`;
        }

        const animal = new AnimalModel(id, numero_baia, nome, especie, sexo, castracao, adocao, cuidador, foto_url);

        try {
            await animalModel.atualizar(id, animal);
            return res.status(201).json({ message: 'Atualização com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar animal:', error);
            res.status(500).json({ error: 'Erro ao atualizar animal' + error });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;
        try {
            await animalModel.delete(id);
            res.status(200).json({ message: 'Item removido' });
        } catch (error) {
            console.log('Erro ao tentar excluir animal', error);
            res.status(500).json({ error: 'Erro ao tentar excluir animal' + error });
        }
    }

    async filtrar(req, res) {
        const termobusca = req.params.termobusca;
        const animais = await animalModel.filtrar(termobusca);
        return res.status(200).json(animais);
    }
}

module.exports = AnimalController;
