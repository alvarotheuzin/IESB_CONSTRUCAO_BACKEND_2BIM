const express = require('express')
const app = express()

app.use(express.json())


const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!")
  })
  .catch(erro => {
    console.error("Erro ao conectar no banco MongoDB:", erro)
  })

const CargoController = require('./controllers/CargoController')
app.use(CargoController)

const DepartamentoController = require('./controllers/DepartamentoController')
app.use(DepartamentoController)

const FuncionarioController = require('./controllers/FuncionarioController')
app.use(FuncionarioController)

const ProjetoController = require('./controllers/ProjetoController')
app.use(ProjetoController)

const TarefaController = require('./controllers/TarefaController')
app.use(TarefaController)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Aplicação rodando -> http://localhost:${PORT}`)
})
