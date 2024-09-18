const Database = require("../database");

const database = new Database();

class AdocaoModel {
  constructor(
    // id,
    possui_pet,
    quantos_pets,
    especie_raca,
    para_quem,
    nome_completo,
    data_nascimento,
    email,
    telefone,
    endereco_completo,
    cidade,
    renda_mensal,
    profissao,
    sobre_familia,
    estado_civil,
    tem_criancas,
    idade_criancas,
    alergia,
    tratamento_medico,
    todos_concordam,
    proprio_ou_alugado,
    tipo_imovel,
    permite_animais,
    animal_id
  ) {
    // this.id = id;
    this.possui_pet = possui_pet;
    this.quantos_pets = quantos_pets;
    this.especie_raca = especie_raca;
    this.para_quem = para_quem;
    this.nome_completo = nome_completo;
    this.data_nascimento = data_nascimento;
    this.email = email;
    this.telefone = telefone;
    this.endereco_completo = endereco_completo;
    this.cidade = cidade;
    this.renda_mensal = renda_mensal;
    this.profissao = profissao;
    this.sobre_familia = sobre_familia;
    this.estado_civil = estado_civil;
    this.tem_criancas = tem_criancas;
    this.idade_criancas = idade_criancas;
    this.alergia = alergia;
    this.tratamento_medico = tratamento_medico;
    this.todos_concordam = todos_concordam;
    this.proprio_ou_alugado = proprio_ou_alugado;
    this.tipo_imovel = tipo_imovel;
    this.permite_animais = permite_animais;
    this.animal_id = animal_id;
  }

  async adicionarFormularioAdocao(dadosAdocao) {
    const sql = 'INSERT INTO adocoes SET ?';

    try {
      const result = await database.ExecutaComandoNonQuery(sql, dadosAdocao);
      return result.insertId; // Retorna o ID do registro inserido
    } catch (error) {
      throw new Error(`Erro ao adicionar formulário de adoção: ${error.message}`);
    }
  }

  async obterTodosFormulariosAdocao() {
    const formularios = await database.ExecutaComando("SELECT * FROM adocoes");
    return formularios;
  }

  async obterFormularioAdocaoPorId(id) {
    const result = await database.ExecutaComando(
      "SELECT * FROM adocoes WHERE id = ?",
      [id]
    );
    return result[0];
  }

  async atualizarFormularioAdocao(id, dadosAdocao) {
    await database.ExecutaComandoNonQuery(
      "UPDATE adocoes SET ? WHERE id = ?",
      [dadosAdocao, id]
    );
  }

  async deletarFormularioAdocao(id) {
    await database.ExecutaComandoNonQuery("DELETE FROM adocoes WHERE id = ?", [id]);
  }
}

module.exports = AdocaoModel;
