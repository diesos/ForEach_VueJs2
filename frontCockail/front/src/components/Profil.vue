<template>
    <div>
        Welcome {{ nom }} {{ email }}
    </div>

    </template>

    <script>

    import axios from 'axios' // Importation d'Axios pour les requêtes HTTP

    export default {
        data() {
            return {
                nom: '',      // Stocke le nom de l'utilisateur
                email: '',
                user: {}    // Stocke l'email de l'utilisateur
            };
        },

        methods: {
            fetchData() {
            if (localStorage.getItem('token')) {
                this.nom = localStorage.getItem('nom');
                this.email = localStorage.getItem('email');
            }
            else {
                this.$router.push('/login');
            };
        }
        },
        mounted() {
            this.fetchData();
        }
    }
    </script>
