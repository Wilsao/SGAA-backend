const Database = require("../database");

const database = new Database()

class CastracaoModel {
    constructor(id, data_evento, tipo_animal, sexo_animal, quantidade_castrada, local_evento, descricao) {
        this.id = id;
        this.data_evento = data_evento;
        this.tipo_animal = tipo_animal;
        this.sexo_animal = sexo_animal;
        this.quantidade_castrada = quantidade_castrada;
        this.local_evento = local_evento;
        this.descricao = descricao;
    }

    async obterTodos() {
        const listaAnimais = await database.ExecutaComando('select * from castracoes');
        return listaAnimais;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from castracoes where id=? ', [id]);
        return result[0];
    }

    async adicionar(dadosCastracao) {
        await database.ExecutaComandoNonQuery('insert into castracoes set ?', dadosCastracao);
    }

    async atualizar(id, dadosCastracao) {
        await database.ExecutaComandoNonQuery('update castracoes set ? where id= ?', [
            dadosCastracao,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from castracoes where id=?', [id]);
    }

    async filtrar(termobusca) {
        const castracoes = await database.ExecutaComando("select * from castracoes where descricao like ?",
            [`%${termobusca}%`]
        );
        return castracoes;
    }

    async filtrarPorAno(ano) {
        const dataInicio = `${ano}-01-01`;
        const dataFim = `${ano}-12-31`;
        
        const castracoes = await database.ExecutaComando(
            "select * from castracoes where data_evento >= ? and data_evento <= ?",
            [dataInicio, dataFim]
        );
        
        return castracoes;
    }
}

module.exports = CastracaoModel;