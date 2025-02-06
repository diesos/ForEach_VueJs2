<template>
  <div style="padding: 20px; display: flex; flex-direction: column; align-items: center">
    <form @submit.prevent="loginUser" display="flex" flex-direction="column" align-items="center">
      <!-- Empêche le rechargement de la page lors de la soumission -->
      <label for="email" style="margin-right: 12px;">Email</label>
      <input style="padding: 12px;" type="email" id="email" v-model="email" required />
      <!-- Liaison de l'input avec la donnée "email" -->

      <label for="password" style="margin-right: 12px;">Password</label>
      <input style="padding: 12px;" type="password" id="password" v-model="password" required />
      <!-- Liaison de l'input avec la donnée "password" -->

      <button style="padding: 12px; margin-top: 20px;" type="submit">Submit</button>
      <!-- Bouton de soumission -->
    </form>
  </div>
  <button style="padding: 12px; font-size: 16px" @click="$router.go(-1)">
    Back
  </button>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore.js"; // Assure-toi que le chemin est bon

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const email = ref("");
const password = ref("");

const loginUser = async () => {
  try {
    await authStore.loginUser(email.value, password.value, router, toast);
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de la connexion");
  }
};
</script>
