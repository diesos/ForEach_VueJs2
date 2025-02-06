<template>
    <div>
        <div
		v-for="user in users"
		:key="user.id"
		class="p-3 mx-auto border border-black w-1/2 rounded-lg mt-2 bg-aliceblue text-black my-4">
                <p>{{ user.nom }}</p>
                <p>{{ user.email }}</p>

    </div>


    </div>
    <button style="padding: 17px;font-size: 16px;"  @click="$router.go(-1)"> Back</button>
    </template>

    <script>

    import axios from 'axios' // Importation d'Axios pour les requêtes HTTP

    export default {
        data(){
            return {
                users: [] // Initialisation du tableau des utilisateurs
            };
        },

        methods: {
            // Méthode pour récupérer la liste des utilisateurs depuis l'API
            async fetchUsers() {
                try {
                    // Requête GET vers le serveur Node.js pour récupérer tous les utilisateurs
                    const response = await axios.get('http://localhost:3000/user/getAll');
                    this.users = response.data; // Stockage des données récupérées dans users
                } catch (error) {
                    console.error(error); // Gestion des erreurs en cas d'échec de la requête
                }
            }
        },

        mounted() {
            this.fetchUsers(); // Appel de la méthode fetchUsers lorsque le composant est monté
        }
    };
    </script>

    <style>
    /* Ajoute ici du style si nécessaire */
    </style>
