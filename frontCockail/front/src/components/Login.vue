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
                    // Envoi d'une requête POST pour créer un utilisateur
                    const response = await axios.post('http://localhost:3000/user/login', {
                        email: this.email,
                        mot_de_passe: this.password,
                    }).then(response => {
                        console.log(response.data);
                        this.token = response.data.token;
                        localStorage.setItem('token', this.token);
                        localStorage.setItem('email', this.email);
                        localStorage.setItem('nom', response.data.user.nom);
                    });
                    this.$router.push('/profil'); // Redirection vers la page d'accueil après la connexion
                    // Réinitialisation des champs après l'envoi du formulaire
                    this.email = '';
                    this.password = '';

                } catch (error) {
                    console.error(error); // Gestion des erreurs
                }
            }
        }
    }
    </script>
