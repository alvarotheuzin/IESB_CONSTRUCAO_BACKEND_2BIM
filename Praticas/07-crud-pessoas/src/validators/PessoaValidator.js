const yup = require('yup')
// Esquema de validação
const schemaNovaPessoa = yup.object().shape(
  {
    nome: yup.string()
      .min(5, 'nome inválido')
      .max(50, 'nome inválido')
      .required("nome é obrigatório"),
    cpf: yup.string()
      .length(11, 'CPF inválido')
      .matches(/[0-9]/, 'CPF inválido')
      .required('cpf é obrigatório'),
    email: yup.string().email('Email inválido').required("email é obrigatório"),
    dataNascimento: yup.date().required('dataNascimento é obrigatório'),
    telefone: yup.string().required('telefone é obrigatório'),
    genero: yup.string().required('genero é Obrigatório')
  }
)

// Middleware de validação
async function validarNovaPessoa(req, res, next) {
  try {
    await schemaNovaPessoa.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

// exporto o middleware pra usar no controller
module.exports = {
  validarNovaPessoa
}