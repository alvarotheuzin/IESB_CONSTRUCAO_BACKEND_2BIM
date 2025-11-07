const mongoose = require('mongoose')


const schema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        descricao: { type: String, required: true },
        data_inicio: { type: Date, required: true },
        data_fim: { type: Date, required: true },
        funcionario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Funcionarios',
            required: true
        },
        projeto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projetos',
            required: true
        },
        status: { type: String, enum: ['pendente', 'em_andamento', 'concluida'], default: 'pendente' }
    },
    { timestamps: true }
)


const TarefaModel = mongoose.model('Tarefas', schema)


module.exports = TarefaModel