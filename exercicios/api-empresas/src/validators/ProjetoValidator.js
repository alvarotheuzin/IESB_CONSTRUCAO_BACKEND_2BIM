const yup = require('yup')


const criarSchema = yup.object().shape({
    nome: yup.string().required('nome é obrigatório'),
    descricao: yup.string().required('descricao é obrigatório'),
    data_inicio: yup.date().required('data_inicio é obrigatório'),
    data_fim: yup.date().required('data_fim é obrigatório').test('is-after', 'data_fim deve ser posterior a data_inicio', function (value) {
        const { data_inicio } = this.parent
        if (!data_inicio || !value) return true
        return new Date(value) > new Date(data_inicio)
    }),
    status: yup.string().oneOf(['planejado', 'em_andamento', 'concluido'])
})


const atualizarSchema = yup.object().shape({
    nome: yup.string(),
    descricao: yup.string(),
    data_inicio: yup.date(),
    data_fim: yup.date().test('is-after', 'data_fim deve ser posterior a data_inicio', function (value) {
        const { data_inicio } = this.parent
        if (!data_inicio || !value) return true
        return new Date(value) > new Date(data_inicio)
    }),
    status: yup.string().oneOf(['planejado', 'em_andamento', 'concluido'])
})


async function validarCriarProjeto(req, res, next) {
    try {
        await criarSchema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erros: error.errors })
    }
}


async function validarAtualizarProjeto(req, res, next) {
    try {
        await atualizarSchema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erros: error.errors })
    }
}


module.exports = { validarCriarProjeto, validarAtualizarProjeto }