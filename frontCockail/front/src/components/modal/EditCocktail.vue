<script setup>
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import api from "../../../service/axiosInterceptor.js";
import { ref, defineProps, defineEmits, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Props
const props = defineProps({ cocktailInfo: Object });

// Définition des événements
const emit = defineEmits(['close', 'update']);

// Copie locale de l'objet cocktail pour modification
const cocktail = ref({ ...props.cocktailInfo });

// Variable pour contrôler l'affichage du modal
const visible = ref(true);

// Regarde si les props changent pour mettre à jour la copie locale
watch(() => props.cocktailInfo, (newValue) => {
    cocktail.value = { ...newValue };
}, { deep: true });

// Fonction pour sauvegarder les modifications
const saveChanges = async () => {
	try {
		const response = await api.put(`/cocktail/update/${cocktail.value.id}`, cocktail.value);
		emit('updated', response.data);
		visible.value = false; // Fermer le modal après la mise à jour
	} catch (error) {
		console.error("Erreur lors de la mise à jour :", error);
	}
};
</script>

<template>
	<Dialog v-model:visible="visible" modal header="Edit Cocktail" :style="{ width: '25rem' }" @hide="$emit('close')">
        <div class="modal-content">
			<h2>Modifier le Cocktail</h2>

			<InputText v-model="cocktail.nom" placeholder="Nom du cocktail" />
			<InputText v-model="cocktail.description" placeholder="Description" />
			<InputText v-model="cocktail.verre" placeholder="Type de verre" />
			<InputText v-model="cocktail.garniture" placeholder="Garniture" />

			<label>
				Alcoolisée :
				<Checkbox v-model="cocktail.alcoolise" :binary="true" />
			</label>

			<br />
			<Button @click="saveChanges" label="Enregistrer" />
			<Button @click="$emit('close'); visible = false" label="Annuler" />
		</div>
	</Dialog>
</template>
