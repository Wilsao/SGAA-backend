const Database = require("../database");

const database = new Database();

class AnimalModel {
    constructor(id, nome, sexo, cor_pelagem, deficiencia, data_ocorrencia, data_nascimento_aproximada, numero_baia, numero_chip, condicao_resgate, cuidador, especie, castracao, adocao, adotado, morto, foto_url) {
        this.id = id;
        this.nome = nome;
        this.sexo = sexo;
        this.cor_pelagem = cor_pelagem;
        this.deficiencia = deficiencia;
        this.data_ocorrencia = data_ocorrencia;
        this.data_nascimento_aproximada = data_nascimento_aproximada;
        this.numero_baia = numero_baia;
        this.numero_chip = numero_chip;
        this.condicao_resgate = condicao_resgate;
        this.cuidador = cuidador;
        this.especie = especie;
        this.castracao = castracao;
        this.adocao = adocao;
        this.adotado = adotado;
        this.morto = morto;
        this.foto_url = foto_url;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from animais');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from animais where id=?', [id]);
        return result[0];
    }

    async adicionar(dadosAnimal) {
        await database.ExecutaComandoNonQuery('insert into animais set ?', dadosAnimal);
    }

    async atualizar(id, dadosAnimal) {
        await database.ExecutaComandoNonQuery('update animais set ? where id= ?', [
            dadosAnimal,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from animais where id=?', [id]);
    }

    async filtrar(termobusca) {
        const animais = await database.ExecutaComando("select * from animais where nome like ?", [`%${termobusca}%`]);
        return animais;
    }

    async contarPorEspecie(idEspecie) {
        const result = await database.ExecutaComando('select count(*) as count from animais where especie = ?', [idEspecie]);
        return result[0].count;
    }

    async obterPorCuidadorId(cuidadorId) {
        const animais = await database.ExecutaComando('select * from animais where cuidador=?', [cuidadorId]);
        return animais;
    }

    async verificarChipExistente(numero_chip) {
        const result = await database.ExecutaComando('select * from animais where numero_chip = ?', [numero_chip]);
        return result.length > 0;
    }
}

module.exports = AnimalModel;
