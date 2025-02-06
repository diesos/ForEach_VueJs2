<script setup>
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import api from "../../../service/axiosInterceptor.js";
import { ref, defineEmits } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'vue-toastification';

// Définition des événements
const emit = defineEmits(['close', 'created']);

const toast = useToast();

let errorNom = ref(false);
// 🟢 Initialisation correcte de l'objet cocktail
const cocktail = ref({
  nom: "",
  description: "",
  verre: "",
  garniture: "",
  alcoolise: false, // PrimeVue Checkbox retourne `true`/`false`
});

// Variable pour contrôler l'affichage du modal
const visible = ref(true);

// Fonction pour sauvegarder les modifications
const saveChanges = async () => {
  try {
    // 🔄 Conversion de `alcoolise` en `0` ou `1` pour MySQL
    const payload = {
      ...cocktail.value,
      alcoolise: cocktail.value.alcoolise ? 1 : 0,
    };

    const response = await api.post(`/cocktail/create/`, payload);

    emit('created', response.data);
    toast.success('Cocktail ajouté avec succès ✅', { timeout: 1000 });

    visible.value = false; // Ferme le modal après succès
  } catch (error) {
	if (error.response.status === 401) {
	  toast.error('Vous devez être connecté pour créer un cocktail ❌', { timeout: 1500 });
	}
	if (error.response.status === 409) {
		toast.error('Ce cocktail existe déjà ❌', { timeout: 1500 });
		errorNom.value = true;
		setTimeout(() => { errorNom.value = false; }, 1000);

	}
    else {
		toast.error('Erreur lors de la création du cocktail ❌', { timeout: 1500 });
    	console.error("Erreur lors de la création :", error);
	}
  }
};

// Fonction pour fermer le modal
const closeDialog = () => {
  visible.value = false;
  emit('close');
};
</script>

<template>
  <Dialog v-model:visible="visible" modal header="Création d'un cocktail" :style="{ width: '25rem' }" @hide="closeDialog">
    <div class="modal-content flex flex-col gap-4 p-4">
      <h2 class="text-white px-3 py-2 font-semibold">Créez votre cocktail</h2>

      <InputText v-model="cocktail.nom" :class="{ 'border-red-500  bg-color-500 animate-shake': errorNom }" placeholder="Nom du cocktail" />
      <textarea v-model="cocktail.description" class="border rounded-lg p-2 overflow-y-auto break-words min-h-[100px]" placeholder="Description" unstyled></textarea>
      <InputText v-model="cocktail.verre" placeholder="Type de verre" />
      <InputText v-model="cocktail.garniture" placeholder="Garniture" />

      <label class="flex items-center gap-2">
        <Checkbox v-model="cocktail.alcoolise" :binary="true" />
        Alcoolisé
      </label>

      <div class="flex gap-2">
        <Button @click="saveChanges" label="Enregistrer" />
        <Button @click="closeDialog" label="Annuler" />
      </div>
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
