const yup = require('yup')

const criarSchema = yup.object().shape({
    titulo: yup.string()
        .min(3, "o título precisa de pelo menos 3 caracteres")
        .max(100, "o título precisa de no máximo 100 caracteres")
        .required("título é obrigatório"),
    descricao: yup.string()
        .min(3, "a descrição precisa de pelo menos 3 caracteres")
        .max(500, "a descrição precisa de no máximo 500 caracteres")
        .required("descrição é obrigatória"),
    data_inicio: yup.date()
        .required("data_inicio é obrigatória"),
    data_fim: yup.date()
        .required("data_fim é obrigatória")
        .test('is-after', 'data_fim deve ser posterior a data_inicio', function (value) {
            const { data_inicio } = this.parent
            if (!data_inicio || !value) return true
            return new Date(value) > new Date(data_inicio)
        }),
    status: yup.string()
        .oneOf(['pendente', 'em_andamento', 'concluida'], "status deve ser 'pendente', 'em_andamento' ou 'concluida'")
        .required("status é obrigatório"),
    projeto_id: yup.string()
        .required("projeto_id é obrigatório"),
    funcionario_id: yup.string()
        .required("funcionario_id é obrigatório")
})

const atualizarSchema = yup.object().shape({
    titulo: yup.string()
        .min(3, "o título precisa de pelo menos 3 caracteres")
        .max(100, "o título precisa de no máximo 100 caracteres"),
    descricao: yup.string()
        .min(3, "a descrição precisa de pelo menos 3 caracteres")
        .max(500, "a descrição precisa de no máximo 500 caracteres"),
    data_inicio: yup.date(),
    data_fim: yup.date()
        .test('is-after', 'data_fim deve ser posterior a data_inicio', function (value) {
            const { data_inicio } = this.parent
            if (!data_inicio || !value) return true
            return new Date(value) > new Date(data_inicio)
        }),
    status: yup.string()
        .oneOf(['pendente', 'em_andamento', 'concluida'], "status deve ser 'pendente', 'em_andamento' ou 'concluida'"),
    projeto_id: yup.string(),
    funcionario_id: yup.string()
})

async function validarCriarTarefa(req, res, next) {
    try {
        await criarSchema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erros: error.errors })
    }
}

async function validarAtualizarTarefa(req, res, next) {
    try {
        await atualizarSchema.validate(req.body, { abortEarly: false })
        next()
    } catch (error) {
        return res.status(400).json({ erros: error.errors })
    }
}

module.exports = { validarCriarTarefa, validarAtualizarTarefa }
