<template>
    <div>
        <form @submit.prevent="registerUser">
            <!-- Empêche le rechargement de la page lors de la soumission -->

            <label for="nom">Nom</label>
            <input type="text" id="nom" v-model="nom" required>
            <!-- Liaison de l'input avec la donnée "nom" -->

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

    const toast = useToast();
    export default {
        data() {
            return {
                nom: '',      // Stocke le nom de l'utilisateur
                email: '',    // Stocke l'email de l'utilisateur
                password: ''  // Stocke le mot de passe de l'utilisateur
            };
        },

        methods: {
            async registerUser() {
                try {
                    // Envoi d'une requête POST pour créer un utilisateur
                    const response = await axios.post('http://localhost:3000/user/create', {
                        nom: this.nom,
                        email: this.email,
                        mot_de_passe: this.password // Correction du nom du champ (doit correspondre à l'API)
                    });
                    toast.success('Compte créé avec succès');
                    console.log(response.data); // Affichage de la réponse du serveur

                    // Réinitialisation des champs après l'envoi du formulaire
                    this.nom = '';
                    this.email = '';
                    this.password = '';

                } catch (error) {
                    toast.error('Erreur lors de la création du compte');
                    console.error(error); // Gestion des erreurs
                }
            }
        }
    }
    </script>
