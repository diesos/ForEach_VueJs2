const express = require("express");
const connection = require("../config/database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const isGranted = require("../middleware/authMiddleware");

router.get("/all", isGranted, (req, res) => {
  const sql = "SELECT * FROM cocktails";
  connection.query(sql, (error, result) => {
    if (error) {
      res.status(500).send("Erreur lors de la récupération des cocktails");
    } else {
      res.status(200).json(result);
    }
  });
});

router.post("/create", isGranted, (req, res) => {
  const { nom, recette, id_utilisateur } = req.body;
  const sql =
    "INSERT INTO cocktails (nom, description, verre, garniture, alcoolise) VALUES (?, ?, ?, ?, ?)";
  connection.query(sql, [nom, recette, id_utilisateur], (error) => {
    if (error) {
      res.status(500).send("Erreur lors de la création du cocktail");
    } else {
      res.status(201).send("Cocktail créé avec succès");
    }
  });
});

router.get("/getById/:id", isGranted, (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM cocktails WHERE id = ?";
  connection.query(sql, [id], (error, result) => {
    if (error) {
      res.status(500).send("Erreur lors de la récupération du cocktail");
    } else if (result.length === 0) {
      res.status(404).send("Cocktail non trouvé");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.put("/update/:id", isGranted, (req, res) => {
  const { id } = req.params;
  const { nom, description, verre, garniture, alcoolise } = req.body;
  const sql =
    "UPDATE cocktails SET nom = ?, description = ?, verre=?, garniture=?, alcoolise=? WHERE id = ?";
  connection.query(
    sql,
    [nom, description, verre, garniture, alcoolise, id],
    (error) => {
      if (error) {
        res.status(500).send("Erreur lors de la modification du cocktail");
      } else {
        res.status(200).send("Cocktail modifié avec succès");
      }
    }
  );
});

router.delete("/delete/:id", isGranted, (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cocktails WHERE id = ?";
  connection.query(sql, [id], (error) => {
    if (error) {
      res.status(500).send("Erreur lors de la suppression du cocktail");
    } else {
      res.status(200).send("Cocktail supprimé avec succès");
    }
  });
});

module.exports = router;
