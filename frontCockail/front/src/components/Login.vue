<template>
    <div>
        <form @submit.prevent="loginUser">
            <!-- Empêche le rechargement de la page lors de la soumission -->
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" required>
            <!-- Liaison de l'input avec la donnée "email" -->

            <label for="password">Password</label>
            <input type="password" id="password" v-model="password" required>
            <!-- Liaison de l'input avec la donnée "password" -->

            <button type="submit">Submit</button>
            <!-- Bouton de soumission -->
        </form>
    </div>
    <button style="padding: 17px;font-size: 16px;"  @click="$router.go(-1)"> Back</button>

    </template>

    <script>

    import axios from 'axios' // Importation d'Axios pour les requêtes HTTP
    import { useToast } from 'vue-toastification';
    import api from "../../service/axiosInterceptor.js";
    import { useAuthStore } from '../stores/authStore.js';

    const authStore = useAuthStore();
    const toast = useToast();
    export default {
        data() {
            return {
                nom: '',      // Stocke le nom de l'utilisateur
                email: '',    // Stocke l'email de l'utilisateur
                password: '',
                token: '',
            };
        },

        methods: {
            async loginUser() {
                try {
                    authStore.loginUser(email.value, password.value, router, toast);
                    } catch (error) {
                        console.error(error);
                    }
            }
        }
    }
    </script>
