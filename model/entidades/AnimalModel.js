const Database = require("../database");

const database = new Database()

class AnimalModel {
    constructor(id, numero_baia, nome, especie, sexo, castracao, adocao, foto_url) {
        this.id = id;
        this.numero_baia = numero_baia;
        this.nome = nome;
        this.especie = especie;
        this.sexo = sexo;
        this.castracao = castracao;
        this.adocao = adocao;
        this.foto_url = this.foto_url;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from animais');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from animais where id=? ', [id]);
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
        const animais = await database.ExecutaComando("select * from animais where nome like ?",
            [`%${termobusca}%`]
        );
        return animais;
    }
}

module.exports = AnimalModel;