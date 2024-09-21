class usuarioDTO {
  id;
  nome;
  tipo;
  email;
  senha;
  cpf;
  status;

  constructor(Usuario, TipoUsuario) {
    this.id = Usuario.id;
    this.nome = Usuario.nome;
    this.tipo = TipoUsuario.nome;
    this.email = Usuario.email;
    this.senha = Usuario.senha;
    this.cpf = Usuario.cpf;
    this.status = Usuario.status;
  }

}

module.exports = usuarioDTO;