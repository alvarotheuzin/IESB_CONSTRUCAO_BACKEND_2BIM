const mongoose = require('mongoose')


const schema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        descricao: { type: String, required: true },
        data_inicio: { type: Date, required: true },
        data_fim: { type: Date, required: true },
        status: { type: String, enum: ['planejado', 'em_andamento', 'concluido'], default: 'planejado' }
    },
    { timestamps: true }
)


const ProjetoModel = mongoose.model('Projetos', schema)


module.exports = ProjetoModel