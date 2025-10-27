const yup = require('yup')

const schemaNovoLivro = yup.object().shape({
  titulo: yup.string()
    .min(2, 'Título inválido')
    .max(100, 'Título inválido')
    .required('Título é obrigatório'),

  autor: yup.string()
    .min(3, 'Autor inválido')
    .max(100, 'Autor inválido')
    .required('Autor é obrigatório'),

  editora: yup.string()
    .min(2, 'Editora inválida')
    .max(100, 'Editora inválida')
    .required('Editora é obrigatória'),

  ano: yup.number()
    .typeError('Ano deve ser um número')
    .integer('Ano inválido')
    .required('Ano é obrigatório'),

  preco: yup.number()
    .typeError('Preço deve ser um número')
    .positive('Preço deve ser positivo')
    .required('Preço é obrigatório')
})


async function validarNovoLivro(req, res, next) {
  try {
    await schemaNovoLivro.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = {
  validarNovoLivro
}
