<script setup>
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import api from "../../../service/axiosInterceptor.js";
import { ref, defineProps, defineEmits, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'vue-toastification';


const props = defineProps({ cocktailInfo: Object });
const toast = useToast();

const emit = defineEmits(['close', 'update']);

// Copie locale de l'objet cocktail pour modification
const cocktail = ref({ ...props.cocktailInfo });

const visible = ref(true);

let errorNom = ref(false);

watch(() => props.cocktailInfo, (newValue) => {
    cocktail.value = { ...newValue };
}, { deep: true });


const saveChanges = async () => {
	try {
		const response = await api.put(`/cocktail/update/${cocktail.value.id}`, cocktail.value);
		emit('updated', response.data);
		visible.value = false; // Fermer le modal après la mise à jour
	} catch (error) {
        if (error.response.status === 409) {
		toast.error('Ce nom de cocktail est déjà utlisée ❌', { timeout: 1500 });
		errorNom.value = true;
		setTimeout(() => { errorNom.value = false; }, 1000);
        }
        else {
		toast.error('Erreur lors de la création du cocktail ❌', { timeout: 1500 });
    	console.error("Erreur lors de la création :", error);
	}
		console.error("Erreur lors de la mise à jour :", error);
	}
};
</script>

<template>
	<Dialog v-model:visible="visible" modal header="Modifier le Cocktail" :style="{ width: '25rem' }" @hide="$emit('close')">
        <div class="modal-content flex flex-col gap-4 p-4">
			<h2 class="text-white px-3 py-2 font-semibold" >Apportez vos modification ci-dessous</h2>

			<InputText v-model="cocktail.cocktail_nom" :class="{ 'border-red-500  bg-color-500 animate-shake': errorNom }" laceholder="Nom du cocktail" />
			<textarea v-model="cocktail.description" class="border rounded-lg p-2 overflow-y-auto break-words min-h-[100px] !important" placeholder="Description" unstyled />
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
<style>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 80% { transform: translateX(-5px); }
  40%, 60% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
  background-color: red;
}
</style>
