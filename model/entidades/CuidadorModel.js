const Database = require("../database");

const database = new Database()

class CuidadorModel {
    constructor(id, nome, endereco, email, telefone, tipo_pessoa, identificacao) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.telefone = telefone;
        this.tipo_pessoa = tipo_pessoa;
        this.identificacao = identificacao;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from cuidadores');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from cuidadores where id=? ', [id]);
        return result[0];
    }

    async adicionar(dadosCuidador) {
        await database.ExecutaComandoNonQuery('insert into cuidadores set ?', dadosCuidador);
    }

    async atualizar(id, dadosCuidador) {
        await database.ExecutaComandoNonQuery('update cuidadores set ? where id= ?', [
            dadosCuidador,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from cuidadores where id=?', [id]);
    }
}

module.exports = CuidadorModel;