<script>
import usersList from './components/userList.vue' // Importation du composant de la liste des utilisateurs
import { RouterLink, RouterView } from 'vue-router'; // Importation des composants pour la navigation Vue Router

// L'exportation du composant App n'est pas nécessaire ici car Vue le détecte automatiquement
</script>

<template>
  <nav>
    <!-- Liens de navigation vers différentes pages -->
    <RouterLink to="/home">Users List</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav>

  <!-- Affichage du composant correspondant à la route actuelle -->
  <RouterView></RouterView>
</template>

<style>
  /* Styles de la barre de navigation */
  nav {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background-color: #f1f1f1;
  }
</style>
