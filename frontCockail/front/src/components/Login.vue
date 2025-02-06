<template>
  <div class="flex flex-col bg-slate-300 w-1/3 m-auto mt-12 p-12 rounded-lg shadow-sm hover:shadow-lg">
  <div style="padding: 20px; display: flex; flex-direction: column; align-items: center">
    <form @submit.prevent="loginUser" display="flex" flex-direction="column" align-items="center" class="text-black">
      <!-- Empêche le rechargement de la page lors de la soumission -->
      <label for="email" style="margin-right: 12px;">Email</label>
      <input class="h-12 rounded text-black !important" type="email" id="email" v-model="email" required/>
      <!-- Liaison de l'input avec la donnée "email" -->

      <label for="password" style="margin-right: 12px;">Password</label>
      <input style="padding: 12px;" type="password" id="password" v-model="password" required />
      <!-- Liaison de l'input avec la donnée "password" -->

      <Button style="padding: 12px; margin-top: 20px;" type="submit">Submit</Button>
      <!-- Bouton de soumission -->
    </form>
  </div>
</div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/authStore.js";
import Button from "primevue/button";

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
