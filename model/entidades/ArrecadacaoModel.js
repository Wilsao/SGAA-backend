const Database = require("../database");

const database = new Database()

class ArrecadacaoModel {
    constructor(id, data_evento, valor_arrecadado, descricao) {
        this.id = id;
        this.data_evento = data_evento;
        this.valor_arrecadado = valor_arrecadado;
        this.descricao = descricao;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from arrecadacoes');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from arrecadacoes where id=? ', [id]);
        return result[0];
    }

    async adicionar(dadosArrecadacao) {
        await database.ExecutaComandoNonQuery('insert into arrecadacoes set ?', dadosArrecadacao);
    }

    async atualizar(id, dadosArrecadacao) {
        await database.ExecutaComandoNonQuery('update arrecadacoes set ? where id= ?', [
            dadosArrecadacao,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from arrecadacoes where id=?', [id]);
    }

    async filtrar(termobusca) {
        const arrecadacoes = await database.ExecutaComando("select * from arrecadacoes where descricao like ?",
            [`%${termobusca}%`]
        );
        return arrecadacoes;
    }

    async filtrarPorAno(ano) {
        const dataInicio = `${ano}-01-01`;
        const dataFim = `${ano}-12-31`;
        
        const arrecadacoes = await database.ExecutaComando(
            "select * from arrecadacoes where data_evento >= ? and data_evento <= ?",
            [dataInicio, dataFim]
        );
        
        return arrecadacoes;
    }
}

module.exports = ArrecadacaoModel;