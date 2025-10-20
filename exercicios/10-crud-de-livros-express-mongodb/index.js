const express = require("express");
const app = express();

app.use(express.json());

const mongoose = require("mongoose");
require("dotenv").config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!!!!");
  })
  .catch((erro) => {
    console.log("Erro ao conectar no banco MongoDB: ", erro);
  });

const LivroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editora: { type: String, required: true },
  ano: { type: Number, required: true },
  preco: { type: Number, required: true },
  dataCriacao: { type: Date, default: Date.now() },
});

const LivroModel = mongoose.model("Livros", LivroSchema);

function validarCamposLivro(livro) {
  if (
    !livro.titulo ||
    !livro.autor ||
    !livro.editora ||
    !livro.ano ||
    !livro.preco
  ) {
    return {
      valido: false,
      erro: "Todos os campos (titulo, autor, editora, ano, preco) são obrigatórios!",
    };
  }
  return { valido: true };
}

app.post("/livros", async (req, res, next) => {
  try {
    const livro = req.body;
    const validacao = validarCamposLivro(livro);
    if (!validacao.valido) {
      return res.status(400).json({ erro: validacao.erro });
    }
    const livroCriado = await LivroModel.create(livro);
    res.status(201).json(livroCriado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar o livro: " + error.message });
  }
});

app.get("/livros", async (req, res, next) => {
  try {
    const livros = await LivroModel.find();
    res.json(livros);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao listar os livros: " + error.message });
  }
});

app.get("/livros/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const livro = await LivroModel.findById(id);
    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado!" });
    }
    res.json(livro);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ erro: "ID inválido." });
    }
    res.status(500).json({ erro: "Erro ao buscar o livro: " + error.message });
  }
});

app.put("/livros/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const livro = req.body;
    const validacao = validarCamposLivro(livro);
    if (!validacao.valido) {
      return res.status(400).json({ erro: validacao.erro });
    }

    const livroAtualizado = await LivroModel.findByIdAndUpdate(id, livro, {
      new: true,
      runValidators: true,
    });

    if (!livroAtualizado) {
      return res.status(404).json({ erro: "Livro não encontrado!" });
    }
    res.json(livroAtualizado);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ erro: "ID inválido." });
    }
    res
      .status(500)
      .json({ erro: "Erro ao atualizar o livro: " + error.message });
  }
});

app.delete("/livros/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const livroRemovido = await LivroModel.findByIdAndDelete(id);

    if (!livroRemovido) {
      return res
        .status(404)
        .json({ erro: "Livro não encontrado para exclusão!" });
    }
    res.status(204).send();
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ erro: "ID inválido." });
    }
    res.status(500).json({ erro: "Erro ao excluir o livro: " + error.message });
  }
});

app.listen(3000, () => {
  console.log("Aplicação rodando em http://localhost:3000");
});
