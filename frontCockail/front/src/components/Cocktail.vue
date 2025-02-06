<template>
	<div>
		welcome back
	</div>
	<div
		v-for="cocktail in cocktails"
		:key="cocktail.id"
		class="p-3 mx-auto border border-black w-1/2 rounded-lg mt-2 bg-aliceblue text-black"
	>
		<p>{{ cocktail.nom }}</p>
		<p>{{ cocktail.description }}</p>
		<p>{{ cocktail.verre }}</p>
		<p>{{ cocktail.garniture }}</p>
		<p>Alcoolisée : <span v-if="cocktail.alcoolise">✅</span><span v-else>❌</span></p>
		<br>
		<button class="--edit" @click="openEditModal(cocktail)">Edit</button>
		<button class="--delete">Delete</button>
	</div>

	<!-- Modal -->
	<EditCocktail
		v-if="showModal"
		:cocktailInfo="selectedCocktail"
		@close="showModal = false"
		@updated="updateCocktail"
	/>
</template>

<script>
import { ref } from 'vue';
import api from "../../service/axiosInterceptor.js";
import EditCocktail from './modal/editCocktail.vue';
import Dialog from 'primevue/dialog';

export default {
	components: { EditCocktail },
	setup() {
		const cocktails = ref([]);
		const selectedCocktail = ref(null);
		const showModal = ref(false);

		// Récupérer les cocktails
		const fetchCocktails = async () => {
			try {
				const response = await api.get('/cocktail/All');
				cocktails.value = response.data;
			} catch (error) {
				console.error(error);
			}
		};

		// Ouvrir le modal avec un cocktail spécifique
		const openEditModal = (cocktail) => {
			selectedCocktail.value = { ...cocktail }; // On fait une copie pour éviter de modifier l'original avant validation
			showModal.value = true;
		};

		// Mettre à jour les données locales après modification
		const updateCocktail = (updatedCocktail) => {
			fetchCocktails();
			showModal.value = false;
		};

		// Charger les cocktails au montage
		fetchCocktails();

		return { cocktails, selectedCocktail, showModal, openEditModal, updateCocktail };
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
