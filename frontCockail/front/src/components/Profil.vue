<template>
    <div>
        <div class="flex flex-col bg-slate-300 w-1/3 m-auto mt-12 p-12 rounded-lg shadow-sm hover:shadow-lg justify-center">
           <p class="text-black font-extrabold"> Welcome abord ! :</p>
            <p class="text-black">{{ nom }}</p>
            <p class="text-black">{{ email }}</p>
            <div class="mt-12">
<p class="font-extrabold text-black">let's see cocktails !</p>
<Button @click="$router.push('/cocktail')" class="rounded border-xl  m-auto align-center bg-green-500 p-4 items-center self-center">cocktails</Button>
</div>
  </div>
</div>

    </template>

    <script>

    import axios from 'axios' // Importation d'Axios pour les requêtes HTTP
    import Button from "primevue/button"

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
