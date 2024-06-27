const AnimalModel = require("../model/entidades/AnimalModel");
const CuidadorModel = require("../model/entidades/CuidadorModel");
const EspecieModel = require("../model/entidades/EspecieModel");

const animalModel = new AnimalModel();
const cuidadorModel = new CuidadorModel();
const especieModel = new EspecieModel();

class AnimalController {
    async obterTodos(req, res) {
        const animais = await animalModel.obterTodos();
        return res.status(200).json(animais);
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const animal = await animalModel.obterPorId(id);
            if (!animal) {
                return res.status(404).json({ error: 'Animal não encontrado' });
            }

            const cuidador = await cuidadorModel.obterPorId(animal.cuidador);
            const especie = await especieModel.obterPorId(animal.especie);

            animal.cuidador_nome = cuidador.nome;
            animal.cuidador_telefone = cuidador.telefone;
            animal.cuidador_endereco = cuidador.endereco;
            animal.especie_nome = especie.nome;

            return res.status(200).json(animal);
        } catch (error) {
            console.log('Erro ao buscar animal:', error);
            res.status(500).json({ error: 'Erro ao buscar animal' + error });
        }
    }


    async adicionar(req, res) {
        const {
            nome,
            sexo,
            cor_pelagem,
            deficiencia,
            data_ocorrencia,
            data_nascimento_aproximada,
            numero_baia,
            numero_chip,
            condicao_resgate,
            cuidador,
            especie,
            castracao,
            adocao,
            foto_url
        } = req.body;

        try {
            if (numero_chip) {
                const chipExistente = await animalModel.verificarChipExistente(numero_chip);
                if (chipExistente) {
                    return res.status(400).json({ error: 'Número do chip já cadastrado' });
                }
            }

            const animal = new AnimalModel(
                0,
                nome,
                sexo,
                cor_pelagem,
                deficiencia,
                data_ocorrencia,
                data_nascimento_aproximada,
                numero_baia,
                numero_chip,
                condicao_resgate,
                cuidador,
                especie,
                castracao,
                adocao,
                0, // adotado
                0, // morto
                foto_url
            );

            await animalModel.adicionar(animal);
            return res.status(201).json({ message: 'Cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao cadastrar animal:', error);
            res.status(500).json({ error: 'Erro ao cadastrar animal' + error });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const {
            nome,
            sexo,
            cor_pelagem,
            deficiencia,
            data_ocorrencia,
            data_nascimento_aproximada,
            numero_baia,
            numero_chip,
            condicao_resgate,
            cuidador,
            especie,
            castracao,
            adocao,
            foto_url
        } = req.body;

        try {
            if (numero_chip) {
                const chipExistente = await animalModel.verificarChipExistente(numero_chip);
                if (chipExistente) {
                    return res.status(400).json({ error: 'Número do chip já cadastrado' });
                }
            }

            const animal = new AnimalModel(
                id,
                nome,
                sexo,
                cor_pelagem,
                deficiencia,
                data_ocorrencia,
                data_nascimento_aproximada,
                numero_baia,
                numero_chip,
                condicao_resgate,
                cuidador,
                especie,
                castracao,
                adocao,
                0, // adotado
                0, // morto
                foto_url
            );

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
