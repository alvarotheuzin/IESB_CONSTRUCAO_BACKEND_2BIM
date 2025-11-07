function validarFuncionario(req, res, next) {
    const { nome, email, salario, cargo, departamento } = req.body
  
    if (!nome || !email || !salario || !cargo || !departamento) {
      return res.status(400).json({
        erro: 'Os campos nome, email, salário, cargo e departamento são obrigatórios.'
      })
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ erro: 'E-mail inválido.' })
    }
  
    if (typeof salario !== 'number' || salario <= 0) {
      return res.status(400).json({ erro: 'O salário deve ser um número positivo.' })
    }
  
    next()
  }
  
  module.exports = { validarFuncionario }
  