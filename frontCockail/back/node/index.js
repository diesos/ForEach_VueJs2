const express = require('express');
const dotenv = require('dotenv');
const mysql = require('./config/database');
const cors = require('cors');
const routeUser = require('./routes/user');
const routeCocktail = require('./routes/cocktail');
const app = express();

// chargement variables d'environnement
dotenv.config();

app.use(cors());
// définition du routeur

// utilisation du middleware express.json()
// pour traiter les requêtes en JSON
app.use(express.json());

// route pour les utilisateurs
app.use('/user', routeUser)
app.use('/cocktail', routeCocktail)

// test connexion base de donnée

mysql.connect((err) => {
  if (err) throw (err, "error");
  console.log('Connected to MySQL');
});

// lancement server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
