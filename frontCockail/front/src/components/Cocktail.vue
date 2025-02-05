<template>
	<div>
		welcome back
	</div>
	<div v-for="cocktail in cocktails" :key="cocktail.id" style="padding: auto; margin: auto; border: 1px solid black; width: 50%; margin-top: 10px; background-color: aliceblue; color: black;" >
		<p>{{ cocktail.nom }}</p>
		<p>{{ cocktail.description }}</p>
		<p>{{ cocktail.verre }}</p>
		<p>{{ cocktail.garniture }}</p>
		<p>Alcoolisée : <span v-if="cocktail.alcoolise">✅</span><span v-else>❌</span></p>
	</div>
</template>
<script>
import verifyAcces from "../../service/auth.js"
import axios from 'axios'

const apiUrl = "http://localhost:3000/";
const HTTPHeaders = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer ' + localStorage.getItem('token')
};


export default {
	data(){
		return {
			cocktails: []
		};
	},
	methods: {
		async fetchCocktails() {
			try {
				const response = await axios.get(apiUrl + 'cocktail/All', { headers: HTTPHeaders });
				this.cocktails = response.data;
			} catch (error) {
				console.error(error);
			}
		}
	},
	mounted() {

		this.fetchCocktails();
	}
};
</script>
<style>
</style>
