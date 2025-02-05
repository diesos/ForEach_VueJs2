<template>
	<div>
		welcome back
	</div>
	<div v-for="cocktail in cocktails" :key="cocktail.id" style="padding: 12px; margin: auto; border: 1px solid black; width: 50%;border-radius: 8px; margin-top: 10px; background-color: aliceblue; color: black;" >
		<p>{{ cocktail.nom }}</p>
		<p>{{ cocktail.description }}</p>
		<p>{{ cocktail.verre }}</p>
		<p>{{ cocktail.garniture }}</p>
		<p>Alcoolisée : <span v-if="cocktail.alcoolise">✅</span><span v-else>❌</span></p>
		<br>
		<button class="--edit"> Edit</button>
		<button class="--delete"> Delete</button>
	</div>
</template>
<script>
import axios from 'axios'
import { useToast } from 'vue-toastification';
import api from "../../service/axiosInterceptor.js";

const toast = useToast();

export default {
	data(){
		return {
			cocktails: []
		};
	},
	methods: {
		async fetchCocktails() {
			try {
				const response = await api.get('/cocktail/All');
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
.--edit {
	padding: 8px;
	font-size: 16px;
	background-color: cadetblue;
	border: 0px;
	border-radius: 8px;
	margin-right: 16px;
	color: aliceblue;
}

.--delete {
	padding: 8px;
	font-size: 16px;
	background-color: #353535;
	border: 0px;
	border-radius: 8px;
	margin-right: 16px;
	color: aliceblue;
}
</style>
