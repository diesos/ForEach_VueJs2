<script setup>
import verifyAcces from '../service/auth';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useAuthStore } from './stores/authStore';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const isAuthenticated = ref(false);


const authStore = useAuthStore();
// Fonction de déconnexion
const logout = () => {
  authStore.logout(toast.info('Déconnexion réussie',{
          timeout: 1000
        }));
  router.push('/login'); // Redirection avec `useRouter`
};
</script>

<template>
  <nav>
    <RouterLink to="/home">Home</RouterLink>
    <RouterLink to="/users" v-if="authStore.isAuthenticated">Users List</RouterLink>
    <RouterLink to="/cocktail">Cocktail</RouterLink>
    <RouterLink to="/profil" v-if="authStore.isAuthenticated">Profil</RouterLink>
    <RouterLink to="/register" v-if="!authStore.isAuthenticated">Register</RouterLink>
    <RouterLink to="/login" v-if="!authStore.isAuthenticated">Login</RouterLink>
    <RouterLink to="/login" @click.prevent="logout" v-if="authStore.isAuthenticated">Déconnexion</RouterLink>
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
