const mongoose = require('mongoose')


function validarID(req, res, next) {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: 'ID inválido' })
    }
    next()
}


module.exports = { validarID }