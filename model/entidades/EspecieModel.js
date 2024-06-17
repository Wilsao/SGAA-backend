const Database = require("../database");

const database = new Database()

class EspecieModel {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from especies');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from especies where id=? ', [id]);
        return result[0];
    }

    async adicionar(dadosEspecie) {
        await database.ExecutaComandoNonQuery('insert into especies set ?', dadosEspecie);
    }

    async atualizar(id, dadosEspecie) {
        await database.ExecutaComandoNonQuery('update especies set ? where id= ?', [
            dadosEspecie,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from especies where id=?', [id]);
    }
}

module.exports = EspecieModel;