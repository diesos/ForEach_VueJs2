<script setup>
import verifyAcces from '../service/auth';
import usersList from './components/userList.vue'; // Composant liste utilisateurs
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from './stores/authStore';

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();
const isAuthenticated = ref(false);


// Fonction de déconnexion
const logout = () => {
  authStore.logout();
  toast.success('Déconnexion réussie');
  router.push('/login'); // Redirection avec `useRouter`
};
</script>

<template>
  <nav>
    <RouterLink to="/home">Users List</RouterLink>
    <RouterLink to="/register" v-if="!isAuthenticated">Register</RouterLink>
    <RouterLink to="/login" v-if="!isAuthenticated">Login</RouterLink>
    <RouterLink to="/cocktail">Cocktail</RouterLink>
    <RouterLink to="/profil" v-if="authStore.isAuthenticated">Profil</RouterLink>
    <RouterLink to="#" @click.prevent="logout" v-if="authStore.isAuthenticated">Déconnexion</RouterLink>
  </nav>

  <RouterView></RouterView>
</template>

<style>
nav {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  background-color: #f1f1f1;
}
</style>
