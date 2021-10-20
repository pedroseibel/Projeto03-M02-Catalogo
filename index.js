require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const Poema = require("./models/poema");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

app.get("/", async (req, res) => {
  const poemas = await Poema.findAll();
  res.render("index", {
    poemas, message
  });
});

app.get("/about", (req,res) => {
  res.render("../views/about");
})

app.get("/detalhes/:id", async (req, res) => { 
  const poema = await Poema.findByPk(req.params.id);
  res.render("detalhes", {
    poema,
  });
});

app.get("/criar", (req, res) => {
  res.render("criar", {message});
});

app.post("/criar", async (req, res) => {

  const {nome, autor, texto, imagem} = req.body;

  if (!nome) {
    res.render("criar", {
      message: "O campo nome não pode estar em branco.",
    });
  }

  else if (!autor) {
    res.render("criar", {
      message: "O campo autor não pode estar em branco.",
    });
  }
  
  else if (!imagem) {
    res.render("criar", {
      message: "O campo imagem não pode estar em branco.",
    });
  }

  else {
    try {
      const poema = await Poema.create({
        nome,
        autor,
        texto,
        imagem,
      });

      res.redirect("/");
    } catch (err) {
      console.log(err);

      res.render("criar", {
        message: "Ocorreu um erro ao cadastrar o poema.",
      });
    }
  }
});

app.get("/editar/:id", async (req, res) => {
  const poema = await Poema.findByPk(req.params.id);

  if (!poema) {
    res.render("editar", {
      poema,
      message: "Poema não encontrado.",
    });
  }

  res.render("editar", {
    poema, message
  });
});

app.post("/editar/:id", async (req, res) => {
  const poema = await Poema.findByPk(req.params.id);

  const {nome, autor, texto, imagem} = req.body;

  poema.nome = nome;
  poema.autor = autor;
  poema.texto = texto;
  poema.imagem = imagem;

  const poemaEditado = await poema.save();

  res.render("editar", {
    poema: poemaEditado,
    message: "O poema foi editado.",
  });
});


app.get("/deletar/:id", async (req, res) => {
  const poema = await Poema.findByPk(req.params.id);

  if (!poema) {
    res.render("deletar", {
      poema,
      message: "Poema não encontrado",
    });
  }

  res.render("deletar", {
    poema, message
  });
});


app.post("/deletar/:id", async (req, res) => {
  const poema = await Poema.findByPk(req.params.id);

  if (!poema) {
    res.render("deletar", {
      mensagem: "Poema não encontrado",
    });
  }

  await poema.destroy();

  res.redirect("/");
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))