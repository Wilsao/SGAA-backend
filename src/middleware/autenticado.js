const { verify, decode } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ message: 'Token não encontrado' });

  // if (authorization.length !== 16)
  //   return res.status(401).json({ message: 'Token inválido' });

  const [, accessToken] = authorization.split(' ');

  try {
    verify(accessToken, 'secret');

    const { id, email } = await decode(accessToken);

    req.usuarioId = id
    req.usuarioEmail = email;

    return next();
  }
  catch (error) {
    if (error.name === 'TokenExpiredError')
      return res.status(401).json({ message: 'Token expirado' });

    return res.status(401).json({ message: 'Usuario não autorizado' });
  }
};